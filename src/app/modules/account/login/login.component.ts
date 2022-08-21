import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit
} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {fromEvent, Observable, Subject} from 'rxjs';
import {AccountService} from 'src/app/services/account.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {LoadingService} from 'src/app/services/loading.service';
import {CredentialResponse} from "google-one-tap";
import {environment} from "../../../../environments/environment";
import {UserValidators} from '../../shared/validators/user.validators';

@Component({
  selector: 'cv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterContentChecked, AfterViewInit {

  private destroy$ = new Subject<boolean>();
  public loading$!: Observable<boolean>
  errors!: string[];
  screenSize:number = window.innerWidth;
  type = "password"
  swithPasswordVisible = true
  loginForm!: UntypedFormGroup;

  constructor(public accountService: AccountService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackbarService: SnackBarService,
              private loadingService: LoadingService,
              private _ngZone: NgZone,
              private el: ElementRef,
              private cdr: ChangeDetectorRef,
  ) {}

  changeVisiblePassword(event: Event) {
    event.stopPropagation()
    this.swithPasswordVisible = !this.swithPasswordVisible
    this.type = this.swithPasswordVisible ? "password" : "text"
  }


  ngAfterViewInit() {

  }

  ngOnInit(): void {
    this.loading$ = this.loadingService.isLoading$
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(6),UserValidators.checkingNumberInPassword(/\d/)])
    })

    this.loadGoogleAuthScript();
    this.addGoogleAuthButton();
  fromEvent(window,'resize').subscribe(
    ()=>{
      if(this.screenSize!=window.innerWidth){
        this.loadGoogleAuthScript();
        this.addGoogleAuthButton();
      }
    }
  )
  }

  loadGoogleAuthScript() {
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.defer = true;
    s.async = true;
    this.el.nativeElement.appendChild(s);
  }

  addGoogleAuthButton() {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {

      // @ts-ignore
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: this.handleCredentialResponse.bind(this)
      });
      // @ts-ignore

      google.accounts.id.renderButton(document.getElementById("buttonDiv"),
        {
          theme: "outline",
          size: "medium",
          text: "continue_with",
          shape: "rectangular",
          width: window.innerWidth>600?370:250
        }  // customization attributes
      );
      // @ts-ignore
      google.accounts.id.prompt(); // also display the One Tap dialog
    };
  }

  handleCredentialResponse(response: CredentialResponse) {

    this.accountService.loginViaGoogle(response.credential).subscribe(
      () => this._ngZone.run(() => this.router.navigate(['']))
    );

  }



  onSubmit() {
    if (this.loginForm.valid) {

      this.accountService.login(this.loginForm.value).subscribe(
        () => this.router.navigate(['']),
        () => this.snackbarService.showDanger('Email or password wrong')
      );

    }
  }

  ngAfterContentChecked() {
    this.loading$ = this.loadingService.isLoading$;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }


}
