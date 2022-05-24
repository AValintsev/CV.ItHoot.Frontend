import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ArchiveListPageComponent} from "./archive-list-page/archive-list-page.component";
import {ArchivePageComponent} from "./archive-page/archive-page.component";


const routes: Routes = [
  {
    path:'',
    component:ArchiveListPageComponent
  },
  {
    path:':id',
    component:ArchivePageComponent
  }

];

@NgModule({
  declarations: [],
  imports:[
      RouterModule.forChild(routes)
    ],
  exports: [RouterModule]
})
export class ArchiveRoutingModule { }
