import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';


// Firebase
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

//Components
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductComponent } from './components/products/product/product.component';
import { AppComponent } from './app.component';
import { VistaPreviaComponent } from './components/vista-previa/vista-previa.component';
import { VistaComponent } from './components/vista/vista.component';
import { AgregarComponent } from './components/agregar/agregar.component';

//services
import { ProductService } from './services/product.service'

@NgModule({
  declarations: [
    AppComponent,
    VistaPreviaComponent,
    VistaComponent,
    AgregarComponent,
    ProductListComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
