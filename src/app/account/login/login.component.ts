import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import {AuthService} from "../../../authServeces/auth-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../shared/styles/auth.scss']
})
export class LoginComponent implements OnInit {

  errors!: string[];
  loginForm!: FormGroup;

  constructor(private accountService: AccountService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService
              )
  {

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('itdxr5@gmail.com',[Validators.required, Validators.email]),
      password : new FormControl('f99910124F',[Validators.required])
    })
  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe(
      (res)=>{
        this.router.navigateByUrl('/cv/list')
      },
      (error => {
        console.log('eror',error)
      })
    )
  }
}
