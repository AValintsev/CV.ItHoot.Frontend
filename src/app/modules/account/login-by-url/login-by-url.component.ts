import {Subject} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientProposalService} from "../../../services/client/client-proposal.service";

@Component({
  selector: 'cv-login-by-url',
  templateUrl: './login-by-url.component.html',
  styleUrls: ['./login-by-url.component.scss']
})
export class LoginByUrlComponent implements OnInit,OnDestroy {
private destroy$ = new Subject<boolean>();

  constructor(public accountService: AccountService,
              private router: Router,
              private clientService: ClientProposalService,
              private activatedRoute: ActivatedRoute) {

    activatedRoute.params.subscribe(params => {
      const shortUrl = params['shortUrl'];
      const teamId = params['teamId'];

      if (shortUrl) {
        accountService.loginByUrl(shortUrl).subscribe((response) => {
          accountService.doLoginUser(response)
          const navigate = this.router.navigate(['client/proposals']);
          if (teamId) {
            navigate.finally(()=> {
              sessionStorage.setItem('teamId', teamId);
            })
          }
        })
      }
    });
  }

  ngOnInit(): void {
  }
  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
