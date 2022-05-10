import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserLanguageDto, UserLanguageTestDto} from "../../../models/resume-dto";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from "rxjs/operators";
import {DialogType} from "../../../models/dialog-type";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-language-dialog',
  templateUrl: './language-dialog.component.html',
  styleUrls: ['./language-dialog.component.scss']
})
export class LanguageDialog implements OnInit {

  language: UserLanguageDto = {} as UserLanguageDto;
  typeDialog: DialogType;
  DialogType = DialogType;
  myControl = new FormControl();
  filteredOptions: Observable<UserLanguageTestDto[]>;

  ngOnInit() {}


  constructor(
    private languageService: LanguageService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.language = data.data;
    console.log(this.language)
    this.typeDialog = data.type;
    this.myControl.setValue(this.language.name)
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '')
      })
    )
  }
  filter(val: string): Observable<UserLanguageTestDto[]> {
    return this.languageService.searchLanguage(val).pipe(map(data=>{
      if(data.length === 0){
        data = [{id:0,name:val}]
      };
      return data;
    }));
  }


  skillSelected(option:any) {
    this.language.name = option.name;
    this.language.id = option.id;
  }

  canCreate(): boolean {
    if (this.language.name === '' || this.language.name === undefined || this.language.level === undefined)
      return false;
    return true;
  }
}
