import { DialogType } from './../../../../../models/dialog-type';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from "rxjs/operators";
import { LanguageTestDto, UserLanguageDto } from 'src/app/models/resume-dto';
import { LanguageService } from 'src/app/services/language.service';


@Component({
  selector: 'cv-language-dialog',
  templateUrl: './language-dialog.component.html',
  styleUrls: ['./language-dialog.component.scss']
})
export class LanguageDialogComponent implements OnInit {

  language: UserLanguageDto = {} as UserLanguageDto;
  typeDialog: DialogType;
  DialogType = DialogType;
  myControl = new FormControl();
  filteredOptions: Observable<LanguageTestDto[]>;

  ngOnInit() { }


  constructor(
    private languageService: LanguageService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.language = data.data;
    console.log(this.language)
    this.typeDialog = data.type;
    this.myControl.setValue(this.language.languageName)
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '')
      })
    )
  }
  filter(val: string): Observable<LanguageTestDto[]> {
    return this.languageService.searchLanguage(val).pipe(map(data => {
      return data;
    }));
  }


  skillSelected(option: any) {
    this.language.languageName = option.name;
    this.language.languageId = option.id;
  }

  canCreate(): boolean {
    return !(this.language.languageName === '' || this.language.languageName === undefined || this.language.level === undefined);

  }
}
