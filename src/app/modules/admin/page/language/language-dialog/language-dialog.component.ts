import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogType} from '../../../../../models/enums';
import {LanguageDto} from '../../../../../models/language/language-dto';

@Component({
  selector: 'app-language-dialog',
  templateUrl: './language-dialog.component.html',
  styleUrls: ['./language-dialog.component.scss'],
})
export class LanguageDialogComponent implements OnInit {
  typeDialog: DialogType = DialogType.Create;
  DialogType = DialogType;
  language: LanguageDto = {} as LanguageDto;

  ngOnInit() {}

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.language = data.data;
    this.typeDialog = data.type;
  }

  canCreate(): boolean {
    const name = this.language.name;
    return !(name == null || name.trim() === '');
  }

}
