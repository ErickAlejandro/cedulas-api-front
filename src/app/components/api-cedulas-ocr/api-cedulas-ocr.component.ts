import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { Information_cedulas } from 'src/app/models/information_cedulas';
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
  public information_cedulas: Information_cedulas = new Information_cedulas();
  obj: any = [];

  element!: any;
  size!: any
  canvas!: any;
  ctx!: any;
  img!: any;
  height: number = 0;
  method!: any;

  canv_img: boolean = false;

  llaves = Object.keys(this.information_cedulas)

  constructor(private sanitizer: DomSanitizer, private rest: APICedulasService) { }

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

      this.rest.post(`http://75.101.192.48:5000/cedula/file-upload`, formularioDatos)
        .subscribe((res: any) => {
          this.loading = false;
          const myObj = JSON.stringify(res.information_cedulas)
          this.obj = JSON.parse(myObj);
          Object.assign(this.information_cedulas, this.obj)

          console.log('Respuesta del servidor: ', this.obj = this.information_cedulas);
          this.drawImg();
          this.canv_img = true;
          return this.obj
        })
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e)
    }
  }

  // METODOS PARA DIBUJAR LA IMAGEN Y LA FIGURA
  drawImg() {

    this.element = document.getElementById('imageDraw');
    this.canvas = document.getElementById('canvas')

    this.size = this.element.getBoundingClientRect();
    this.height = this.size.height

    // dibujar Image
    this.img = new Image();
    this.img.src = this.preview;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.drawImage(this.img, 0, 0, this.size.width, this.size.height);

    console.log('Tamanio de la imagen ' + this.size.height)



  }

}
