import { ILanguageLevel, ICvLanguage } from '../../../../models/cvEditorModels/EditorModels';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';
import { ILanguage } from 'src/app/models/cvEditorModels/EditorModels';
import { CvEditorService } from '../../cv-editor.service';
import { LanguageService } from '../../services/language.service';
import { mergeMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})

export class LanguageComponent implements OnInit {

  @Output() upPosition = new EventEmitter<Event>();
  @Output() lowerPosition = new EventEmitter<Event>();
  @Input() cvLanguage!: ICvLanguage;

  myControl = new FormControl();
  filteredOptions!: Observable<ILanguage[]>;


  language!: ILanguage;
  languageLevel!: ILanguageLevel
  languageLevels!: ILanguageLevel[]

  constructor(private _cvEditorService: CvEditorService,
    private _languageService:LanguageService ){
      this.language = {
        id: undefined,
        name: "",
        level: -1,
        order : -1,
      }
  }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
        startWith(""),
        mergeMap((data)=> this._languageService.getLanguageByContent(data))
    )

    this.myControl.valueChanges.subscribe(data => {
      if(this.cvLanguage.name !== data){
        this.cvLanguage.name = data;
        this.cvLanguage.languageId = undefined;
      }
    })

    this.languageLevels = this._cvEditorService.languageLevels;
    this.inputsInit();
  }

  private inputsInit(){
    if(this.cvLanguage.level != null){
      this.myControl.setValue(this.cvLanguage.name);
      this.languageLevel = this.languageLevels[(this.cvLanguage.level-1)];
    }
  }

  onLanguageSelected($event: MatAutocompleteSelectedEvent){
    this.language =  <ILanguage>$event.option.value;
    this.cvLanguage.languageId = this.language.id,
    this.cvLanguage.name = this.language.name,

    this.myControl.setValue(this.language.name);
  }

  onSelectionLanguageLevelChanged($event : MatSelectChange | any){
    this.cvLanguage.level = this.languageLevel.id;
  }

  onUpPosition(){
    this.upPosition.emit()
  }

  onLowerPosition(){
    this.lowerPosition.emit()
  }

  onDeletePosition(){

  }
}
