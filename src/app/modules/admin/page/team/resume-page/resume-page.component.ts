import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ResumeDto} from "../../../../../models/resume/resume-dto";
import {TeamService} from "../../../../../services/team.service";
import {ActivatedRoute} from "@angular/router";
import panzoom from "panzoom";

@Component({
  selector: 'cv-resume-page',
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.scss']
})
export class ResumePageComponent implements OnInit,AfterViewInit {

  @ViewChild('doc', {static: false}) doc!: ElementRef;
  resume: ResumeDto | null = null;

  constructor(private teamService:TeamService, private route:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const teamId = params['teamId'];
      const resumeId = params['resumeId'];

      this.teamService.getTeamResume(teamId, resumeId).subscribe(data => {
        this.resume = data.resume;
        this.resume!.resumeTemplateId = data.resumeTemplateId;
        this.resume!.showLogo = data.showLogo;

        const zoom = panzoom(this.doc.nativeElement,{
          minZoom:0.3,
          maxZoom:1.3,
          bounds:true
        });
      });
    });
  }

  ngAfterViewInit(): void {

  }
}
