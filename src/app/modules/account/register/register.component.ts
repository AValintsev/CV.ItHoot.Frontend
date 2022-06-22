import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';

@Component({
  selector: 'cv-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit,OnDestroy {

  registerForm!: FormGroup;
  errors!: string[];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required])
      }
    )
  }

  onSubmit() {
    if (this.registerForm.valid) {
    this.accountService.register(
      {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      }
    ).subscribe({
      next: next => {
        this.router.navigate([''])
      },
      error: error => {
        this.snackbarService.showDanger('User exists, log in please')
      }
    });
  }
}
ngOnDestroy() { }
}


// user @example.co