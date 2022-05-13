import {Component, OnInit} from '@angular/core';
import {ResumeService} from "../../../services/resume.service";
import {SmallResumeDto} from "../../../models/small-resume-dto";
import {SnackBarService} from "../../../services/snack-bar.service";

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.scss']
})
export class CvListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'position', 'skills', 'loading', 'status', 'action'];
  resumes: SmallResumeDto[] = [];

  constructor(public resumeService: ResumeService, private snackService: SnackBarService) {
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
          this.resumes = this.resumes.filter(i => i.id !== resume.id);
          this.snackService.showSuccess('Success');
        },
        error: () => {
          this.snackService.showDanger('Something went wrong');
        }
      });
  }
}
