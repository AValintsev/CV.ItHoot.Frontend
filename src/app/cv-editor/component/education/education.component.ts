import { Component, OnInit, Input,  Output, EventEmitter} from '@angular/core';
import { IEducation } from 'src/app/shared/models/cvEditorModels/EditorModels';
import { CvEditorService } from '../../cv-editor.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @Input() index!: number;
  @Input() education!: IEducation;
  @Output() upPosition = new EventEmitter<Event>();
  @Output() lowerPosition = new EventEmitter<Event>();


  constructor(private сvEditorService : CvEditorService) {

  }

  ngOnInit(): void {
    console.log(this.index, this.education)
  }

  onUpPosition(){
    this.сvEditorService.educationPutUpInOrder(this.index)
  }

  onLowerPosition(){
    this.сvEditorService.educationDownInOrder(this.index)
  }

  onDeleteItem(){

  }
}
