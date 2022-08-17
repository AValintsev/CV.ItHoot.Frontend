import {Router} from '@angular/router';
import { map, pluck } from 'rxjs/operators';
import {Component, EventEmitter, OnDestroy, OnInit, Output,} from '@angular/core';
import {AccountService} from 'src/app/services/account.service';
import {UserHeaderBtnService} from 'src/app/services/user-header-btn.service';
import {Observable, Subject} from 'rxjs';
import {DeleteModalService} from 'src/app/services/delete-modal.service';
import {ResumeService} from 'src/app/services/resume.service';
import * as saveAs from 'file-saver';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';

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
  userName!:Observable<string>;
  userSureName!:Observable<string>;

  constructor(
    public accountService: AccountService,
    public userHeaderBtnService: UserHeaderBtnService,
    public deleteModalService: DeleteModalService,
    private resumeService: ResumeService,
    private router: Router,
    private snackbarService: SnackBarService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.setUserResumeData();
    this.userName = this.userService.getCurrentUser().pipe(pluck('firstName'))
    this.userSureName = this.userService.getCurrentUser().pipe(pluck('lastName'))
  }

  refresh(): void {
    this.refreshTemplate.emit();
  }



  setUserResumeData() {
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
