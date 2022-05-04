import { ILanguageLevel, ISkillLevel } from '../../models/cvEditorModels/EditorModels';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICv } from '../../models/cvEditorModels/EditorModels';
import { CvEditorService } from './cv-editor.service';
import {SkillService} from "./services/skill.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
    styleUrls: ['../../shared/styles/cvcreate.scss']
  // styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  cv$!: Observable<ICv>

  skillLevels$?: Observable<ISkillLevel[]>
  languageLevels$?: Observable<ILanguageLevel[]>

  constructor(
    private _cvEditorService: CvEditorService,
    private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // const id = this._route.snapshot.params['id'];

    // if(!id){
    //   this._cvEditorService.CreateNew();
    // }

    // this._cvEditorService.getAllLanguageLevel()
    //   .subscribe(e => console.log(e));

    this._cvEditorService
      .getCvById()
      .subscribe();

    this._cvEditorService.createNew();
    this.cv$ = this._cvEditorService.cv$;


    this._cvEditorService.getAllLanguageLevel().subscribe();
    this._cvEditorService.getAllSkillLevel().subscribe();
    this.skillLevels$ = this._cvEditorService.allSkillLevel$;
    this.languageLevels$ = this._cvEditorService.allLanguageLevel$;
  }


  //#region education
  addNewEducation(){

    this._cvEditorService.addNewEducation();
  }

  upEducationPositionInOrder(){

  }

  lowerEducationPositionInOrder(){

  }
  //#endregion


  //#region Experience
  addNewExperience(){
    this._cvEditorService.addNewExperience();
  }

  upExperiencePositionInOrder(){

  }

  lowerExperiencePositionInOrder(){

  }
  //#endregion


 //#region Language
  addNewLanguage(){
    this._cvEditorService.addNewLanguage();
  }

  languagePutUpInOrder(index: number){
    this._cvEditorService.languagePutUpInOrder(index)
  }

  languageLowerDownInOrder(index : number){
    this._cvEditorService.languageDownInOrder(index)
  }
 //#endregion


 //#region skill
  addNewSkill(){
    this._cvEditorService.addNewSkill();
  }

  removeSkill(index: number){
    this._cvEditorService.removeSkill(index);
  }

  skillPutUpInOrder(index: number){
    this._cvEditorService.skillPutUpInOrder(index)
  }

  skillDownInOrder(index : number){
    this._cvEditorService.skillDownInOrder(index)
  }

  click1(){
    console.log(this._cvEditorService.getCurrentCv)
  }
 //#endregion
}
