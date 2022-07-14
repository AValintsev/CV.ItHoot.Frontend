import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LoadingService} from 'src/app/services/loading.service';

@Component({
  selector: 'cv-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, AfterContentChecked {

  loading$!: Observable<boolean>


  constructor(
    private loadingService: LoadingService,
    private cdref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {

    this.loading$ = this.loadingService.isLoading$
    this.cdref.detectChanges();
  }


}
