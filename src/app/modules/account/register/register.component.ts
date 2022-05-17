import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'cv-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../shared/styles/auth.scss']
})
export class RegisterComponent implements OnInit {

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
        email: new FormControl('user@example.com', [Validators.required, Validators.email]),
        password: new FormControl('12345678', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required])
      }
    )
  }

  onSubmit() {

    console.log({
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    });

    this.accountService.register(
      {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      }
    ).subscribe({
      next: next => {
        // if (this.accountService.getUserRole().value === 'User') {
        // this.router.navigate([`/home/cv/${this.accountService.getUserId()}`])
        // } else {
        this.router.navigate([`/home/cv/`])
        // }

      },
      error: error => {
        this.snackbarService.showDanger('User exists, log in please')
      }
    });
  }
}
