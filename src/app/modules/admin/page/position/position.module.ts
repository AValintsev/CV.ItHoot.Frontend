import {NgModule} from "@angular/core";
import {PositionRoutingModule} from "./position-routing.module";
import { PositionPageComponent } from './position-page/position-page.component';
import { PositionDialogComponent } from './position-dialog/position-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [

    PositionPageComponent,
       PositionDialogComponent
  ],
  imports: [
    PositionRoutingModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
  ]
})
export class PositionModule {
}
