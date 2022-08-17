import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {UserRole} from 'src/app/models/users-type';
import {ResumeDto} from 'src/app/models/resume/resume-dto';
import {ResumeService} from 'src/app/services/resume.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {Subject} from "rxjs";
import {ProposalService} from "../../../../../../services/proposal.service";
import {ResumeTemplateDto} from "../../../../../../models/resume/resume-template-dto";
import {MatDialog} from "@angular/material/dialog";
import {ResumeFormBuilderService} from "../../../../../../services/resume-builder/resume-form-builder.service";
import {ResumeSettingDialog} from "../../../../../shared/resume/resume-setting-dialog/resume-setting-dialog.component";

@Component({
  selector: 'resume-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class ResumeEditPage implements OnInit {

  resume: ResumeDto | null = null;
  resumeForm: FormGroup = {} as FormGroup;
  resumeChanged: Subject<ResumeDto> = new Subject<ResumeDto>();
  templateChanged: Subject<number> = new Subject<number>();
  resumeTemplates: ResumeTemplateDto[];
  isLiveEdit:boolean = false;
  userId!:any;

  constructor(
    private resumeService: ResumeService,
    private proposalService: ProposalService,
    private snackbarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private dialog: MatDialog,
    private resumeFormBuilderService: ResumeFormBuilderService,
  ) {

    this.route.params.subscribe(params => {
      const proposalId = params['proposalId'];
      const resumeId = params['resumeId'];
      const id = params['id'];
      this.userId = id;
      this.resumeForm = this.resumeFormBuilderService.buildResumeForm()
      this.resumeService.getAllTemplates().subscribe(templates => this.resumeTemplates = templates);

      if (proposalId && resumeId) {

        this.proposalService.getProposalResume(proposalId, resumeId).subscribe(data => {

          this.resume = data.resume;
          this.resume!.showLogo = data.showLogo;
          this.resume!.resumeTemplateId = data.resumeTemplateId;
          resumeFormBuilderService.patchForm(this.resume!, this.resumeForm);

        });

      } else if (proposalId == null && resumeId) {

        this.resumeService.getResumeById(resumeId).subscribe((resume) => {
          this.resume = resume;
          resumeFormBuilderService.patchForm(this.resume!, this.resumeForm);

        });
      } else if (id) {

        this.resumeService.getResumeById(id).subscribe((resume) => {
          this.resume = resume;
          resumeFormBuilderService.patchForm(this.resume!, this.resumeForm);
        });

      }

    });
    this.resumeForm.valueChanges.subscribe(value => {
      this.resume = value;
    });
  }


  ngOnInit(): void {
    this.resumeForm.valueChanges.subscribe(value => {
      this.resume = value;
      this.resumeChanged.next(this.resume!)
    })

  }

  submit(resume: ResumeDto) {
    resume.id = this.userId;
    this.resumeService.updateResume(resume).subscribe(() => {

      this.snackbarService.showSuccess('Edited');
      const role = this.accountService.getStoreRole();

      if (role === UserRole.User)
        this.router.navigate(['/home/cv/user-list', this.accountService.getUserId()]);
      if (role === UserRole.HR || role === UserRole.Admin)
        this.router.navigate(['/admin/resume']);
      else
        this.router.navigate(['/home/cv']);

    });
  }



  openResumeSettingDialog() {
    const dialogRef = this.dialog.open(ResumeSettingDialog, {
      width: '600px',
      autoFocus: false,
      data: {resume: this.resume,
        resumeForm: this.resumeForm,
        templateChanged: this.templateChanged,
        isUserRole: false
      }
    });


  }

  changeTemplate(templateId: number) {
    this.templateChanged.next(templateId);
  }


}
