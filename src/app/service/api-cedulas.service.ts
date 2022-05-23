import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICedulas } from '../interfaces/ICedulas';

@Injectable({
  providedIn: 'root'
})
export class APICedulasService {

  urlApi = 'http://3.89.217.18:5000/cedula/file-upload'

  constructor(private http:HttpClient){ }

   public post(url:string, body: FormData){
     return this.http.post(url, body);
   }
}
