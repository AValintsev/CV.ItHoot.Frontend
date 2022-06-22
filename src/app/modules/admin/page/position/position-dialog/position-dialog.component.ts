import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DialogType} from "../../../../../models/enums";
import {PositionDto} from "../../../../../models/position/position-dto";

@Component({
  selector: 'cv-position-dialog',
  templateUrl: './position-dialog.component.html',
  styleUrls: ['./position-dialog.component.scss']
})
export class PositionDialogComponent implements OnInit,OnDestroy {


  typeDialog: DialogType = DialogType.Create;
  DialogType = DialogType;
  positionDto:PositionDto = {} as PositionDto;
  ngOnInit() {}


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.positionDto = data.data;
    this.typeDialog = data.type;
  }




  canCreate(): boolean {
    const name = this.positionDto.positionName;
    return !(name == null || name.trim() === '');

  }
  ngOnDestroy() { }
}
