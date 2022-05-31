import { SmallTeamDto } from './../../../../models/team/small-team-dto';
import { ResumeService } from 'src/app/services/resume.service';
import { Observable, of } from 'rxjs';
import {Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {Component, OnInit} from '@angular/core';
import {Users} from 'src/app/models/users-type';
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
  userName$:Observable<string> = of('User')
  constructor(
    public accountService: AccountService,
    private router: Router,
    private resumeService:ResumeService,
    private clientTeamService: ClientTeamService
  ) { }

  ngOnInit(): void {
  this.teamList$ = this.clientTeamService.getAllTeam()
    this.clientTeamService.getAllTeam().subscribe(console.log)
    this.userNamed()
  }
  
  changeTeam(value:any){
   console.log(value.source.value)
 
   this.clientTeamService.changeTeam(value.source.value)
  }

  userNamed(){
    if (this.accountService.getStoreRole() === Users[2]){
      this.userName$ = this.resumeService.getAllResume().pipe(map(resume => resume[0]?.firstName))
    } else if (!this.resumeService.getAllResume()){
      this.userName$ = of('User')
    }
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
