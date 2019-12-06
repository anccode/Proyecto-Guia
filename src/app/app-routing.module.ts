import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageComponent } from './images/image/image.component';
import { ImageListComponent } from './images/image-list/image-list.component';
import { ImagesComponent } from './images/images.component';
import { DescriptionComponent } from './description/description.component';


const routes: Routes = [
  {path:'',redirectTo:'image/upload',pathMatch:'full'},
  {path:'image',component:ImagesComponent,children:[
    {path:'upload',component:ImageComponent},
    {path:'list',component:ImageListComponent},
    {path:'component',component:DescriptionComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
