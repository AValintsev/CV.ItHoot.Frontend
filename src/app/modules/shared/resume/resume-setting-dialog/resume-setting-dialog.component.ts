import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ResumeDto} from "../../../../models/resume/resume-dto";
import {FormGroup} from "@angular/forms";
import {Subject} from "rxjs";
import {ResumeTemplateDto} from "../../../../models/resume/resume-template-dto";
import {ResumeService} from "../../../../services/resume.service";
import {TemplatePreviewDialog} from "../../template-preview-dialog/template-preview-dialog.component";

@Component({
  selector: 'resume-setting-dialog',
  templateUrl: './resume-setting-dialog.component.html',
  styleUrls: ['./resume-setting-dialog.component.scss']
})
export class ResumeSettingDialog implements OnInit {

  resume:ResumeDto;
  resumeForm:FormGroup;
  templateChange:Subject<number>;
  resumeTemplates:ResumeTemplateDto[];
  @Input() isUserRole: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private resumeService:ResumeService
  ) {
    this.resume = data.resume;
    this.resumeForm = data.resumeForm;
    this.templateChange = data.templateChanged;
    if(data.isUserRole != null){
      this.isUserRole = data.isUserRole;
    }
  }

  ngOnInit(): void {
    this.resumeService.getAllTemplates().subscribe(templates => this.resumeTemplates = templates);
  }


  changeTemplate(templateId: number) {
    this.templateChange.next(templateId);
  }


  compareTemplate(template: any, template1: any) {
    return template === template1;
  }

  showPreview(e:Event,id:number){
    e.stopPropagation()
    const dialogRef = this.dialog.open(TemplatePreviewDialog, {
      height: '800px',
      autoFocus: false,
      panelClass: ['remove-style-scroll', 'change-material-style','remove-padding'],
      data: id
    });
  }
}
