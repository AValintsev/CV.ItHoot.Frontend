import {Subject} from 'rxjs';
import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';

@Component({
  selector: 'admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.scss'],
})
export class AdminSideBarComponent implements OnInit {
  private destroy$ = new Subject<boolean>();
 @Input() toggle = true
  constructor(private router: Router,public accountService:AccountService) {}

  ngOnInit(): void {}

  logout() {
    this.accountService.logout().subscribe({
      next: () => this.router.navigate(['/account/login']),
    });
  }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}