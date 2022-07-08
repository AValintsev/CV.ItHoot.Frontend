import { Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { UserHeaderBtnService } from 'src/app/services/user-header-btn.service';
import { Observable, Subject } from 'rxjs';
import { DeleteModalService } from 'src/app/services/delete-modal.service';
import { ResumeService } from 'src/app/services/resume.service';
import * as saveAs from 'file-saver';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'cv-cv-cide-bar',
  templateUrl: './cv-cide-bar.component.html',
  styleUrls: ['./cv-cide-bar.component.scss']
})
export class CvCideBarComponent implements OnInit,OnDestroy {
  private destroy$ = new Subject<boolean>();
    id!: number;
  firstName!: string;
  lastName!: string;
  constructor(
    public accountService:AccountService,
    public userHeaderBtnService:UserHeaderBtnService,
    public deleteModalService:DeleteModalService,
    private resumeService:ResumeService,
    private router:Router,
    private snackbarService:SnackBarService,
    
  ) { }

  ngOnInit(): void {
    this.setUserData()
  }
  setUserData() {
    this.userHeaderBtnService.userDataSub$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (response) => {
          console.log(response)
          if (response) {
            this.id = response.id;
            this.firstName = response.firstName;
            this.lastName = response.lastName;
          }
        },
        error: (error) => console.log(error),
      });
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
