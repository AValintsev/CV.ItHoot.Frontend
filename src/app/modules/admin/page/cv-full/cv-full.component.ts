import {map, takeUntil} from 'rxjs/operators';
import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ResumeService} from 'src/app/services/resume.service';
import {ResumeDto} from 'src/app/models/resume/resume-dto';
import panzoom from 'panzoom';
import {Subject} from 'rxjs';

@Component({
  selector: 'cv-cv-full',
  templateUrl: './cv-full.component.html',
  styleUrls: ['./cv-full.component.scss'],
})
export class CvFullComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  @Input() id: number = 0;
  @ViewChild('resume') resumeId!: ElementRef;
  resume!: ResumeDto;

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService
  ) {}

  ngOnInit(): void {
    this.route.params
    .pipe(
      map((params) => params['id'])
      )
      .subscribe((id) => {
      this.resumeService.getResumeHtmlById(id).pipe(
        takeUntil(this.destroy$)
      ).subscribe((resume) => {
        this.resumeId.nativeElement.innerHTML = resume.html;
      });
      const zoom = panzoom(document.getElementById('resume')!, {
        minZoom: 0.3,
        maxZoom: 3.5,
        bounds: true,
        disableKeyboardInteraction: true,
        boundsPadding: 0.2
      });
    });
  }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
