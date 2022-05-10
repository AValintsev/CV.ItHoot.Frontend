import {AccountService} from 'src/app/services/account.service';
import {Component, Input, OnInit} from '@angular/core';
import {CvCard} from 'src/app/models/cv-card';
import {Observable} from "rxjs";
import {UserAuthData} from "../../../models/userAuthData";

@Component({
  selector: 'app-cv-small',
  templateUrl: './cv-small.component.html',
  styleUrls: ['./cv-small.component.scss']
})
export class CvSmallComponent implements OnInit {
  @Input() cvCard: CvCard = new CvCard;
  authData$!: Observable<UserAuthData>;

  constructor(private accountService : AccountService) {
    // this.authData$ = this.authService.UserValue2();
  }

  ngOnInit(): void {
  }

  checkRole(){
    return this.accountService.getStoreRole()
  }
  // guardEdit(){
  //   let toggle = false
  //   this.accountService.getUserRole().subscribe({
  //     next: next => {
  //       if (next == "Admin" || next == "User" || next == "Client"){
  //       toggle = true
  //     }
  //   },
  //    error:error=>console.log(error)
  //   })
  //   return toggle
  // }

  // guardOpen(): boolean{
  //     return true
  // }

  // guardDelete() {
  //   let toggle = false
  //   this.accountService.getUserRole().subscribe({
  //     next: next => {
  //       if (next == "Admin" || next == "User" || next == "Client") {
  //         toggle = true
  //       }
  //     },
  //     error: error => console.log(error)
  //   })
  //   return toggle
  // }
}
