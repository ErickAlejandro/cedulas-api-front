import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { Data } from 'src/app/models/data';
import { information_cedulas } from 'src/app/models/information_cedulas';
import { APICedulasService } from 'src/app/service/api-cedulas.service';

@Component({
  selector: 'app-api-cedulas-ocr',
  templateUrl: './api-cedulas-ocr.component.html',
  styleUrls: ['./api-cedulas-ocr.component.css']
})
export class ApiCedulasOcrComponent implements OnInit {

  public archivos: any = [];
  public preview!: string;
  public loading!: boolean;
  public information_cedulas: information_cedulas = new information_cedulas();

  constructor(private sanitizer: DomSanitizer, private rest: APICedulasService) { }
  obj: any = [];

  ngOnInit(): void {

  }
  // CODIGO PARA CAPTURAR LA IMAGEN
  capturarFile(event: any) {
    const archivoCap = event.target.files[0];
    this.extraerBase64(archivoCap).then((imagen: any) => {
      this.preview = imagen.base;
      console.log(imagen)
    })
    this.archivos.push(archivoCap)
  }
  // convertir a base 64 para previsualizar la imagen
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (error) {

    }
  })
  
  // CODIGO PARA LA SUBIDA DE ARCHIVOS
  subirArchivo(): any {
    try {
      this.loading = true;
      const formularioDatos = new FormData();
      this.archivos.forEach((archivo: any) => {
        console.log(archivo);
        formularioDatos.append('file', archivo)
        console.log(archivo)
      })

      this.rest.post(`http://54.159.128.218:5000/cedula/file-upload`, formularioDatos)
        .subscribe((res: any) => {
          this.loading = false;
          // Object.assign(information_cedulas, res)
          const myObj = JSON.stringify(res.information_cedulas)
          var obj = JSON.parse(myObj);

          console.log('Respuesta del servidor', obj);
          return obj
        })
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e)
    }
  }

}
