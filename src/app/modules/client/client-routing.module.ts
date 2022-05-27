import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TeamComponent } from './page/team/team.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
	{ path: '', component: TeamComponent }
]

@NgModule({
	declarations: [TeamComponent],
	imports: [CommonModule,RouterModule.forChild(routes)],
	exports: [TeamComponent],
})

export class ClientRoutingModule {

}