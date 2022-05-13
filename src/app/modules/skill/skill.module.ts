import {NgModule} from '@angular/core';
import {SkillRoutingModule} from "./skill-routing.module";
import { SkillPageComponent } from './skill-page/skill-page.component';
import {CoreModule} from "../core/core.module";
import {MatTableModule} from "@angular/material/table";
import { SkillDialogComponent } from './skill-dialog/skill-dialog.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDialogModule} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SkillPageComponent,
    SkillDialogComponent
  ],
  imports: [
    SkillRoutingModule,
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
export class SkillModule {
}
