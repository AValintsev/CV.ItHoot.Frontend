import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DatePipe, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {RouterModule} from '@angular/router';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from "@angular/material/snack-bar";

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    RouterModule,
  ],
  providers: [
    {provide:DatePipe},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
