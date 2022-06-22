import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ResumeService} from 'src/app/services/resume.service';
import {map} from 'rxjs/operators';
import {ResumeDto} from 'src/app/models/resume/resume-dto';
import panzoom from "panzoom";


@Component({
  selector: 'cv-cv-full',
  templateUrl: './cv-full.component.html',
  styleUrls: ['./cv-full.component.scss']
})
export class CvFullComponent implements OnInit,OnDestroy {
  @Input() id: number = 0;
  @ViewChild('doc') doc!: ElementRef;
  resume!: ResumeDto;

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService) {
  }

  ngOnInit(): void {

    this.route.params.pipe(map(params => params['id'])).subscribe(id => {
      this.resumeService.getResumeHtmlById(id).subscribe(resume => {
        this.doc.nativeElement.innerHTML = resume.html;
      });
      const zoom = panzoom(document.getElementById('doc')!,{
        minZoom:0.3,
        maxZoom:3.5,
        bounds:true
      });
    });
  }
  ngOnDestroy() { }
}
