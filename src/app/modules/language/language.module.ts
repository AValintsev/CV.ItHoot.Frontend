import {NgModule} from '@angular/core';
import {CoreModule} from "../core/core.module";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDialogModule} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {LanguageRoutingModule} from "./language-routing.module";
import { LanguagePageComponent } from './language-page/language-page.component';
import { LanguageDialogComponent } from './language-dialog/language-dialog.component';


@NgModule({
  declarations: [
    LanguagePageComponent,
    LanguageDialogComponent
  ],
  imports: [
    LanguageRoutingModule,
    CoreModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDialogModule,
    CommonModule,
    MatInputModule,
    FormsModule
  ]
})
export class LanguageModule {
}
