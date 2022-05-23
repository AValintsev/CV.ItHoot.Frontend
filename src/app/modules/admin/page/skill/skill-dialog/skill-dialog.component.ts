import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DialogType} from "../../../../../models/dialog-type";
import {SkillTestDto} from "../../../../../models/resume-dto";

@Component({
  selector: 'app-language-dialog',
  templateUrl: './skill-dialog.component.html',
  styleUrls: ['./skill-dialog.component.scss']
})
export class SkillDialogComponent implements OnInit {

  typeDialog: DialogType = DialogType.Create;
  DialogType = DialogType;
  skill:SkillTestDto = {} as SkillTestDto;
  ngOnInit() {}


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.skill = data.data;
    this.typeDialog = data.type;
  }




  canCreate(): boolean {
    const name = this.skill.name;
    return !(name == null || name.trim() === '');

  }

}
