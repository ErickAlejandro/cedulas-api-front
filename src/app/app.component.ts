import { Component } from '@angular/core';
import { APICedulasService } from './service/api-cedulas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cedula-api';

  constructor( private ApiCedulasService:APICedulasService ){
    
  }
}
