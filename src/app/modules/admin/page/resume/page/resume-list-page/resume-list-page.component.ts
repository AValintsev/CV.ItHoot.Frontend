import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ResumeService} from 'src/app/services/resume.service';
import {SmallResumeDto} from 'src/app/models/resume/small-resume-dto';
import {ResumeListFilter} from 'src/app/models/resume/resume-list-filter';

@Component({
  selector: 'resume-list-page',
  templateUrl: './resume-list-page.component.html',
  styleUrls: ['./resume-list-page.component.scss'],
})
export class ResumeListPage implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  resumes: SmallResumeDto[] = [];
  resumesCount: number = 0;
  url = '/admin/'
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(public resumeService: ResumeService) {
  }

  ngOnInit(): void { }

  refreshResumes(filters: ResumeListFilter | null): void {
    this.isLoadingResults = true;
    this.resumeService.getAllResume(filters).pipe(
      map(data => {
        this.isLoadingResults = false;
        this.isRateLimitReached = data === null;

        if (data === null) {
          return [];
        }

        this.resumesCount = data.totalRecords;
        return data.items;
      }),
      takeUntil(this.destroy$),
    )
      .subscribe(data => (this.resumes = data));
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
