import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {Users} from 'src/app/models/users-type';
import {ResumeDto} from 'src/app/models/resume/resume-dto';
import {ResumeService} from 'src/app/services/resume.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {Subject} from "rxjs";
import {ProposalService} from "../../../../services/proposal.service";
import {ResumeTemplateDto} from "../../../../models/resume/resume-template-dto";
import {MatDialog} from "@angular/material/dialog";
import {ResumeFormBuilderService} from "../../../../services/resume-builder/resume-form-builder.service";
import {
  TemplatePreviewDialogAdminComponent
} from "../resume/template-preview-dialog/template-preview-dialog-admin.component";

@Component({
  selector: 'cv-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {

  resume: ResumeDto | null = null;
  resumeForm: FormGroup = {} as FormGroup;
  resumeChanged: Subject<ResumeDto> = new Subject<ResumeDto>();
  templateChanged: Subject<number> = new Subject<number>();
  resumeTemplates: ResumeTemplateDto[];
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
  console.log(params)
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
  }

  ngOnInit(): void {
    this.resumeForm.valueChanges.subscribe(value => {
      this.resume = value;
      this.resumeChanged.next(this.resume!)
    })

  }


  submit(resume: ResumeDto) {
    resume.id = this.userId;
    console.log(resume)
    this.resumeService.updateResume(resume).subscribe(() => {
      
      this.snackbarService.showSuccess('Edited');
      const role = this.accountService.getStoreRole();

      if (role === Users[2])
        this.router.navigate(['/home/cv/user-list', this.accountService.getUserId()]);
      if (role === Users[0] || role === Users[1])
        this.router.navigate(['/admin/resume']);
      else
        this.router.navigate(['/home/cv']);

    });
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
