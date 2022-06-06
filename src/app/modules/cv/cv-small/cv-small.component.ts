import { SmallResumeDto } from '../../../models/resume/small-resume-dto';
import { AccountService } from 'src/app/services/account.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs";
import { UserAuthData } from "../../../models/userAuthData";
import { Users } from "../../../models/users-type";
import { ResumeService } from 'src/app/services/resume.service';


@Component({
  selector: 'cv-cv-small',
  templateUrl: './cv-small.component.html',
  styleUrls: ['./cv-small.component.scss']
})
export class CvSmallComponent implements OnInit {
  @Input() resume!: SmallResumeDto;
  authData$!: Observable<UserAuthData>;
  Users = Users
  constructor(
    private accountService: AccountService,
    private resumeService: ResumeService
    ) {
    // this.authData$ = this.authService.UserValue2();
  }
  @Output()refresh = new EventEmitter()
  ngOnInit(): void {

  }

  checkRole() {
    return this.accountService.getStoreRole()
  }
  deleteResume(id:number){
    this.resumeService.deleteResume(id).subscribe({
      next:response=>this.refresh.emit(),
      error:error=>console.log(error),
    })
  }
}
