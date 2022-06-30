import {Subject} from 'rxjs';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogType} from '../../../../../models/enums';
import {SkillDto} from '../../../../../models/skill/skill-dto';

@Component({
  selector: 'app-language-dialog',
  templateUrl: './skill-dialog.component.html',
  styleUrls: ['./skill-dialog.component.scss'],
})
export class SkillDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  typeDialog: DialogType = DialogType.Create;
  DialogType = DialogType;
  skill: SkillDto = {} as SkillDto;
  ngOnInit() {}

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.skill = data.data;
    this.typeDialog = data.type;
  }

  canCreate(): boolean {
    const name = this.skill.name;
    return !(name == null || name.trim() === '');
  }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
