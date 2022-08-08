import {map} from 'rxjs/operators';
import {Component, Injector, OnInit} from '@angular/core';
import {FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ResumeDto} from 'src/app/models/resume/resume-dto';
import {ResumeService} from 'src/app/services/resume.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {Subject} from "rxjs";
import {ResumeFormBuilderService} from "../../../../services/resume-builder/resume-form-builder.service";
import {
  TemplatePreviewDialogAdminComponent
} from "../resume/template-preview-dialog/template-preview-dialog-admin.component";
import {MatDialog} from "@angular/material/dialog";
import {ResumeTemplateDto} from "../../../../models/resume/resume-template-dto";

@Component({
  selector: 'cv-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {

  resumeChanged: Subject<ResumeDto> = new Subject<ResumeDto>();
  templateChanged: Subject<number> = new Subject<number>();
  resumeTemplates:ResumeTemplateDto[];
  resumeDto: ResumeDto = {} as ResumeDto;
  resumeForm: FormGroup = {} as UntypedFormGroup;

  constructor(
    private resumeService: ResumeService,
    private snackbarService: SnackBarService,
    private router: Router,
    private resumeFormBuilder: ResumeFormBuilderService,
    private dialog:MatDialog
  ) {

    this.resumeService.getAllTemplates().subscribe(templates => this.resumeTemplates = templates);
    this.resumeForm = this.resumeFormBuilder.buildResumeForm();

    this.resumeDto.experiences = [];
    this.resumeDto.skills = [];
    this.resumeDto.educations = [];
    this.resumeDto.languages = [];
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
    this.resumeForm.valueChanges.subscribe(resume => (this.resumeDto = resume));
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
    const dialogRef = this.dialog.open(TemplatePreviewDialogAdminComponent, {
      height: '800px',
      autoFocus: false,
      panelClass: ['remove-style-scroll', 'change-material-style', 'remove-padding'],
      data: id
    });
  }


}
