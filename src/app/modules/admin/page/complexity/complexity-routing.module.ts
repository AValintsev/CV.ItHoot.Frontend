import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ComplexityPageComponent} from "./complexity-page/complexity-page.component";


const routes: Routes = [
  {
    path: '',
    component: ComplexityPageComponent
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
export class ComplexityRoutingModule { }
