import { Data } from "./data";

export class Information_cedulas {
  cedula: Data;
  estado_civil: Data;
  foto: Data;
  lugar_nacimiento: Data
  fecha_nacimiento: Data
  nacionalidad: Data
  nombres: Data
  sexo: Data
  fecha_expiracion: Data

  constructor(){
    this.cedula = new Data;
    this.estado_civil = new Data;
    this.foto = new Data;
    this.lugar_nacimiento = new Data;
    this.fecha_nacimiento = new Data;
    this.nacionalidad = new Data;
    this.nombres = new Data;
    this.sexo = new Data;
    this.fecha_expiracion = new Data;
  }
}