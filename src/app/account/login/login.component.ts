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

  constructor(public accountService: AccountService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              )
  {

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('user@example.com',[Validators.required, Validators.email]),
      password : new FormControl('12345678',[Validators.required])
    })
  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    if (this.loginForm.value){
      this.accountService.login(this.loginForm.value).subscribe(
      (res)=>{
          if (this.accountService.getUserId().value >= 0 && this.accountService.getUserRole().value === 'User'){
          this.router.navigate([`/home/cv/${this.accountService.getUserId().value}`])

        }
          
      },
      (error => {
        console.log('eror',error)
      })
    )
  } 
    }
}
