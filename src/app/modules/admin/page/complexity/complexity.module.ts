import {NgModule} from "@angular/core";
import {ComplexityPageComponent} from './complexity-page/complexity-page.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {ComplexityDialogComponent} from "./complexity-dialog/complexity-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {ComplexityRoutingModule} from "./complexity-routing.module";
import {DeleteModalService} from "src/app/services/delete-modal.service";

@NgModule({
  declarations: [
    ComplexityDialogComponent,
    ComplexityPageComponent
  ],
  imports: [

    ComplexityRoutingModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
  ],
  providers:[DeleteModalService]
})
export class ComplexityModule {
}
