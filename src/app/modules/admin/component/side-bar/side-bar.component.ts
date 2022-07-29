import {Subject} from 'rxjs';
import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';

@Component({
  selector: 'cv-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
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
