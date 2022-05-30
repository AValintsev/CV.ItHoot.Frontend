import { ResumeService } from 'src/app/services/resume.service';
import { SmallResumeDto } from '../../../models/resume/small-resume-dto';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Component({
  selector: 'cv-user-cv-list',
  templateUrl: './user-cv-list.component.html',
  styleUrls: ['./user-cv-list.component.scss']
})
export class UserCvListComponent implements OnInit {
  // smallResumeDto$!:Observable<SmallResumeDto[]>
  smallResumeDto$!: Observable<SmallResumeDto[]>
  constructor(
    private resumeService: ResumeService
  ) { }

  ngOnInit(): void {
    this.smallResumeDto$ = this.resumeService.getAllResume()
    this.smallResumeDto$.subscribe(e=>{console.log('user-list',e)})
  }

}

