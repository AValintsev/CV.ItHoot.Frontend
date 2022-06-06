import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AccountRoutingModule} from './account-routing.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginByUrlComponent } from './login-by-url/login-by-url.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginByUrlComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccountRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AccountModule { }
