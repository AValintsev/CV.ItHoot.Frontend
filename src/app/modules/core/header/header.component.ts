import { DeleteModalService } from './../../../services/delete-modal.service';
import { MatDialog } from '@angular/material/dialog';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { ResumeService } from './../../../services/resume.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users-type';
import {
  UserHeaderBtnService,
  UserHeaderData,
} from 'src/app/services/user-header-btn.service';
import { ModalDeleteComponent } from '../../shared/modals/modal-delete-user/modal-delete-user.component';
import * as saveAs from 'file-saver';
import { SnackBarService } from 'src/app/services/snack-bar.service';

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
  Users = Users;
  userData$: Observable<UserHeaderData | null>;
  userName$: Observable<string> = of('User');
  constructor(
    private dialog: MatDialog,
    public userHeaderBtnService: UserHeaderBtnService,
    public accountService: AccountService,
    private router: Router,
    private resumeService: ResumeService,
    private snackbarService: SnackBarService,
    private deleteModalService: DeleteModalService
  ) {}

  ngOnInit(): void {
    this.userNamed();
    this.setUserData();
  }

  setUserData() {
    this.userHeaderBtnService.userDataSub$
      .pipe(
        takeUntil(this.destroy$),
        tap((e) => console.log('11111111111111'))
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
    if (this.accountService.getStoreRole() === Users[2]) {
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
    console.log(resumeId, firstName, lastName);
    this.resumeService.getPdf(resumeId).subscribe((response) => {
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

  saveDocX() {
    this.snackbarService.showDanger('The service is currently not working');
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
