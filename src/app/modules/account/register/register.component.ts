import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {LoadingService} from 'src/app/services/loading.service';

@Component({
  selector: 'cv-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public loading$!: Observable<boolean>
  private destroy$ = new Subject<boolean>();
  registerForm!: UntypedFormGroup;
  errors!: string[];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackBarService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loading$ = this.loadingService.isLoading$
    this.registerForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.accountService
        .register(this.registerForm.value)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (next) => {
            this.router.navigate(['']);
          },
          error: (error) => {
            this.snackbarService.showDanger('User exists, log in please');
          },
        });
    }
  }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}


