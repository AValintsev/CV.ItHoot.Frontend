import {Subject} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'cv-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  constructor(private router: Router) {}

  ngOnInit(): void {}
  // settingOpened(): boolean {
  //   return this.router.url === '/home/skills' || this.router.url === '/home/languages';
  // }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
