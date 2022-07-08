import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  registerForm!: FormGroup;
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
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
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


