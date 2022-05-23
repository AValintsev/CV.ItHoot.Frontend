import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResumeService} from 'src/app/services/resume.service';
import {map} from 'rxjs/operators';
import {ResumeDto} from 'src/app/models/resume-dto';
import {UserEventService} from 'src/app/services/userEvent.service';


@Component({
  selector: 'cv-cv-full',
  templateUrl: './cv-full.component.html',
  styleUrls: ['./cv-full.component.scss']
})
export class CvFullComponent implements OnInit {
  @Input() id: number = 0;
  resume!: ResumeDto;

  constructor(
    private userEventService: UserEventService,
    private route: ActivatedRoute,
    private router: Router,
    private resumeService: ResumeService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(map(params => params['id'])).subscribe(id => {
      this.resumeService.getResumeById(id).subscribe(resume=>this.resume= resume);
    });
  }
}
