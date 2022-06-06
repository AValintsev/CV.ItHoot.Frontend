import { ResumeService } from 'src/app/services/resume.service';
import { SmallResumeDto } from '../../../models/resume/small-resume-dto';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Component({
  selector: 'cv-user-resume',
  templateUrl: './user-cv-list.component.html',
  styleUrls: ['./user-cv-list.component.scss']
})
export class UserCvListComponent implements OnInit {
  // smallResumeDto$!:Observable<SmallResumeDto[]>
  smallResumeDto!: SmallResumeDto[]
  constructor(
    private resumeService: ResumeService
  ) { }

  ngOnInit(): void {
    this.resumeService.getAllResume().subscribe(
      response => this.smallResumeDto = response
    )
   
  }
  refresh(){
    this.resumeService.getAllResume().subscribe(
      response => this.smallResumeDto = response
    )
  }
}

