import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { UserAuthData } from 'src/app/models/userAuthData';
import { Validators } from '@angular/forms';
import {AuthService} from "../../../services/auth-service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-bar',
  templateUrl: './auth-bar.component.html',
  styleUrls: ['../../../shared/styles/auth-bar.scss']
})
export class AuthBarComponent implements OnInit {
  userData!: UserAuthData

  currentUser$!: Observable<UserAuthData>;

  constructor(private accountService: AccountService,
    private router:Router
              // private authService: AuthService
  ) {
    // this.userData = this.authService.UserValue()
    // this.currentUser$ = this.authService.UserValue2()

  }
  ngOnInit(): void {

  }
  logout() {
    this.accountService.logout().subscribe({
      next: () => this.router.navigate(['/account/login'])
    })
  }
}
