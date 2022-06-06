import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PositionPageComponent} from "./position-page/position-page.component";

const routes: Routes = [
  {
    path: '',
    component: PositionPageComponent
  }

];

@NgModule({
  declarations: [],
  imports:
    [
      RouterModule.forChild(routes),
    ],
  exports: [RouterModule]
})
export class PositionRoutingModule { }
