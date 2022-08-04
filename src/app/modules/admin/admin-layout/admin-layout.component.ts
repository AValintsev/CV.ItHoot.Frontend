import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterContentInit,
  AfterViewInit,
} from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'cv-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  toggle = true;
  @ViewChild('sideBar') sideBar: ElementRef<any>;
  constructor() {}

  ngOnInit(): void {}
  sideBarToggler(event:Event) {
    event.stopPropagation()
    this.toggle = !this.toggle;
  }
  ngAfterViewInit() {
      // if (this.sideBar) {
      //   fromEvent(document, 'click').subscribe({
      //     next: (value) => {

      //       if (window.innerWidth <= 768) {
      //         let elem = value.target
      //       if (
      //         (value.target as HTMLDivElement).getAttribute('side-bar') !==
      //         this.sideBar.nativeElement.getAttribute('side-bar')
      //       ) {
      //         if (this.toggle) {
      //           this.toggle = !this.toggle;
                
      //           console.log((elem as HTMLElement).getAttribute('menu-item')==='menu-item')

   
      //         if((elem as HTMLElement).getAttribute('menu-item')=='menu-item'){
      //           console.log((elem as HTMLElement).getAttribute('menu-item')==='menu-item')
      //         this.toggle = true;
      //         return;
      //       }
      //         }
      //         return;
      //       }
      //     }
        
      //     },
      //     error: (error) => console.log(error),
      //   });
      // }
  
  }
}
