import {Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {Component, OnInit} from '@angular/core';
import { Users } from 'src/app/models/users-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
  //styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
Users = Users
  constructor(
    public accountService:AccountService,
    private router:Router,


  ) { }

  ngOnInit(): void {
    
  }
  logout() {
    this.accountService.logout().subscribe({
      next: () => this.router.navigate(['/account/login'])
    })
  }
  getAllCv(){
   this.router.navigate(['/home/cv/'])
  }
  nextCv(){

  }
}
