import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ResumeService} from 'src/app/services/resume.service';
import {SmallResumeDto} from '../../../models/resume/small-resume-dto';
import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'cv-user-resume',
  templateUrl: './user-cv-list.component.html',
  styleUrls: ['./user-cv-list.component.scss'],
})
export class UserCvListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  // smallResumeDto$!:Observable<SmallResumeDto[]>
  smallResumeDto!: SmallResumeDto[];
  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService
      .getAllResume().pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((response) => (this.smallResumeDto = response.items));
  }
  refresh() {
    this.resumeService
      .getAllResume().pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((response) => (this.smallResumeDto = response.items));
  }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
