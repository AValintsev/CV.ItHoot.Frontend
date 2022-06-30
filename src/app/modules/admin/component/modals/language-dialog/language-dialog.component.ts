import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap,} from 'rxjs/operators';
import {ResumeLanguageDto} from 'src/app/models/resume/resume-language-dto';
import {DialogType} from 'src/app/models/enums';
import {LanguageDto} from 'src/app/models/language/language-dto';
import {LanguageService} from 'src/app/services/language.service';

@Component({
  selector: 'cv-language-dialog',
  templateUrl: './language-dialog.component.html',
  styleUrls: ['./language-dialog.component.scss'],
})
export class LanguageDialog implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  language: ResumeLanguageDto = {} as ResumeLanguageDto;
  typeDialog: DialogType;
  DialogType = DialogType;
  myControl = new FormControl();
  filteredOptions: Observable<LanguageDto[]>;

  ngOnInit() {}

  constructor(
    private languageService: LanguageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.language = data.data;
    this.typeDialog = data.type;
    this.myControl.setValue(this.language.languageName);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => {
        return this.filter(val || '');
      })
    );
  }
  filter(val: string): Observable<LanguageDto[]> {
    return this.languageService.searchLanguage(val).pipe(
      map((data) => {
        if (!data.length) {
          return [{ id: 0, name: val }];
        }
        return data;
      })
    );
  }

  skillSelected(option: any) {
    this.language.languageName = option.name;
    this.language.languageId = option.id;
  }

  canCreate(): boolean {
    return !(
      this.language.languageName === '' ||
      this.language.languageName === undefined ||
      this.language.level === undefined
    );
  }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
