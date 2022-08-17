import {Component, OnInit} from '@angular/core';
import {FormGroup, UntypedFormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ResumeDto} from 'src/app/models/resume/resume-dto';
import {ResumeService} from 'src/app/services/resume.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {Subject} from "rxjs";
import {ResumeFormBuilderService} from "../../../../../../services/resume-builder/resume-form-builder.service";
import {MatDialog} from "@angular/material/dialog";
import {ResumeTemplateDto} from "../../../../../../models/resume/resume-template-dto";
import {ResumeSettingDialog} from "../../../../../shared/resume/resume-setting-dialog/resume-setting-dialog.component";
import {TemplatePreviewDialog} from "../../../../../shared/template-preview-dialog/template-preview-dialog.component";

@Component({
  selector: 'resume-create-page',
  templateUrl: './resume-create-page.component.html',
  styleUrls: ['./resume-create-page.component.scss'],
})
export class ResumeCreatePage implements OnInit {

  resumeChanged: Subject<ResumeDto> = new Subject<ResumeDto>();
  templateChanged: Subject<number> = new Subject<number>();
  resumeTemplates:ResumeTemplateDto[];
  resume: ResumeDto = {} as ResumeDto;
  resumeForm: FormGroup = {} as UntypedFormGroup;
  isLiveEdit: boolean = false;

  constructor(
    private resumeService: ResumeService,
    private snackbarService: SnackBarService,
    private router: Router,
    private resumeFormBuilder: ResumeFormBuilderService,
    private dialog:MatDialog
  ) {

    this.resumeService.getAllTemplates().subscribe(templates => this.resumeTemplates = templates);
    this.resumeForm = this.resumeFormBuilder.buildResumeForm();

    this.resume.experiences = [];
    this.resume.skills = [];
    this.resume.educations = [];
    this.resume.languages = [];
    this.changeFormDate();

    this.resumeForm.valueChanges.subscribe(resume => this.resumeChanged.next(resume));
  }

  ngOnInit(): void {

  }


  public submit(resume: ResumeDto) {
    this.resumeService.createResume(resume).subscribe(() => {
      this.snackbarService.showSuccess('Created resume successfully')
      this.router.navigate(['/admin/resume']);
    })
  }

  private changeFormDate() {
    this.resumeForm.valueChanges.subscribe(resume => (this.resume = resume));
  }

  comparePosition(position: any, position1: any) {
    return position?.positionId === position1?.positionId;
  }

  compareTemplate(template: any, template1: any) {
    return template === template1;
  }

  changeTemplate(templateId: number) {
    this.templateChanged.next(templateId);
  }

  showPreview(e: Event, id: number) {
    e.stopPropagation()
    const dialogRef = this.dialog.open(TemplatePreviewDialog, {
      height: '800px',
      autoFocus: false,
      panelClass: ['remove-style-scroll', 'change-material-style', 'remove-padding'],
      data: id
    });
  }


  openResumeSettingDialog() {
    const dialogRef = this.dialog.open(ResumeSettingDialog, {
      width: '600px',
      autoFocus: false,
      data: {
        resume: this.resume,
        resumeForm: this.resumeForm,
        templateChanged: this.templateChanged,
        isUserRole: false
      }
    });
  }
}
