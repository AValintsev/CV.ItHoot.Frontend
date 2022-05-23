import {AccountService} from 'src/app/services/account.service';
import {Component, Input, OnInit} from '@angular/core';
import {CvCard} from 'src/app/models/cv-card';
import {Observable} from "rxjs";
import {UserAuthData} from "../../../models/userAuthData";
import {Users} from "../../../models/users-type";

@Component({
  selector: 'cv-cv-small',
  templateUrl: './cv-small.component.html',
  styleUrls: ['./cv-small.component.scss']
})
export class CvSmallComponent implements OnInit {
  @Input() cvCard: CvCard = new CvCard;
  authData$!: Observable<UserAuthData>;
  Users = Users
  constructor(private accountService: AccountService) {
    // this.authData$ = this.authService.UserValue2();
  }

  ngOnInit(): void {

  }

  checkRole() {
    return this.accountService.getStoreRole()
  }
}
