import {SmallResumeDto} from '../../../../../models/resume/small-resume-dto';
import {Component, OnInit} from '@angular/core';
import {ResumeService} from 'src/app/services/resume.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {saveAs} from 'file-saver';
import {Users} from 'src/app/models/users-type';
import {AccountService} from 'src/app/services/account.service';

@Component({
  selector: 'cv-admin-resume',
  templateUrl: './admin-cv-list.component.html',
  styleUrls: ['./admin-cv-list.component.scss']
})
export class AdminCvListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'position', 'skills', 'loading', 'status', 'action'];
  resumes: SmallResumeDto[] = [];

  constructor(
    public resumeService: ResumeService,
    private snackService: SnackBarService,
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.resumeService.getAllResume().subscribe(resumeArray => {
      this.resumes = resumeArray;
    });
  }


  deleteResume(resume: SmallResumeDto): void {
    this.resumeService.deleteResume(resume.id).subscribe(
      {
        next: () => {
          const role = this.accountService.getStoreRole();
          if(role === Users[0]) {
            var delResume = this.resumes.find(i => i.id == resume.id);
            if (delResume != null) {
              var currentDate = new Date();
              delResume.deletedAt = currentDate.toString();
            }
          }
          else {
            this.resumes = this.resumes.filter(i => i.id !== resume.id);
          }
          this.snackService.showSuccess('Success');
        },
        error: () => {
          this.snackService.showDanger('Something went wrong');
        }
      });
  }

  getResumePdf(resume: SmallResumeDto) {
    this.resumeService.getPdf(resume.id).subscribe(response => {
      saveAs(response, `${resume.firstName} ${resume.lastName}.pdf`);
    });
  }

  recoverResume(resume: SmallResumeDto): void {
    this.resumeService.recoverResume(resume).subscribe(
      {
        next: () => {
          var recoverResume = this.resumes.find(i => i.id == resume.id);
          if (recoverResume != null) {
            recoverResume.deletedAt = null;
          }
          this.snackService.showSuccess('Success');
        },
        error: () => {
          this.snackService.showDanger('Something went wrong');
        }
      });
  }
}
