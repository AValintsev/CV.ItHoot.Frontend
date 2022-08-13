import {map} from 'rxjs/operators';
import {AccountService} from '../../../services/account.service';
import {Component, OnInit} from '@angular/core';
import {FormGroup, UntypedFormGroup} from "@angular/forms";
import {ResumeService} from "../../../services/resume.service";
import {SnackBarService} from "../../../services/snack-bar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ResumeDto} from "../../../models/resume/resume-dto";
import {Subject} from 'rxjs';
import {UserHeaderBtnService} from 'src/app/services/user-header-btn.service';
import {ResumeSettingDialog} from "../../shared/resume/resume-setting-dialog/resume-setting-dialog.component";
import {ResumeFormBuilderService} from "../../../services/resume-builder/resume-form-builder.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'cv-resume-resume-create-page',
  templateUrl: './resume-create-page.component.html',
  styleUrls: ['./resume-create-page.component.scss']
})
export class ResumeCreatePageComponent implements OnInit {
  resume: ResumeDto = {} as ResumeDto;
  resumeChanged: Subject<ResumeDto> = new Subject<ResumeDto>();
  templateChanged: Subject<number> = new Subject<number>();
  resumeForm: FormGroup = {} as UntypedFormGroup;
  isLiveEdit: boolean = true;

  constructor(private resumeService: ResumeService,
              private snackbarService: SnackBarService,
              private router: Router,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              private resumeFormBuilder: ResumeFormBuilderService,
              private userHeaderBtnService: UserHeaderBtnService,
              private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setHeaderBtn(['back', 'home', 'change-position'])
    this.resumeForm = this.resumeFormBuilder.buildResumeForm();

    this.resume.experiences = [];
    this.resume.skills = [];
    this.resume.educations = [];
    this.resume.languages = [];
    this.changeFormDate()
    this.getFieldDate()
  }

  setHeaderBtn(params: string[]) {
    this.userHeaderBtnService.setBTNs(params)
  }

  private changeFormDate() {
    this.resumeForm.valueChanges.subscribe(resume => {
      this.resume = resume;
      this.resumeChanged.next(resume);
    })
  }

  private getFieldDate() {
    this.activatedRoute.queryParams.pipe(map(params => params.userId)).subscribe({
      next: params => {
        if (params) {
          this.resumeService.getResumeById(params).subscribe(resume => {
            this.templateChanged.next(resume.resumeTemplateId);
          })
        }
      }
    })
  }


  public submit(resume: ResumeDto) {
    this.resumeService.createResume(resume).subscribe(() => {
      this.snackbarService.showSuccess('Created');
      this.router.navigate(['/home/resume'])
    });
  }

  templateChange(templateId: number) {
    this.templateChanged.next(templateId);
  }

  openResumeSettingDialog() {
    const dialogRef = this.dialog.open(ResumeSettingDialog, {
      width: '600px',
      autoFocus: false,
      data: {resume: this.resume, resumeForm: this.resumeForm, templateChanged: this.templateChanged}
    });
  }

  changeTemplate(templateId: number) {
    this.templateChanged.next(templateId);
  }
}
