import {NgModule} from '@angular/core';
import {UserSettingRoutingModule} from "./user-settings-routing.module";
import { UserSettingsComponent } from './user-settings/user-settings.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [

    UserSettingsComponent
  ],
  imports: [
    UserSettingRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class UserSettingslModule {
}
