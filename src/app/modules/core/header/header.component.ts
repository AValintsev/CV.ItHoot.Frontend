import {CvFullComponent} from '../../cv/cv-full/cv-full.component';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {Component, OnInit} from '@angular/core';
import {Users} from 'src/app/models/users-type';
import {UserEventService} from 'src/app/services/userEvent.service';

@Component({
  selector: 'cv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [CvFullComponent]
})
export class HeaderComponent implements OnInit {
  Users = Users
  usersId$!: BehaviorSubject<string>
  constructor(
    private activatedRoute: ActivatedRoute,
    private userEventService: UserEventService,
    public accountService: AccountService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe().subscribe()
    // setTimeout()
    this.usersId$ = this.userEventService.getUserId()

    // this.userEventService.setUserId().su
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
  navigateTo() {
    if (!+this.usersId$.value) return
    if (this.accountService.getStoreRole() === Users[2]) {
      this.router.navigate(['/home/cv/edit', this.accountService.getUserId()])
    }
    this.router.navigate(['/home/cv/edit', this.usersId$.value])
  }

}
