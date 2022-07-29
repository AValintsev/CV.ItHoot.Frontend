import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProposalBuildsListComponent} from "./proposal-builds-list/proposal-builds-list.component";


const routes: Routes = [
  {
    path: '',
    component: ProposalBuildsListComponent
  },

];

@NgModule({
  declarations: [],
  imports:
    [
      RouterModule.forChild(routes),
    ],
  exports: [RouterModule]
})
export class ProposalBuildRoutingModule { }
