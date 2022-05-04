import { Component, Input, OnInit } from '@angular/core';
import { CvCard } from 'src/app/shared/models/cv-card';
import {Observable} from "rxjs";
import {AuthService} from "../../../services/auth-service";
import {UserAuthData} from "../../../shared/models/userAuthData";
@Component({
  selector: 'app-cv-small',
  templateUrl: './cv-small.component.html',
  styleUrls: ['./cv-small.component.scss']
})
export class CvSmallComponent implements OnInit {
  @Input() cvCard: CvCard = new CvCard;
  authData$: Observable<UserAuthData>;

  constructor(private authService : AuthService) {
    this.authData$ = this.authService.UserValue2();
  }

  ngOnInit(): void {
  }

  guardEdit(){
    let toggle = false
    this.authService.UserValue().roles.forEach(p => {
      if(p=="Admin" || p == "User"){
        toggle = true
      }
    })
    return toggle
  }

  guardOpen(): boolean{
      return true
  }

  guardDelete(){
    let toggle = false
    this.authService.UserValue().roles.forEach(p => {
      if(p=="Admin" || p == "User" ){
        toggle = true
      }
    })
    return toggle
  }
}
