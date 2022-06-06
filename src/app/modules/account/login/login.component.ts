import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';

@Component({
  selector: 'cv-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../shared/styles/auth.scss']
})
export class LoginComponent implements OnInit {

  errors!: string[];
  loginForm!: FormGroup;

  constructor(public accountService: AccountService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private snackbarService: SnackBarService,
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('user@example.com', [Validators.required, Validators.email]),
      password: new FormControl('12345678', [Validators.required])
    })
  }

  onSubmit() {
    if (this.loginForm.value) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: next => {
          this.router.navigate([''])
        },
        error: error => {
          this.snackbarService.showDanger('Email or password wrong')
        }
      })
    }
  }
}
