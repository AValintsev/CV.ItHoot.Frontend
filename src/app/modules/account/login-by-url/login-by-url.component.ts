import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'cv-login-by-url',
  templateUrl: './login-by-url.component.html',
  styleUrls: ['./login-by-url.component.scss']
})
export class LoginByUrlComponent implements OnInit,OnDestroy {

  constructor(public accountService: AccountService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      const shortUrl = params['shortUrl'];
      if (shortUrl) {
        accountService.loginByUrl(shortUrl).subscribe(() =>
          this.router.navigate(['']));
      }
    });
  }

  ngOnInit(): void {
  }
  ngOnDestroy() { }
}
