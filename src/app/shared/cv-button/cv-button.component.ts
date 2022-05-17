import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cv-button',
  templateUrl: './cv-button.component.html',
  styleUrls: ['./cv-button.component.scss']
})
export class CvButtonComponent implements OnInit {
  @Input() btnText = '';
  constructor() { }

  ngOnInit(): void {
  }
}
