import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {CV} from "../../../../shared/models/cv";

@Component({
  selector: 'app-change-personal-data-for-hr',
  templateUrl: './change-personal-data-for-hr.component.html',
  styleUrls: ['./change-personal-data-for-hr.component.scss']
})
export class ChangePersonalDataForHRComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],

    uploadUrl: 'v1/image',
    upload: (file: File) : any => {},
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  constructor() { }
  @Input()Cv!:CV
  @Output() changePersonalData = new EventEmitter()
  ngOnInit(): void {
  }

  changePersonalDat(){
    this.changePersonalData.emit(this.Cv.city)
  }
}
