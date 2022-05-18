import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOrder } from 'src/app/models/cvEditorModels/EditorModels';

@Component({
  selector: 'cv-wrapper-cv-section',
  templateUrl: './wrapper-cv-section.component.html',
  styleUrls: ['../../../../shared/styles/cvcreate.scss']
})
export class WrapperCvSectionComponent implements OnInit {

  @Input() title: string = '';
  @Input() singleObject: boolean = false;
  @Output() onAddClick = new EventEmitter<Event>();
  @Input() arr?: Array<IOrder>


  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick($event: Event) {
    this.onAddClick.emit($event)
  }

  movePosition(index: number, value: string) {

  }
}
