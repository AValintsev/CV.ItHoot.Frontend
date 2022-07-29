import {MatIconModule} from '@angular/material/icon';
import {LoaderModule} from './../shared/components/loader/loader.module';
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
import {MatTooltipModule} from "@angular/material/tooltip";


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
        MatIconModule,
        LoaderModule,
        MatTooltipModule,
    ]
})
export class AccountModule { }
