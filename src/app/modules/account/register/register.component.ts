import {takeUntil} from 'rxjs/operators';
import {fromEvent, Observable, Subject} from 'rxjs';
import {ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {LoadingService} from 'src/app/services/loading.service';
import {environment} from "../../../../environments/environment";
import {CredentialResponse} from "google-one-tap";
import { UserValidators } from '../../shared/validators/user.validators';

@Component({
  selector: 'cv-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public loading$!: Observable<boolean>
  private destroy$ = new Subject<boolean>();
  type = "password"
  swithPasswordVisible = true;
  screenSize:number = window.innerWidth;
  registerForm!: UntypedFormGroup;
  errors!: string[];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackBarService,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
    private _ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loading$ = this.loadingService.isLoading$
    this.registerForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(6),UserValidators.checkingNumberInPassword(/\d/)]),
    });
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
            this.snackbarService.showDanger('This email is already taken');
          },
        });
    }
  }

  changeVisiblePassword(event: Event) {
    event.stopPropagation()
    this.swithPasswordVisible = !this.swithPasswordVisible
    this.type = this.swithPasswordVisible ? "password" : "text"
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


