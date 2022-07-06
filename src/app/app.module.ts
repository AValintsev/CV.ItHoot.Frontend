import {Compiler, COMPILER_OPTIONS, CompilerFactory, Injector, NgModule} from '@angular/core';
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
import {JitCompilerFactory} from "@angular/platform-browser-dynamic";

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}


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
    MonacoEditorModule.forRoot()
  ],
  providers: [
    {provide: DatePipe},
    {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
    {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
    {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
