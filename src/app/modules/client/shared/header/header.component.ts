import { SmallTeamDto } from './../../../../models/team/small-team-dto';
import { ResumeService } from 'src/app/services/resume.service';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Users } from 'src/app/models/users-type';
import { map } from 'rxjs/operators';
import { ClientTeamService } from 'src/app/services/client/client-team.service';


@Component({
  selector: 'cv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {
  Users = Users
  teamList$!: Observable<SmallTeamDto[]>
  showTeamName:boolean = true
  clientName$!:Observable<string>
  constructor(
    private location:Location,
    public accountService: AccountService,
    private router: Router,
    private resumeService: ResumeService,
    public clientTeamService: ClientTeamService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.clientName$ = this.clientTeamService.getAllTeam().pipe(map(array => array[0].clientUserName))
    this.getTeamList()
    this.clientTeamService.getAllTeam().subscribe(e=>console.log('getAllTeam',e))
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
          }else{
            this.showTeamName = false
          }
        
        }
      },
      error: error => {console.log(error) }
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

  getAllCv() {
    this.router.navigate(['/home/cv/'])
  }
  nextCv() {

  }

}
