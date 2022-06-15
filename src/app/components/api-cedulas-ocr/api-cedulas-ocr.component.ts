import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { Information_cedulas } from 'src/app/models/information_cedulas';
import { Information_img } from 'src/app/models/information_img';
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
  public information_img: Information_img = new Information_img();

  obj: any = [];
  obj2: any = [];

  element!: any;
  size!: any
  canvas!: any;
  ctx!: any;
  img!: any;
  height: number = 0;
  width: number = 0;
  method!: any;

  canv_img: boolean = false;

  draw_width: any;
  draw_height: any;
  check: any;
  dra_img: boolean = false;

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
          const otherObj = JSON.stringify(res.information_img)
          this.obj = JSON.parse(myObj);
          this.obj2 = JSON.parse(otherObj);
          Object.assign(this.information_cedulas, this.obj)
          Object.assign(this.information_img, this.obj2)

          console.log('Respuesta del servidor: ', this.obj = this.information_cedulas, 'Dimensiones: ' , this.obj2 = this.information_img);
          this.img_canvas()   
          this.canv_img = true;
          return this.obj
        })
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e)
    }
  }

  // DIBUJAR UNA IMAGEN
  img_canvas(){
    this.canvas = document.getElementById('micanvas');
    this.ctx = this.canvas.getContext("2d");
    this.img = new Image()
    this.img.src = this.preview

    this.height = this.information_img.height
    this.width = this.information_img.width
    
    this.canvas.setAttribute('width', this.width);
    this.canvas.setAttribute('height', this.height);

    this.ctx.drawImage(this.img, 0, 0, this.width, this.height)

  }
  // DIBUJAR CUADROS

  draw_cedula(){
    this.canvas = document.getElementById('micanvas');
    this.ctx = this.canvas.getContext("2d");
    
    this.check = document.getElementById('check_cedula')
    !this.check
    this.draw_width = (this.information_cedulas.cedula.x1 - this.information_cedulas.cedula.x0)
    this.draw_height = (this.information_cedulas.cedula.y1 - this.information_cedulas.cedula.y0)

    if (this.check.checked == true) {
      this.ctx.strokeStyle = '#318F5A';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.cedula.x0,this.information_cedulas.cedula.y0, this.draw_width, this.draw_height);
    } else {
      this.img_canvas();
    }
  }

  draw_nombre(){
    this.canvas = document.getElementById('micanvas');
    this.ctx = this.canvas.getContext("2d");
    
    this.check = document.getElementById('check_nombres')
    !this.check
    this.draw_width = (this.information_cedulas.nombres.x1 - this.information_cedulas.nombres.x0)
    this.draw_height = (this.information_cedulas.nombres.y1 - this.information_cedulas.nombres.y0)

    if (this.check.checked == true) {
      this.ctx.strokeStyle = '#318F5A';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.nombres.x0,this.information_cedulas.nombres.y0, this.draw_width, this.draw_height);
    } else {
      this.img_canvas();
    }
  }

  draw_lugar_nacimiento(){
    this.canvas = document.getElementById('micanvas');
    this.ctx = this.canvas.getContext("2d");
    
    this.check = document.getElementById('check_lugar_nacimiento')
    !this.check
    this.draw_width = (this.information_cedulas.lugar_nacimiento.x1 - this.information_cedulas.lugar_nacimiento.x0)
    this.draw_height = (this.information_cedulas.lugar_nacimiento.y1 - this.information_cedulas.lugar_nacimiento.y0)

    if (this.check.checked == true) {
      this.ctx.strokeStyle = '#318F5A';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.lugar_nacimiento.x0,this.information_cedulas.lugar_nacimiento.y0, this.draw_width, this.draw_height);
    } else {
      this.img_canvas();
    }
  }

  draw_fecha_nacimiento(){
    this.canvas = document.getElementById('micanvas');
    this.ctx = this.canvas.getContext("2d");
    
    this.check = document.getElementById('check_fecha_nacimiento')
    !this.check
    this.draw_width = (this.information_cedulas.fecha_nacimiento.x1 - this.information_cedulas.fecha_nacimiento.x0)
    this.draw_height = (this.information_cedulas.fecha_nacimiento.y1 - this.information_cedulas.fecha_nacimiento.y0)

    if (this.check.checked == true) {
      this.ctx.strokeStyle = '#318F5A';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.fecha_nacimiento.x0,this.information_cedulas.fecha_nacimiento.y0, this.draw_width, this.draw_height);
    } else {
      this.img_canvas();
    }
  }

  draw_nacionalidad(){
    this.canvas = document.getElementById('micanvas');
    this.ctx = this.canvas.getContext("2d");
    
    this.check = document.getElementById('check_nacionalidad')
    !this.check
    this.draw_width = (this.information_cedulas.nacionalidad.x1 - this.information_cedulas.nacionalidad.x0)
    this.draw_height = (this.information_cedulas.nacionalidad.y1 - this.information_cedulas.nacionalidad.y0)

    if (this.check.checked == true) {
      this.ctx.strokeStyle = '#318F5A';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.nacionalidad.x0,this.information_cedulas.nacionalidad.y0, this.draw_width, this.draw_height);
    } else {
      this.img_canvas();
    }
  }

  draw_sexo(){
    this.canvas = document.getElementById('micanvas');
    this.ctx = this.canvas.getContext("2d");
    
    this.check = document.getElementById('check_sexo')
    !this.check
    this.draw_width = (this.information_cedulas.sexo.x1 - this.information_cedulas.sexo.x0)
    this.draw_height = (this.information_cedulas.sexo.y1 - this.information_cedulas.sexo.y0)

    if (this.check.checked == true) {
      this.ctx.strokeStyle = '#318F5A';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.sexo.x0,this.information_cedulas.sexo.y0, this.draw_width, this.draw_height);
    } else {
      this.img_canvas();
    }
  }

  draw_estado_civil(){
    this.canvas = document.getElementById('micanvas');
    this.ctx = this.canvas.getContext("2d");
    
    this.check = document.getElementById('check_estado_civil')
    !this.check
    this.draw_width = (this.information_cedulas.estado_civil.x1 - this.information_cedulas.estado_civil.x0)
    this.draw_height = (this.information_cedulas.estado_civil.y1 - this.information_cedulas.estado_civil.y0)

    if (this.check.checked == true) {
      this.ctx.strokeStyle = '#318F5A';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.estado_civil.x0,this.information_cedulas.estado_civil.y0, this.draw_width, this.draw_height);
    } else {
      this.img_canvas();
    }
  }

  draw_foto(){
    this.canvas = document.getElementById('micanvas');
    this.ctx = this.canvas.getContext("2d");
    
    this.check = document.getElementById('check_foto')
    !this.check
    this.draw_width = (this.information_cedulas.foto.x1 - this.information_cedulas.foto.x0)
    this.draw_height = (this.information_cedulas.foto.y1 - this.information_cedulas.foto.y0)

    if (this.check.checked == true) {
      this.ctx.strokeStyle = '#318F5A';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.foto.x0,this.information_cedulas.foto.y0, this.draw_width, this.draw_height);
    } else {
      this.img_canvas();
    }
  }

  draw_fecha_expiracion(){
    this.canvas = document.getElementById('micanvas');
    this.ctx = this.canvas.getContext("2d");
    
    this.check = document.getElementById('check_fecha_expiracion')
    !this.check
    this.draw_width = (this.information_cedulas.fecha_expiracion.x1 - this.information_cedulas.fecha_expiracion.x0)
    this.draw_height = (this.information_cedulas.fecha_expiracion.y1 - this.information_cedulas.fecha_expiracion.y0)

    if (this.check.checked == true) {
      this.ctx.strokeStyle = '#318F5A';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.fecha_expiracion.x0,this.information_cedulas.fecha_expiracion.y0, this.draw_width, this.draw_height);
    } else {
      this.img_canvas();
    }
  }

  draw_huella_digital(){
    this.canvas = document.getElementById('micanvas');
    this.ctx = this.canvas.getContext("2d");
    
    this.check = document.getElementById('check_huella_digital')
    !this.check
    this.draw_width = (this.information_cedulas.huella_digital.x1 - this.information_cedulas.huella_digital.x0)
    this.draw_height = (this.information_cedulas.huella_digital.y1 - this.information_cedulas.huella_digital.y0)

    if (this.check.checked == true) {
      this.ctx.strokeStyle = '#318F5A';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.huella_digital.x0,this.information_cedulas.huella_digital.y0, this.draw_width, this.draw_height);
    } else {
      this.img_canvas();
    }
  }

  draw_firma(){
    this.canvas = document.getElementById('micanvas');
    this.ctx = this.canvas.getContext("2d");
    
    this.check = document.getElementById('check_firma')
    !this.check
    this.draw_width = (this.information_cedulas.firma.x1 - this.information_cedulas.firma.x0)
    this.draw_height = (this.information_cedulas.firma.y1 - this.information_cedulas.firma.y0)

    if (this.check.checked == true) {
      this.ctx.strokeStyle = '#318F5A';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.firma.x0,this.information_cedulas.firma.y0, this.draw_width, this.draw_height);
    } else {
      this.img_canvas();
    }
  }
}
