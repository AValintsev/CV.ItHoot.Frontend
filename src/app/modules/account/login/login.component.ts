import {takeUntil} from 'rxjs/operators';
import { Component, OnDestroy, OnInit, ElementRef, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import {FormControl, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {AccountService} from 'src/app/services/account.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {LoadingService} from 'src/app/services/loading.service';


@Component({
  selector: 'cv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy,AfterContentChecked {
private destroy$ = new Subject<boolean>();
public loading$!: Observable<boolean>
  errors!: string[];
  type="password"
  swithPasswordVisible = true
  loginForm!: UntypedFormGroup;

  constructor(public accountService: AccountService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackbarService: SnackBarService,
              private loadingService: LoadingService,
              private el:ElementRef,
              private cdr:ChangeDetectorRef
  ) {}
  changeVisiblePassword(event:Event){
    event.stopPropagation()
    this.swithPasswordVisible=!this.swithPasswordVisible
    this.type = this.swithPasswordVisible?"password":"text"
  }
  ngOnInit(): void {
    this.loading$ = this.loadingService.isLoading$
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required,Validators.minLength(6)])
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

  ngAfterContentChecked() {
    this.loading$ = this.loadingService.isLoading$;
    this.cdr.detectChanges();
  }

    ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
