import { Component } from '@angular/core';
import { AccountService } from './services/account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'cv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ithootcvui';
  constructor(private accountService: AccountService, private router: Router) { }
  ngOnInit(): void {
    // this.router.navigateByUrl('/cv/t');
  }
}
