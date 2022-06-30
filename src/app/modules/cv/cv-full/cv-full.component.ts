import { takeUntil } from 'rxjs/operators';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from 'src/app/services/resume.service';
import { map } from 'rxjs/operators';
import { ResumeDto } from 'src/app/models/resume/resume-dto';
import panzoom from "panzoom";
import { Subject } from 'rxjs';


@Component({
  selector: 'cv-cv-full',
  templateUrl: './cv-full.component.html',
  styleUrls: ['./cv-full.component.scss']
})
export class CvFullComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy$ = new Subject<boolean>();
  @Input() id: number = 0;
  resume!: ResumeDto;
  @ViewChild('resume') resumeHtml!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService) {

  }
  ngOnInit(): void {
    this.route.params.pipe(map(params => params['id'])).subscribe(id => {
      this.resumeService.getResumeHtmlById(id).pipe(
        takeUntil(this.destroy$)
      ).subscribe((resume) => {
        this.resumeHtml.nativeElement.innerHTML = resume.html;
      });
    });
  }

  ngAfterViewInit(): void {
    const zoom = panzoom(this.resumeHtml.nativeElement, {
      minZoom: 0.3,
      maxZoom: 1.3,
      bounds: true,
      disableKeyboardInteraction: true,
      boundsPadding: 0.1
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
