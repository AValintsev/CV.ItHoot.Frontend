import {Injector, NgModule} from '@angular/core';
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
import {ErrorInterceptor} from "./helpers/error.interceptor";
import {MonacoEditorModule} from "ngx-monaco-editor";
import {ResumeFullSwitcherModule} from "./modules/cv/resume-full-switcher/resume-full-switcher.module";
import { DeleteModalService } from './services/delete-modal.service';



export let AppInjector: Injector;
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
    ResumeFullSwitcherModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [
    {provide: DatePipe},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    DeleteModalService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
