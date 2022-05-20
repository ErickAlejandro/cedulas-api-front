import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { ICedulas } from '../interfaces/ICedulas';

@Injectable({
  providedIn: 'root'
})
export class APICedulasService {
  // La URL puede cambiar dependiendo de la activacion del Servidor AWS
  url="http://34.226.121.78:5000/cedula/";
  constructor(private http:HttpClient) { }
  getCedulas():Observable <ICedulas[]> {
    return this.http.get<ICedulas[]>(this.url);
  }
}
