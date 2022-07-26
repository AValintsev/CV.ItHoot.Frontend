import { MatMenuModule } from '@angular/material/menu';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SkillDialogComponent} from './skill-dialog/skill-dialog.component';
import {SkillPageComponent} from "./skill-page/skill-page.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDialogModule} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DeleteModalService} from 'src/app/services/delete-modal.service';

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
      CommonModule,
      MatInputModule,
      FormsModule,
      ReactiveFormsModule,
      MatButtonToggleModule,
      MatMenuModule,
      RouterModule.forChild(routes),
    ],
  exports: [RouterModule],
  providers:[DeleteModalService]
})
export class SkillRoutingModule { }
