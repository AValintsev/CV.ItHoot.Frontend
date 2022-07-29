import {Router} from '@angular/router';
import {map, takeUntil} from 'rxjs/operators';
import {Component, EventEmitter, OnDestroy, OnInit, Output,} from '@angular/core';
import {AccountService} from 'src/app/services/account.service';
import {UserHeaderBtnService} from 'src/app/services/user-header-btn.service';
import {Observable, Subject} from 'rxjs';
import {DeleteModalService} from 'src/app/services/delete-modal.service';
import {ResumeService} from 'src/app/services/resume.service';
import * as saveAs from 'file-saver';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {SmallResumeDto} from "../../../models/resume/small-resume-dto";

@Component({
  selector: 'cv-cv-side-bar',
  templateUrl: './cv-side-bar.component.html',
  styleUrls: ['./cv-side-bar.component.scss'],
})
export class CvSideBarComponent implements OnInit, OnDestroy {
  @Output() refreshTemplate = new EventEmitter<null>();
  private destroy$ = new Subject<boolean>();
  id!: number;
  firstName!: string;
  lastName!: string;

  constructor(
    public accountService: AccountService,
    public userHeaderBtnService: UserHeaderBtnService,
    public deleteModalService: DeleteModalService,
    private resumeService: ResumeService,
    private router: Router,
    private snackbarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.setUserData();
  }
  refresh(): void {
    this.refreshTemplate.emit();
  }
  setUserData() {
    this.userHeaderBtnService.userDataSub$
      .pipe(takeUntil(this.destroy$))
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
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  duplicate(resumeId: number) {
    this.resumeService.duplicateResume(resumeId).subscribe(resume=>{
      this.router.navigate([`/home/cv/edit/${resume.id}`]);
    })
  }
}
