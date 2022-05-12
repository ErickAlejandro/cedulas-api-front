import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiCedulasOcrComponent } from './components/api-cedulas-ocr/api-cedulas-ocr.component';
import { ComoUsarComponent } from './components/como-usar/como-usar.component';
import { DocumentacionApiComponent } from './components/documentacion-api/documentacion-api.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path:'', redirectTo: '/api-cedulas-ocr', pathMatch: 'full' },
  { path: 'api-cedulas-ocr', component: ApiCedulasOcrComponent },
  { path: 'documentacion', component: DocumentacionApiComponent },
  { path: 'como-usar', component: ComoUsarComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const rountingComponents = [ApiCedulasOcrComponent, DocumentacionApiComponent, ComoUsarComponent, PageNotFoundComponent]