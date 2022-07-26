import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cv-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
 @Input() toggle = true
  constructor() {}

  ngOnInit(): void {}

}
