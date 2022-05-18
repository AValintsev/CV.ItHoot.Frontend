import { SmallResumeDto } from '../../../../models/small-resume-dto';
import { Component, OnInit } from '@angular/core';
import { ResumeService } from 'src/app/services/resume.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cv-admin-cv-list',
  templateUrl: './admin-cv-list.component.html',
  styleUrls: ['./admin-cv-list.component.scss']
})
export class AdminCvListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'position', 'skills', 'loading', 'status', 'action'];
  resumes: SmallResumeDto[] = [];
  
  constructor(
    public resumeService: ResumeService, 
    private snackService: SnackBarService
  ) { }

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
  savePdf(id:number){
    this.resumeService.getPdf(id).pipe(
    ).subscribe(respons=>this.downloadFile(respons))
  }
  downloadFile(data: Blob) {
    console.log('url')
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
