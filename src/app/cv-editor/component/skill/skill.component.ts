import { mergeMap, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ICvSkill, ISkillLevel } from './../../../shared/models/cvEditorModels/EditorModels';
import { ISkill } from 'src/app/shared/models/cvEditorModels/EditorModels';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CvEditorService } from '../../cv-editor.service';
import { FormControl } from '@angular/forms';
import { SkillService } from "../../services/skill.service";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  @Output() upPosition = new EventEmitter<Event>();
  @Output() lowerPosition = new EventEmitter<Event>();

  @Input() cvSkill!: ICvSkill;
  myControl = new FormControl();

  filteredOptions$!: Observable<ISkill[]>;
  selectedSkill!: ISkill

  skillLevels!: ISkillLevel[];
  selectedSkillLevel!: ISkillLevel;

  constructor(private _cvEditorService: CvEditorService,
  private _skillService: SkillService)
  {
    this.selectedSkill = {
      id: undefined,
      name: "",
      level: -1,
      order : -1,
    }
  }

  ngOnInit(): void {

    this.skillLevels = this._cvEditorService.getAllSkillLevels;
    this.filteredOptions$ = this.myControl.valueChanges
    .pipe(
      startWith(""),
      mergeMap((data) => this._skillService.getSkillByContent(data))
    )

    this.myControl.valueChanges.subscribe(data => {
      if( this.cvSkill.name !== data){
        this.cvSkill.name = data;
        this.cvSkill.skillId = undefined;
      }
    })
    this.inputsInit();
  }

  private inputsInit(){
    if(this.cvSkill.level != null){
      this.myControl.setValue(this.cvSkill.name);
    }

    var carnetSkillLevel = this.skillLevels.find(level => level.id == this.cvSkill.skillId);
    if(carnetSkillLevel != undefined){
      this.selectedSkillLevel = carnetSkillLevel;
    }
  }

  onSkillSelected($event: MatAutocompleteSelectedEvent ){
    this.selectedSkill = <ISkill>$event.option.value;
    this.cvSkill.skillId = this.selectedSkillLevel.id;
    this.cvSkill.name = this.selectedSkillLevel.name;

    this.myControl.setValue(this.selectedSkill.name);
  }

  onSelectionSkillLevelChanged($event : MatSelectChange){
    this.cvSkill.level = this.selectedSkillLevel.id;
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
