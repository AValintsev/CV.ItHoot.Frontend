import { takeUntil } from 'rxjs/operators';
import { SmallResumeDto } from '../../../models/resume/small-resume-dto';
import { AccountService } from 'src/app/services/account.service';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserAuthData } from '../../../models/userAuthData';
import { Users } from '../../../models/users-type';
import { ResumeService } from 'src/app/services/resume.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDeleteUserComponent } from '../../shared/modals/modal-delete-user/modal-delete-user.component';

@Component({
  selector: 'cv-cv-small',
  templateUrl: './cv-small.component.html',
  styleUrls: ['./cv-small.component.scss'],
})
export class CvSmallComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  @Input() resume!: SmallResumeDto;
  authData$!: Observable<UserAuthData>;
  Users = Users;
  constructor(
    private accountService: AccountService,
    private resumeService: ResumeService,
    private dialog: MatDialog
  ) {
    // this.authData$ = this.authService.UserValue2();
  }
  @Output() refresh = new EventEmitter();
  ngOnInit(): void {}

  checkRole() {
    return this.accountService.getStoreRole();
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
              this.refresh.emit();
            },
            error: (error) => console.log(error),
          });
        }
        return false;
      },
      error: (error) => {},
    });
  }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
