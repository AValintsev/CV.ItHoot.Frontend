import {AfterContentChecked, ChangeDetectorRef, Component, OnInit,} from '@angular/core';
import {Observable} from 'rxjs';
import {AccountService} from 'src/app/services/account.service';
import {LoadingService} from 'src/app/services/loading.service';

@Component({
  selector: 'cv-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent
  implements OnInit, AfterContentChecked
{
  refreshTemplate = true;
  toggle = true;
  public loading$!: Observable<boolean>;
  constructor(
    public accountService: AccountService,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    setTimeout(() => {}, 100);
  }
  sideBarToggler() {
    this.toggle = !this.toggle;
  }

  ngAfterContentChecked() {
    this.loading$ = this.loadingService.isLoading$;
    this.cdr.detectChanges();
  }
}
