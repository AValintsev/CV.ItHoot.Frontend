import {NgModule} from "@angular/core";
import {ResumeTemplateRoutingModule} from "./resume-template-routing.module";
import {RouterModule} from "@angular/router";
import {ResumeTemplateListPageComponent} from "./resume-template-list-page/resume-template-list-page.component";
import {ResumeTemplatePageComponent} from "./resume-template-page/resume-template-page.component";
import {ResumeTemplateEditPageComponent} from "./resume-template-edit-page/resume-template-edit-page.component";
import {CodemirrorModule} from "@ctrl/ngx-codemirror";
import {MatTableModule} from "@angular/material/table";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MonacoEditorModule} from "ngx-monaco-editor";


@NgModule({
  imports: [
    RouterModule,
    ResumeTemplateRoutingModule,
    CodemirrorModule,
    MatTableModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MonacoEditorModule,
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
