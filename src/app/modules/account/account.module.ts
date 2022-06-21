import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AccountRoutingModule} from './account-routing.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import {LoginByUrlComponent} from './login-by-url/login-by-url.component';
import {MatInputModule} from '@angular/material/input';


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
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class AccountModule { }
