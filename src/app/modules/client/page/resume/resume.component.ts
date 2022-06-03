import { ClientTeamService } from './../../../../services/client/client-team.service';
import { switchMap, tap } from 'rxjs/operators';
import { TeamService } from './../../../../services/team.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResumeDto } from 'src/app/models/resume/resume-dto';

@Component({
  selector: 'cv-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  showLogo!:boolean
  resumeTemplateId = 1
  resume!: ResumeDto
  constructor(
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService,
    private clientTeamService:ClientTeamService
  ) { }

  ngOnInit(): void {
    this.getResume()
  }
  getResume(){
    this.activatedRoute.params.pipe(
      tap(params=>{
        this.showLogo=params.showLogo
       
        this.teamService.getTeamById(params.teamId).subscribe(
           response =>{
          if(response){
            console.log('response',response)
             this.clientTeamService.headerTitle$.next(response.teamName)
          }
        }
        )
      }),
      switchMap(params => this.teamService.getTeamResume(params.teamId, params.resumeId))
    ).subscribe({
      next: response => { 
        this.resume = response.resume;
        this.resume.showLogo = response.showLogo;
        this.resumeTemplateId = response.resumeTemplateId;
        console.log('qqqqqqqqqqqqqqqqqqqq',response)
      
      },
      error: error => console.log(error)
    })
  }
}
