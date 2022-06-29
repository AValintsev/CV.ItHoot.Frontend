import { takeUntil } from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { interval, Observable, Subject } from 'rxjs';
import {AccountService} from 'src/app/services/account.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
  selector: 'cv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
private destroy$ = new Subject<boolean>();
public loading$!: Observable<boolean>
  errors!: string[];
  loginForm!: FormGroup;

  constructor(public accountService: AccountService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackbarService: SnackBarService,
              private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loading$ = this.loadingService.isLoading$
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)])
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: next => {
          this.router.navigate([''])
        },
        error: error => {
          this.snackbarService.showDanger('Email or password wrong')
        }
      })
    }
  }
    ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
