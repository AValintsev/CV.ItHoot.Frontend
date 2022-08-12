import {UserHeaderBtnService} from '../../../services/user-header-btn.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ResumeService} from 'src/app/services/resume.service';
import {SmallResumeDto} from '../../../models/resume/small-resume-dto';
import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'cv-user-resume',
  templateUrl: './resume-list-page.component.html',
  styleUrls: ['./resume-list-page.component.scss'],
})
export class ResumeListPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  smallResumeDto!: SmallResumeDto[];
  constructor(
    private resumeService: ResumeService,
    private userHeaderBtnService:UserHeaderBtnService
    ) {}

  ngOnInit(): void {
    this.setHeaderBtn(['create','menu-list-home','menu-list-small','resume-list-page'])
    this.resumeService
      .getAllResume().pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((response) => (this.smallResumeDto = response.items));
  }
  setHeaderBtn(params:string[]){
    this.userHeaderBtnService.setBTNs(params)
  }
  refresh() {
    this.resumeService
      .getAllResume().pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((response) => (this.smallResumeDto = response.items));
  }
   ngOnDestroy(){
    this.setHeaderBtn([''])
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
