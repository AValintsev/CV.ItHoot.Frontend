import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
export class CvFullComponent implements OnInit, AfterViewInit {
  @Input() id: number = 0;
  resume!: ResumeDto;
  @ViewChild('scene', {static: false}) doc!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService) {
    this.route.params.pipe(map(params => params['id'])).subscribe(id => {
      this.resumeService.getResumeById(id).subscribe(
        {
          next: resume => {
            this.resume = resume

          },
          error: error => console.log(error)
        }
      );
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const zoom = panzoom(this.doc.nativeElement,{
      minZoom:0.3,
      maxZoom:1.3,
      bounds:true
    });
  }

}
