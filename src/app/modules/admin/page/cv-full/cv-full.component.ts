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
export class CvFullComponent implements OnInit {
  @ViewChild('resumeDiv') resumeId!: ElementRef;
  resume!: ResumeDto;

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService
  ) {



  }

  ngOnInit(): void {
    this.route.params.pipe(map((params) => params['id'])).subscribe((id) => {
      this.resumeService.getResumeById(id).subscribe(resume => this.resume = resume);

      const zoom = panzoom(document.getElementById('resumeDiv')!, {
        minZoom: 0.3,
        maxZoom: 3.5,
        bounds: true,
        disableKeyboardInteraction: true,
        boundsPadding: 0.2
      });
    });
  }

}
