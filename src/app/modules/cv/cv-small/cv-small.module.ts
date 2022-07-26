import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {CvSmallComponent} from './cv-small.component';
import {NgModule} from '@angular/core';
import {ModalDeleteUserModule} from '../../shared/modals/modal-delete-user/modal-delete-user.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
	declarations: [CvSmallComponent],
    imports: [
        CommonModule,
        MatCardModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        ModalDeleteUserModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatTooltipModule
    ],
	exports: [CvSmallComponent],
})

export class CvSmallModule { }
