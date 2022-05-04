import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../shared/styles/header.scss']
  //styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private accountService:AccountService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  logout() {
    this.accountService.logout().subscribe({
      next: () => this.router.navigate(['/account/login'])
    })
  }
}
