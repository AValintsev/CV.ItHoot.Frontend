import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TeamComponent } from './page/team/team.component';
import { CommonModule } from '@angular/common';
import { CardsRowComponent } from './component/cards-row/cards-row.component';
import { ModalDeleteUserComponent } from './component/modal-delete-user/modal-delete-user.component';

const routes: Routes = [
	{ path: '', component: TeamComponent }
]

@NgModule({
	declarations: [TeamComponent, CardsRowComponent, ModalDeleteUserComponent],
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatDialogModule,
		RouterModule.forChild(routes)],
	exports: [TeamComponent, CardsRowComponent],
})

export class ClientRoutingModule {

}