import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../shared/styles/auth.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  errors!: string[];

  constructor(private accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.registerForm = new  FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password : new FormControl('', [Validators.required]),
        confirmPassword : new FormControl('', [Validators.required])
      }
    )
  }

  onSubmit(){

    console.log({
      email : this.registerForm.value.email,
      password : this.registerForm.value.password,
    });

    this.accountService.register(
      {
        Email : this.registerForm.value.email,
        Password : this.registerForm.value.password,
      }
    ).subscribe(
      ()=>{
        this.router.navigateByUrl('/cv/list')
      },
      (res) => {
        this.errors = res.error.errors;
      }
    );
  }
}
