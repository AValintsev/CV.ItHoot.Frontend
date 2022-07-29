import {MatDialogModule} from '@angular/material/dialog';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from "./users-routing.module";
import {UserListPageComponent} from './user-list-page/user-list-page.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {PipesModule} from "../../../shared/directives/pipes.module";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CreateUserDialogComponent} from './create-user-dialog/create-user-dialog.component';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    CreateUserDialogComponent,
    UserListPageComponent
  ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        PipesModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatDialogModule,
        MatTooltipModule
    ]
})
export class UserModule { }
