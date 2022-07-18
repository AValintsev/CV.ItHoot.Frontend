import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ClientsListComponent} from './clients-list/clients-list.component';

const routes: Routes = [
	{
		path: '',
		component: ClientsListComponent,
	},
];

@NgModule({
	declarations:[],
	imports: [
		RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ClientsRoutingModule { }
