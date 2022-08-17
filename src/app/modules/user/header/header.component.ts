import {DeleteModalService} from './../../../services/delete-modal.service';
import {MatDialog} from '@angular/material/dialog';
import { map, takeUntil, pluck } from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {ResumeService} from './../../../services/resume.service';
import {Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {UserHeaderBtnService, UserHeaderData,} from 'src/app/services/user-header-btn.service';
import * as saveAs from 'file-saver';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import { UserRole } from 'src/app/models/users-type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'cv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy, OnDestroy {
  private destroy$ = new Subject<boolean>();
  id!: number;
  firstName!: string;
  lastName!: string;
  Users = UserRole;
  userData$: Observable<UserHeaderData | null>;
  userName$: Observable<string> = of('User');
  userName!:Observable<string>;
  userSureName!:Observable<string>;
  constructor(
    private dialog: MatDialog,
    public userHeaderBtnService: UserHeaderBtnService,
    public accountService: AccountService,
    private router: Router,
    private resumeService: ResumeService,
    private snackbarService: SnackBarService,
    private deleteModalService: DeleteModalService,
    private userService: UserService,
    
  ) {}

  ngOnInit(): void {
    this.userNamed();
    this.setUserData();
    this.userName = this.userService.getCurrentUser().pipe(pluck('firstName'))
    this.userSureName = this.userService.getCurrentUser().pipe(pluck('lastName'))
  }

  setUserData() {
    this.userHeaderBtnService.userDataSub$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.id = response.id;
            this.firstName = response.firstName;
            this.lastName = response.lastName;
          }
        },
        error: (error) => console.log(error),
      });
  }

  userNamed() {
    if (this.accountService.getStoreRole() === UserRole.User) {
      this.userName$ = this.resumeService.getAllResume().pipe(
        takeUntil(this.destroy$),
        map((resume) => resume.items[0]?.firstName)
      );
    } else if (!this.resumeService.getAllResume()) {
      this.userName$ = of('User');
    }
  }
  btnSwitcher(param: string): Observable<boolean> {
    return this.userHeaderBtnService.getBtn$.pipe(
      takeUntil(this.destroy$),
      map((response) => {
        if (typeof response === 'object') {
          return response.includes(param);
        }
        return false;
      })
    );
  }

  deleteResume(id: number) {
    this.deleteModalService
      .matModal('Do you want to delete resume?')
      .subscribe({
        next: (response) => {
          if (response) {
            this.resumeService
              .deleteResume(id)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: () => {
                  this.router.navigate(['/home/cv/user-list']);
                  this.snackbarService.showSuccess('Resume success removed');
                },
                error: (error) => console.log(error),
              });
          }
          return false;
        },
        error: (error) => console.log(error),
      });
  }

  savePdf(resumeId: number, firstName: string = '', lastName: string = '') {
    this.resumeService.getResumePdfById(resumeId).subscribe((response) => {
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

  saveDocX(resumeId: number, firstName: string = '', lastName: string = '') {
    this.resumeService.getResumeDocxById(resumeId).subscribe((response) => {
      saveAs(response, `${firstName} ${lastName}.docx`);
    });
  }
  navigateTo(){
    this.router.navigate(['/home/profile'])
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}