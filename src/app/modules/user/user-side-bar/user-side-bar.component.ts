import {Router} from '@angular/router';
import {map, takeUntil} from 'rxjs/operators';
import {Component, EventEmitter, OnDestroy, OnInit, Output,} from '@angular/core';
import {AccountService} from 'src/app/services/account.service';
import {UserHeaderBtnService} from 'src/app/services/user-header-btn.service';
import {Observable, of, Subject} from 'rxjs';
import {DeleteModalService} from 'src/app/services/delete-modal.service';
import {ResumeService} from 'src/app/services/resume.service';
import * as saveAs from 'file-saver';
import {SnackBarService} from 'src/app/services/snack-bar.service';

@Component({
  selector: 'user-side-bar',
  templateUrl: './user-side-bar.component.html',
  styleUrls: ['./user-side-bar.component.scss'],
})
export class UserSideBarComponent implements OnInit, OnDestroy {
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
    this.userHeaderBtnService.userDataSub$.subscribe(response => {
      if (response) {
        this.id = response.id;
        this.firstName = response.firstName;
        this.lastName = response.lastName;
      }
    });
  }

  btnSwitcher(param: string): Observable<boolean> {
    return this.userHeaderBtnService.getBtn$.pipe(map(response => {
        if (typeof response === 'object') {
          return response.includes(param);
        }
        return false;
      })
    );
  }

  deleteResume(id: number) {
    this.deleteModalService.matModal('Do you want to delete resume?').subscribe(response => {
      if (response) {
        this.resumeService.deleteResume(id).subscribe(() => {
          this.router.navigate(['/home/resume']);
          this.snackbarService.showSuccess('Resume success removed');
        });
      }
      return false;
    });
  }

  savePdf(resumeId: number, firstName: string = '', lastName: string = '') {
    this.resumeService.getResumePdfById(resumeId).subscribe((response) => {
      saveAs(response, `${firstName} ${lastName}.pdf`);
    });
  }

  logout() {
    this.accountService.logout().subscribe(() => {
      this.router.navigate(['/account/login'])
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
    this.resumeService.duplicateResume(resumeId).subscribe(resume => {
      this.router.navigate([`/home/resume/edit/${resume.id}`]);
    })
  }
}
