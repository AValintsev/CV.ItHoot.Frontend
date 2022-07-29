import {DirectivesModule} from 'src/app/modules/shared/directives/directives.module';
import {MatDividerModule} from '@angular/material/divider';
import {DeleteModalService} from 'src/app/services/delete-modal.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {SnackBarService} from 'src/app/services/snack-bar.service';


@NgModule({
	imports: [CommonModule, MatButtonModule, RouterModule, MatTooltipModule, MatMenuModule, MatIconModule, MatDialogModule,MatDividerModule,DirectivesModule],
	declarations: [HeaderComponent],
	exports: [HeaderComponent],
	providers: [SnackBarService, DeleteModalService]
})

export class HeaderModule { }
