import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APICedulasService {

  urlApi = 'http://192.168.0.107:5000/cedula/file-upload/'

  constructor(private http: HttpClient) { 
    console.log('Servicio')
  }

  public post(body: FormData) {
    return this.http.post(this.urlApi, body).pipe(map(data => { return data }));
  }
}