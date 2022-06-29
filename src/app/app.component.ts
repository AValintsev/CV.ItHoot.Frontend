import {Component} from '@angular/core';
import {AccountService} from './services/account.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from './services/loading.service';


@Component({
  selector: 'cv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private accountService: AccountService, 
    ) { }
  ngOnInit(): void {
  }
}
