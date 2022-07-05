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

  check_cedula: any;
  check_nombres: any;
  check_lugar_nacimiento: any;
  check_fecha_nacimiento: any;
  check_nacionalidad: any;
  check_sexo: any;
  check_estado_civil: any;
  check_fecha_expiracion: any;
  check_huella_digital: any;
  check_foto: any;
  check_firma: any;

  campo_cedula: any;
  digito: any;
  ultimo_digito: any;
  pares: any;
  impares: any;
  number_1: any;
  number_3: any;
  number_5: any;
  number_7: any;
  number_9: any;
  suma_total: any;
  primer_digito_suma: any;
  decena: any;
  digito_validador: any;


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
          this.validar_cedula()
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

  uncheck(){
    this.img_canvas();
    this.check_cedula = document.getElementById('check_cedula')
    this.check_nombres = document.getElementById('check_nombres')
    this.check_lugar_nacimiento = document.getElementById('check_lugar_nacimiento')
    this.check_fecha_nacimiento = document.getElementById('check_fecha_nacimiento')
    this.check_nacionalidad = document.getElementById('check_nacionalidad')
    this.check_sexo = document.getElementById('check_sexo')
    this.check_estado_civil = document.getElementById('check_estado_civil')
    this.check_fecha_expiracion = document.getElementById('check_fecha_expiracion')
    this.check_huella_digital = document.getElementById('check_huella_digital')
    this.check_foto = document.getElementById('check_foto')
    this.check_firma = document.getElementById('check_firma')


    if(this.check_cedula != this.check_cedula.checked){
      this.check_cedula.checked = false;
    }

    if(this.check_nombres != this.check_nombres.checked){
      this.check_nombres.checked = false;
    }

    if(this.check_lugar_nacimiento != this.check_lugar_nacimiento.checked){
      this.check_lugar_nacimiento.checked = false;
    }
    
    if(this.check_fecha_nacimiento != this.check_fecha_nacimiento.checked){
      this.check_fecha_nacimiento.checked = false;
    }

    if(this.check_nacionalidad != this.check_nacionalidad.checked){
      this.check_nacionalidad.checked = false;
    }

    if(this.check_sexo != this.check_sexo.checked){
      this.check_sexo.checked = false;
    }

    if(this.check_estado_civil != this.check_estado_civil.checked){
      this.check_estado_civil.checked = false;
    }

    if(this.check_fecha_expiracion != this.check_fecha_expiracion.checked){
      this.check_fecha_expiracion.checked = false;
    }

    if(this.check_huella_digital != this.check_huella_digital.checked){
      this.check_huella_digital.checked = false;
    }

    if(this.check_foto != this.check_foto.checked){
      this.check_foto.checked = false;
    }

    if(this.check_firma != this.check_firma.checked){
      this.check_firma.checked = false;
    }

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
      this.ctx.strokeStyle = '#FF0000';
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
      this.ctx.strokeStyle = '#FFFF00';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.nombres.x0,this.information_cedulas.nombres.y0, this.draw_width, this.draw_height);
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
      this.ctx.strokeStyle = '#808000';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.lugar_nacimiento.x0,this.information_cedulas.lugar_nacimiento.y0, this.draw_width, this.draw_height);
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
      this.ctx.strokeStyle = '#008000';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.fecha_nacimiento.x0,this.information_cedulas.fecha_nacimiento.y0, this.draw_width, this.draw_height);
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
      this.ctx.strokeStyle = '#00FFFF';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.nacionalidad.x0,this.information_cedulas.nacionalidad.y0, this.draw_width, this.draw_height);
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
      this.ctx.strokeStyle = '#008080';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.sexo.x0,this.information_cedulas.sexo.y0, this.draw_width, this.draw_height);
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
      this.ctx.strokeStyle = '#0000FF';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.estado_civil.x0,this.information_cedulas.estado_civil.y0, this.draw_width, this.draw_height);
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
      this.ctx.strokeStyle = '#800080';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.foto.x0,this.information_cedulas.foto.y0, this.draw_width, this.draw_height);
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
      this.ctx.strokeStyle = '#A8366A';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.fecha_expiracion.x0,this.information_cedulas.fecha_expiracion.y0, this.draw_width, this.draw_height);
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
      this.ctx.strokeStyle = '#40F3FF';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.huella_digital.x0,this.information_cedulas.huella_digital.y0, this.draw_width, this.draw_height);
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
      this.ctx.strokeStyle = '#FF8F00';
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(this.information_cedulas.firma.x0,this.information_cedulas.firma.y0, this.draw_width, this.draw_height);
    }
  }

  refresh(): void{
    window.location.reload();
  }

  validar_cedula(){
    this.campo_cedula = this.information_cedulas.cedula.text_ocr

    if(this.campo_cedula.length == 10){
      this.digito = this.campo_cedula.substring(0,2)

      if(this.digito >= 1 && this.digito <= 24){
        this.ultimo_digito = this.campo_cedula.substring(9,10)
        this.pares = parseInt(this.campo_cedula.substring(1,2)) + parseInt(this.campo_cedula.substring(3,4)) + parseInt(this.campo_cedula.substring(5,6)) + parseInt(this.campo_cedula.substring(7,8))

        this.number_1 = this.campo_cedula.substring(0,1);
        this.number_1 = (this.number_1 * 2)
        if(this.number_1 > 9){ this.number_1 = (this.number_1 - 9)}

        this.number_3 = this.campo_cedula.substring(2,3);
        this.number_3 = (this.number_3 * 2)
        if(this.number_3 > 9){ this.number_3 = (this.number_3 - 9)}

        this.number_5 = this.campo_cedula.substring(4,5);
        this.number_5 = (this.number_5 * 2)
        if(this.number_5 > 9){ this.number_5 = (this.number_5 - 9)}

        this.number_7 = this.campo_cedula.substring(6,7);
        this.number_7 = (this.number_7 * 2)
        if(this.number_7 > 9){ this.number_7 = (this.number_7 - 9)}

        this.number_9 = this.campo_cedula.substring(8,9);
        this.number_9 = (this.number_9 * 2)
        if(this.number_9 > 9){ this.number_9 = (this.number_9 - 9)}

        this.impares = this.number_1 + this.number_3 + this.number_5 + this.number_7 + this.number_9;

        this.suma_total = (this.pares + this.impares);

        this.primer_digito_suma = String(this.suma_total).substring(0,1)

        this.decena = (parseInt(this.primer_digito_suma) + 1) * 10;

        this.digito_validador = this.decena - this.suma_total

        if(this.digito_validador == 10){
          this.digito_validador = 0
        }

        if(this.digito_validador == this.ultimo_digito){
          console.log('La cedula: ' + this.campo_cedula + ' es correcta')
        }else{
          console.log('La cedula: ' + this.campo_cedula + ' es incorrecta')
        }
      }else{
        console.log('Esta cedula no pertenece a ninguna Region')
      }
    }else{
      console.log('Esta cedula tiene menos de 10 digitos')
    }
  }
}
