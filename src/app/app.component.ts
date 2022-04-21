import { Component } from '@angular/core';
import { AccountService } from './account/account.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
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
