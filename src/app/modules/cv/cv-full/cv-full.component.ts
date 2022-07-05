import {map, takeUntil} from 'rxjs/operators';
import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ResumeService} from 'src/app/services/resume.service';
import {ResumeDto} from 'src/app/models/resume/resume-dto';
import panzoom from "panzoom";
import {Subject} from 'rxjs';
import { UserHeaderBtnService } from 'src/app/services/user-header-btn.service';
import { HttpResponseBase } from '@angular/common/http';


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
    private resumeService: ResumeService,
    private userHeaderBtnService:UserHeaderBtnService
    ) {

  }
  ngOnInit(): void {
    this.route.params.pipe(map(params => params['id'])).subscribe(id => {
      this.resumeService.getResumeHtmlById(id).pipe(
        takeUntil(this.destroy$)
      ).subscribe((resume) => {
        this.resumeHtml.nativeElement.innerHTML = resume.html;
        this.resumeService.getResumeById(id).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next:response=>{
if(response){
  console.log('response',response)
  this.userHeaderBtnService.setUserData({
    id:response.id,
    firstName:response.firstName,
    lastName:response.lastName
  })
}
          },
          error:error=>console.log(error)
        })
      });
    });
    this.setHeaderBtn(['back','create'])
  }

  setHeaderBtn(params:string[]){
    this.userHeaderBtnService.setBTNs(params)
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
