import { Observable, of } from 'rxjs';
import {Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {Component, OnInit} from '@angular/core';
import {Users} from 'src/app/models/users-type';
import { map } from 'rxjs/operators';
import { ResumeService } from 'src/app/services/resume.service';


@Component({
  selector: 'cv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  
})
export class HeaderComponent implements OnInit {
  Users = Users
  userName$:Observable<string> = of('User')
  constructor(
    public accountService: AccountService,
    private router: Router,
    private resumeService:ResumeService
  ) { }

  ngOnInit(): void {
    this.userNamed()
  }

  userNamed(){
    if (this.accountService.getStoreRole() === Users[2]){
      this.userName$ = this.resumeService.getAllResume().pipe(map(resume => resume.items[0]?.firstName))
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
