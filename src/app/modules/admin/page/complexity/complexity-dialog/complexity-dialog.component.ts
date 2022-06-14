import {Component, Inject, OnInit} from '@angular/core';
import {DialogType} from "../../../../../models/enums";
import {ProposalBuildComplexityDto} from "../../../../../models/proposal-build/proposal-build-complexity-dto";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'cv-complexity-dialog',
  templateUrl: './complexity-dialog.component.html',
  styleUrls: ['./complexity-dialog.component.scss']
})
export class ComplexityDialogComponent implements OnInit {

  typeDialog: DialogType = DialogType.Create;
  DialogType = DialogType;
  complexity:ProposalBuildComplexityDto = {} as ProposalBuildComplexityDto;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.complexity = data.data;
    this.typeDialog = data.type;
  }

  ngOnInit(): void {
  }

  canCreate(): boolean {
    const name = this.complexity.complexityName;
    return !(name == null || name.trim() === '');
  }

}
