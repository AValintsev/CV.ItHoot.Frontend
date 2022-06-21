import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ResumeTemplateListPageComponent} from "./resume-template-list-page/resume-template-list-page.component";
import {ResumeTemplateEditPageComponent} from "./resume-template-edit-page/resume-template-edit-page.component";
import {ResumeTemplatePageComponent} from "./resume-template-page/resume-template-page.component";

const routes: Routes = [
  {
    path:'',
    component:ResumeTemplateListPageComponent
  },
  {
    path:':id',
    component:ResumeTemplatePageComponent
  },
  {
    path:'edit/:id',
    component:ResumeTemplateEditPageComponent
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
export class ResumeTemplateRoutingModule { }
