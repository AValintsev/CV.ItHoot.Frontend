import { CoreModule } from './modules/core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { DatePipe, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { RouterModule } from '@angular/router';
import { MaterialModule} from './modules/material/material.module';
import {MatNativeDateModule} from '@angular/material/core';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    MatNativeDateModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    RouterModule,
  ],
  providers: [
    {provide:DatePipe},
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
