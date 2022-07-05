import { MatDialog } from '@angular/material/dialog';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { ResumeService } from './../../../services/resume.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  AfterContentInit,
} from '@angular/core';
import { Users } from 'src/app/models/users-type';
import { UserHeaderBtnService, UserHeaderData } from 'src/app/services/user-header-btn.service';
import { ModalDeleteUserComponent } from '../../shared/modals/modal-delete-user/modal-delete-user.component';
import * as saveAs from 'file-saver';

@Component({
  selector: 'cv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy, OnDestroy {
  private destroy$ = new Subject<boolean>();
  Users = Users;
  userData$:Observable<UserHeaderData|null>
  userName$: Observable<string> = of('User');
  constructor(
    private dialog:MatDialog,
    public userHeaderBtnService: UserHeaderBtnService,
    public accountService: AccountService,
    private router: Router,
    private resumeService: ResumeService
  ) {}

  ngOnInit(): void {
    this.userNamed();
    this.userData$ = this.userHeaderBtnService.userData$.pipe()
  }

  userNamed() {
    if (this.accountService.getStoreRole() === Users[2]) {
      this.userName$ = this.resumeService
        .getAllResume()
        .pipe(map((resume) => resume.items[0]?.firstName));
    } else if (!this.resumeService.getAllResume()) {
      this.userName$ = of('User');
    }
  }
  btnSwitcher(param: string):Observable<boolean> {
   return this.userHeaderBtnService.getBtn$.pipe(
      map(response=>{
        if(typeof response === 'object'){
          return response.includes(param)
        }
        return false
        })
      );
  }

  deleteResume(id: number) {
    let dialog = this.dialog.open(ModalDeleteUserComponent, {
      panelClass: 'delete-modal',
    });
    dialog.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response) {
          this.resumeService.deleteResume(id).pipe(
            takeUntil(this.destroy$)
          ).subscribe({
            next: (response) => {
              // this.refresh.emit();
            },
            error: (error) => console.log(error),
          });
        }
        return false;
      },
      error: (error) => {},
    });
  }

  savePdf(resumeId: number, firstName: string='', lastName: string='') {
    this.resumeService.getPdf(resumeId).subscribe(response => {
      saveAs(response, `${firstName} ${lastName}.pdf`);
    });
  }

  logout() {
    this.accountService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.router.navigate(['/account/login']),
      });
  }
  getAllCv() {
    this.router.navigate(['/home/cv/']);
  }
  nextCv() {}
  ngOnDestroy() {}
}
