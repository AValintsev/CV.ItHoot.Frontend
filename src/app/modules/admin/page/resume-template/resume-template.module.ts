import {NgModule} from "@angular/core";
import {ResumeTemplateRoutingModule} from "./resume-template-routing.module";
import {RouterModule} from "@angular/router";
import {ResumeTemplateListPageComponent} from "./resume-template-list-page/resume-template-list-page.component";
import {ResumeTemplatePageComponent} from "./resume-template-page/resume-template-page.component";
import {ResumeTemplateEditPageComponent} from "./resume-template-edit-page/resume-template-edit-page.component";
import {CodemirrorModule} from "@ctrl/ngx-codemirror";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  imports: [
    RouterModule,
    ResumeTemplateRoutingModule,
    CodemirrorModule,
    MatTableModule
  ],
  exports: [
  ],
  declarations: [
    ResumeTemplateListPageComponent,
    ResumeTemplatePageComponent,
    ResumeTemplateEditPageComponent
  ]
})

export class ResumeTemplateModule {
}
