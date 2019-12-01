import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VistaPreviaComponent } from './components/vista-previa/vista-previa.component';
import { VistaComponent } from './components/vista/vista.component';
import { AgregarComponent } from './components/agregar/agregar.component';

@NgModule({
  declarations: [
    AppComponent,
    VistaPreviaComponent,
    VistaComponent,
    AgregarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
