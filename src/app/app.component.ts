import { Component } from '@angular/core';
import { APICedulasService } from './service/api-cedulas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cedula-api';
  cedulas = []
  constructor( private ApiCedulasService:APICedulasService ){  }

  ngOnInit():void{
    this.ApiCedulasService.getCedulas().subscribe(data => {
      console.log(data)
    },
    err =>{
      console.log(err.message);
    }
    )
  }

}
