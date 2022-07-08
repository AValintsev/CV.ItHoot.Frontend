import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LoadingService} from 'src/app/services/loading.service';

@Component({
  selector: 'cv-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public loading$!: Observable<boolean>
  constructor(
    private loadingService: LoadingService
    ) { }
  ngOnInit(): void {
    this.loading$ = this.loadingService.isLoading$
  }

}
