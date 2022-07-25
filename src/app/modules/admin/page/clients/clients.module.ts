import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsRoutingModule} from './clients-routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {ClientsListComponent} from './clients-list/clients-list.component';
import {ClientCreateDialogComponent} from './client-create-dialog/client-create-dialog.component';
import {ClientUpdateDialogComponent} from './client-update-dialog/client-update-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    ClientsListComponent,
    ClientCreateDialogComponent,
    ClientUpdateDialogComponent
  ],
    imports: [
        CommonModule,
        ClientsRoutingModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatDialogModule,
        FormsModule,
        MatTooltipModule
    ]
})
export class ClientsModule { }
