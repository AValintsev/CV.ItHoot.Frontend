import {AfterViewInit, Component, ElementRef, OnInit, ViewChild,} from '@angular/core';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'cv-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  toggle = window.innerWidth <= 768 ? false : true;
  @ViewChild('sideBar') sideBar: ElementRef<any>;
  constructor() {}

  ngOnInit(): void {}
  sideBarToggler(event: Event) {
   
    event.stopPropagation();
    this.toggle = !this.toggle;
     console.log('aodeBarToggler',this.toggle)
  }

  ngAfterViewInit() {
    this.closeSidebar('click');
  }

  closeSidebar(event: string) {
    if (this.sideBar) {
      fromEvent(window, event).subscribe({
        next: (value) => {
          console.log('111111111111111')
          if (window.innerWidth <= 768) {
            let elem = value.target;
            if (
              (elem as HTMLElement).closest('[not-close-menu]') &&
              !((elem as HTMLElement).nodeName === 'A')
            ) {
              this.toggle = true;
              return;
            } else {
              if (
                (value.target as HTMLDivElement).getAttribute('side-bar') !==
                this.sideBar.nativeElement.getAttribute('side-bar')
              ) {
                if (this.toggle) {
                  this.toggle = !this.toggle;
                }
                return;
              }
            }
          }
        },
        error: (error) => console.log(error),
      });
    }
  }

}
