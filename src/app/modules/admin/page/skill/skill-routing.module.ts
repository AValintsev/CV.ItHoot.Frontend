import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillDialogComponent } from './skill-dialog/skill-dialog.component';
import { SkillPageComponent } from "./skill-page/skill-page.component";
// import {CoreModule} from "../core/core.module";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from 'src/app/modules/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: SkillPageComponent
  }

];

@NgModule({
  declarations: [SkillPageComponent, SkillDialogComponent],
  imports:
    [
      MatTableModule,
      MatIconModule,
      MatButtonModule,
      MatFormFieldModule,
      MatAutocompleteModule,
      MatDialogModule,
      MaterialModule,
      CommonModule,
      MatInputModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes)
    ],
  exports: [RouterModule]
})
export class SkillRoutingModule { }
