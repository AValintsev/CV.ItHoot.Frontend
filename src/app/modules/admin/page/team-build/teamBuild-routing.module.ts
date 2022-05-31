import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TeamBuildsListComponent} from "./team-builds-list/team-builds-list.component";


const routes: Routes = [
  {
    path: '',
    component: TeamBuildsListComponent
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
export class TeamBuildRoutingModule { }
