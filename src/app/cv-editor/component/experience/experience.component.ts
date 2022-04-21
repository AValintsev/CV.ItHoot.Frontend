import { IExperience } from 'src/app/shared/models/cvEditorModels/EditorModels';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CvEditorService } from '../../cv-editor.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  @Input() index!: number
  @Input() experience!: IExperience;
  @Output() upPosition = new EventEmitter<Event>();
  @Output() lowerPosition = new EventEmitter<Event>();

  constructor(private сvEditorService : CvEditorService) { }

  ngOnInit(){

  }


  onUpPosition(){
    debugger;
    this.сvEditorService.experiencePutUpInOrder(this.index);
  }

  onLowerPosition(){
    debugger;
    this.сvEditorService.experienceDownInOrder(this.index);
  }

  onUpDelete(){

  }
}
