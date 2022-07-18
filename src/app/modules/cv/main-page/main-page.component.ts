import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import {LoadingService} from 'src/app/services/loading.service';

@Component({
  selector: 'cv-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit,AfterViewInit {
  refreshTemplate = true
  toggle = true
  public loading$!: Observable<boolean>
  constructor(
    public accountService:AccountService,
    private loadingService: LoadingService,
    private changeDetectorRef: ChangeDetectorRef
    ) {
  }
  ngOnInit(): void {
  }
  sideBarToggler() {
    this.toggle = !this.toggle
  }

  ngAfterViewInit(): void {
    this.loading$ = this.loadingService.isLoading$
    this.changeDetectorRef.detectChanges();
  }

}

