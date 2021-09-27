import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficasComponent } from './graficas/graficas.component';

import { UsuarioAlertsComponent } from './usuario-alerts/usuario-alerts.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard/:id', component: DashboardComponent },
      //  { path: '', component: ProductListComponent },
      //  { path: 'product/:productId', component: ProductDetailComponent },
    ]),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    DashboardComponent,
    UsuarioAlertsComponent,
    GraficasComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
