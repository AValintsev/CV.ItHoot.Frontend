import { Router, NavigationStart } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { StatusTeamResume, TeamApprove, TeamResumeDto } from './../../../../models/team/create-team-dto';
import { TeamService } from './../../../../services/team.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeamDto} from 'src/app/models/team/create-team-dto';
import { ClientTeamService } from 'src/app/services/client/client-team.service';
import { StatusTeam } from 'src/app/models/enums';

@Component({
  selector: 'cv-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})

export class TeamsComponent implements OnInit {
  statusResume = StatusTeamResume
  StatusTeam = StatusTeam
  teamName!: string
  statusTeam: number = 1
  checkArrayAll: number[] = []
  statusObject: TeamApprove = { teamId: 0, resumes: [] }
  resume: any = []
  teamId!: number


  constructor(
    private dialog: MatDialog,
    public clientTeamService: ClientTeamService,
    private teamService: TeamService,
    private snackBarService: SnackBarService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.getResumeArray()
  }


  statusChang(arr: [TeamApprove, number[]]) {
      this.statusObject = arr[0];
      this.checkArrayAll = arr[1]
  }
objZeroing(){
  this.statusObject = { teamId: 0, resumes: [] }
  this.checkArrayAll.length = 0
}

  getResumeArray(id:number|null=null) {
    this.clientTeamService.getTeam().subscribe({
      next: response => {
        response.subscribe({
          next: (response: TeamDto) => {
            this.statusTeam = response.statusTeam
            this.resume = this.filterResponseArray(response)
            this.teamId = response.id;
            this.clientTeamService.headerTitle$.next(response.teamName)
            this.objZeroing()
          },
          error: () => this.snackBarService.showDanger('Something went wrong!'),
        })

      },
      error: () => this.snackBarService.showDanger('Something went wrong!'),
    })
  }
  filterResponseArray(resumes:any){
    let array = Array.from(resumes.positionResumes as any);
    return array.map((value: any) =>{
      if (resumes.statusTeam === StatusTeam.Approved){
        return [value[0], value[1].filter((e: any) => e.statusResume==this.statusResume.Selected)]
      } else{
         return value 
      }
      

    })
    
  }
  approveUsers() {
    this.teamService.approveTeam(this.statusObject).subscribe({
      next: response => {
        this.getResumeArray(this.teamId)
        this.objZeroing()  
      },
      error: () => this.snackBarService.showSuccess('Success')
    }
  )

  }
}
