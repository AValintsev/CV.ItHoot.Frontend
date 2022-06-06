import { SmallTeamDto } from './../../../../models/team/small-team-dto';
import { ResumeService } from 'src/app/services/resume.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Users } from 'src/app/models/users-type';
import { map, tap } from 'rxjs/operators';
import { ClientTeamService } from 'src/app/services/client/client-team.service';
import { StatusTeamResume, TeamResumeDto } from 'src/app/models/team/create-team-dto';
import { StatusTeam } from 'src/app/models/enums';

interface IcontrolPanel{
  resumeId: number,
  teamId: number,
  arr: TeamResumeDto[]|[],
  component?: '',
  index:(id:number)=>number,
  prev: (component: HeaderComponent)=>void,
  next: (component: HeaderComponent)=>void,
  checkerColorArrow:(component:HeaderComponent,id:number)=>void
}

@Component({
  selector: 'cv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {
  statusResume = StatusTeamResume
  StatusTeam = StatusTeam
  Users = Users
  teamList$!: Observable<SmallTeamDto[]>
  showTeamName: boolean = true
  clientName$!: Observable<string>
  notShowLeftBtnColor: boolean = true
  notShowRightBtnColor: boolean = true
  controlPanel: IcontrolPanel = {
    resumeId: 0,
    teamId: 0,
    arr: [],
    component: '',
    index: function (id: number) {
      if (id && this.arr && this.arr.length) {
        this.resumeId = this.arr.findIndex((elem: any) => elem.id == id)
        return this.resumeId
      }
      return 0
    },

    checkerColorArrow:function (component:HeaderComponent,id:number){
      if (id && this.arr && this.arr.length) {
        // this.resumeId = this.arr.findIndex((elem: any) => elem.id == id)
        component.notShowLeftBtnColor = component.controlPanel.index(id)===0?false:true
        component.notShowRightBtnColor = (component.controlPanel.index(id)+1) === this.arr.length?false:true
      }
    },

    prev: function (component: HeaderComponent) {
      if (this.arr && this.arr.length && this.resumeId > 0) {
        component.notShowLeftBtnColor = true
        this.resumeId = this.resumeId - 1;
        component.router.navigate(['client/team', this.teamId, 'resume', (this.arr[this.resumeId] as TeamResumeDto)?.id])
        if (~(this.resumeId - 1)){
          component.notShowLeftBtnColor = true
          
        } else{
          component.notShowLeftBtnColor = false 
        }
        component.notShowRightBtnColor = true
        
      }
    },
    next: function (component: HeaderComponent) {
      if (this.arr && this.arr.length && this.resumeId < this.arr.length - 1) {
        this.resumeId = this.resumeId + 1
        component.router.navigate(['client/team', this.teamId, 'resume', (this.arr[this.resumeId] as TeamResumeDto)?.id])
        component.notShowRightBtnColor = true
        component.notShowLeftBtnColor = true
        if (this.arr.length > this.resumeId + 1){
          component.notShowRightBtnColor = true
        }else{
          component.notShowRightBtnColor = false
        } 
        component.notShowLeftBtnColor = true 
      } 
    },
  }
  constructor(
    public accountService: AccountService,
    public router: Router,
    public clientTeamService: ClientTeamService,
  ) { }

  ngOnInit(): void {
    this.checkUrlFromArrow(this.router)
    console.log()
    this.clientTeamService.headerTitle$.subscribe(e => {})
    this.clientName$ = this.clientTeamService.getAllTeam().pipe(map(array => array[0].clientUserName))
    this.getTeamList()
    this.clientTeamService.numberCheckedResume$.subscribe(
      response => {
        if (response?.resumeId) {
          this.controlPanel.index(response!.resumeId);
          this.controlPanel?.checkerColorArrow(this,response?.resumeId)
        }
        if (response?.teamId) {
          this.controlPanel.teamId = response!.teamId
        }
      },
    )

    this.clientTeamService.headerUsersTeam$.pipe(
      tap(response => {
        if (response) {
          this.controlPanel.arr = this.filterResponseArray(response);
        }
      }),
    ).subscribe(
      {
        next: response => console.log(response),
        error: error => console.log(error)
      }
    )
    this.checkVisibleHeaderItem()
  }

 
private  checkUrlFromArrow(response: any) {
  console.log('=========', response)
      let regexp = new RegExp(`/client/teams`, 'g')
      const test = regexp.test(response.url);
  console.log('+=======++++', test)
      if (test) {
        this.showTeamName = true
      } else {
        this.showTeamName = false
      }
  }

  private getTeamList() {
    this.teamList$ = this.clientTeamService.getAllTeam()
  }
  private filterResponseArray(resumes: any): TeamResumeDto[] {
      const arr: TeamResumeDto[] = [];
      resumes.positionResumes.map((value: any) => {

        if (resumes.statusTeam === StatusTeam.Approved) {
          value[1].filter((e: any) => {
            if (e.statusResume == this.statusResume.Selected) {
               arr.push(e)
            }
          })
        }else{
          value[1].filter((e: any) => arr.push(e))
        }
        
      })
    console.log('[[[[[[[[[[[[[[[[[[[[[', arr)
      return arr
  }




 private checkVisibleHeaderItem() {
    this.router.events.subscribe({
      next: response => {
        if (response instanceof NavigationStart) {
          this.checkUrlFromArrow(response)
        }
        
      },
      error: error => { console.log(error) }
    })
  }

  changeTeam(value: any) {
    this.clientTeamService.changeTeam(value.source.value)
  }

  logout() {
    this.accountService.logout().subscribe({
      next: () => this.router.navigate(['/account/login'])
    })
  }

  prevCv() {
    this.controlPanel.prev(this)
  }
  nextCv() {
    this.controlPanel.next(this)
  }

  // getTeamName() {
  //   return this.teamName
  // }
}
