import {map} from 'rxjs/operators';
import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ResumeService} from 'src/app/services/resume.service';
import {ResumeDto} from 'src/app/models/resume/resume-dto';
import panzoom from "panzoom";
import {UserHeaderBtnService} from 'src/app/services/user-header-btn.service';


@Component({
  selector: 'cv-cv-full',
  templateUrl: './cv-full.component.html',
  styleUrls: ['./cv-full.component.scss']
})
export class CvFullComponent implements OnInit, AfterViewInit {
  @Input() id: number = 0;
  resume!: ResumeDto;

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService,
    private userHeaderBtnService: UserHeaderBtnService
  ) {

  }

  ngOnInit(): void {
    this.route.params.pipe(map(params => params['id'])).subscribe(id => {
      this.resumeService.getResumeById(id).subscribe(resume => {
        this.resume = resume;
        this.userHeaderBtnService.setUserData({
          id: resume.id,
          firstName: resume.firstName,
          lastName: resume.lastName
        })
      })
    });
    this.setHeaderBtn(['back', 'create', 'menu-list', 'edit','home'])
  }

  setHeaderBtn(params: string[]) {
    this.userHeaderBtnService.setBTNs(params)
  }

  ngAfterViewInit(): void {
    const zoom = panzoom(document.getElementById("zoom")!, {
      minZoom: 0.3,
      maxZoom: 1.3,
      bounds: true,
      disableKeyboardInteraction: true,
      boundsPadding: 0.1
    });
  }
}
