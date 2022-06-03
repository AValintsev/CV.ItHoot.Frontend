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
import { TeamResumeDto } from 'src/app/models/team/create-team-dto';


@Component({
  selector: 'cv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {
  Users = Users
  teamList$!: Observable<SmallTeamDto[]>
  showTeamName: boolean = true
  
  clientName$!: Observable<string>
  notShowLeftBtnColor:boolean = true
  notShowRightBtnColor:boolean = true
  controlPanel = {
    resumeId:0,
    teamId:0,
    arr:[],
    component:'',
    index:function(id:number){
      if (id && this.arr&& this.arr.length){
        this.resumeId = this.arr.findIndex((elem:any)=>elem.id==id)
      }
    }, 

    prev:function(component:HeaderComponent){
      if (this.arr&&this.arr.length && this.resumeId>0){
        component.notShowLeftBtnColor = true
        this.resumeId = this.resumeId-1;
        component.router.navigate(['client/team', this.teamId, 'resume', (this.arr[this.resumeId] as TeamResumeDto)?.id]) 
        component.notShowRightBtnColor = true
        component.notShowLeftBtnColor = true
      }else{
        component.notShowLeftBtnColor = false
      }
    },
    next: function (component: HeaderComponent) {
      if (this.arr &&this.arr.length && this.resumeId < this.arr.length-1) {
        this.resumeId = this.resumeId + 1
        component.router.navigate(['client/team', this.teamId, 'resume', (this.arr[this.resumeId] as TeamResumeDto)?.id]) 
        component.notShowRightBtnColor = true
        component.notShowLeftBtnColor = true
      } else {
        component.notShowRightBtnColor = false
      }
    },
  }
  constructor(
    public accountService: AccountService,
    public router: Router,
    public clientTeamService: ClientTeamService,
  ) { }

  ngOnInit(): void {
    this.clientTeamService.headerTitle$.subscribe(e=>{
      
    })
    this.clientName$ = this.clientTeamService.getAllTeam().pipe(map(array => array[0].clientUserName))
    this.getTeamList()
    this.clientTeamService.numberCheckedResume$.subscribe(
      response=>{
        if (response?.resumeId){
          this.controlPanel.index(response!.resumeId)
        }
        if (response?.teamId){
          this.controlPanel.teamId = response!.teamId
      }
    },
)

    this.clientTeamService.headerUsersTeam$.pipe(
      map(e => {
        if (e) {

          // this.teamName = 
          let arr: any[] = []
          e.positionResumes.forEach((element: any) => {
            arr.push(...element[1])
          });
          return arr
        }else{
           return e
        }
      }),
    ).subscribe((e => this.controlPanel.arr = e))
    this.checkVisibleHeaderItem()
  }

  private getTeamList() {
    this.teamList$ = this.clientTeamService.getAllTeam()
  }
  checkVisibleHeaderItem() {
    this.router.events.subscribe({
      next: response => {
        if (response instanceof NavigationStart) {
          let regexp = new RegExp(`/client/teams`, 'g')
          const test = regexp.test(response.url);
          if (test) {
            this.showTeamName = true
          } else {
            this.showTeamName = false
          }

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
