import {map, takeUntil} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, UntypedFormGroup} from '@angular/forms';
import {ResumeService} from '../../../services/resume.service';
import {SnackBarService} from '../../../services/snack-bar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {UserRole} from 'src/app/models/users-type';
import {ResumeDto} from '../../../models/resume/resume-dto';
import {Subject} from 'rxjs';
import {UserHeaderBtnService} from 'src/app/services/user-header-btn.service';
import {ResumeSettingDialog} from "../../shared/resume/resume-setting-dialog/resume-setting-dialog.component";
import {ResumeFormBuilderService} from "../../../services/resume-builder/resume-form-builder.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'cv-resume-resume-edit-page',
  templateUrl: './resume-edit-page.component.html',
  styleUrls: ['./resume-edit-page.component.scss'],
})
export class ResumeEditPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  resume: ResumeDto | null = null;
  resumeChanged: Subject<ResumeDto> = new Subject<ResumeDto>();
  templateChanged: Subject<number> = new Subject<number>();
  resumeForm: FormGroup;
  isLiveEdit: boolean = true;

  constructor(
    private resumeService: ResumeService,
    private snackbarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private userHeaderBtnService: UserHeaderBtnService,
    private resumeFormBuilder: ResumeFormBuilderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.resumeForm = this.resumeFormBuilder.buildResumeForm();
    this.setDataDependentToId()
    this.changeFormDate();
    this.setHeaderBtn(['back', 'create', 'menu-list', 'create', 'home', 'change-position'])
  }

  setDataDependentToId() {
    this.route.params.pipe(map((params) => params['id'])).subscribe((id) => {
      this.resumeService.getResumeById(id).subscribe((resume) => {
        this.resume = resume;
        this.resumeFormBuilder.patchForm(this.resume, this.resumeForm);
        this.userHeaderBtnService.setUserData({
          id: resume.id,
          firstName: resume.firstName,
          lastName: resume.lastName
        })
      });
    });
  }

  setHeaderBtn(params: string[]) {
    this.userHeaderBtnService.setBTNs(params)
  }

  private changeFormDate() {
    this.resumeForm.valueChanges.subscribe(resume => {
      this.resume = resume;
      this.resumeChanged.next(this.resume!)
    });
  }


  submit(resume: ResumeDto) {
    this.resumeService.updateResume(resume).subscribe(() => {
      this.snackbarService.showSuccess('Resume saved!')
      this.router.navigate(['/home/resume']);
    });
  }

  templateChange(templateId: number) {
    this.templateChanged.next(templateId);
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
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
