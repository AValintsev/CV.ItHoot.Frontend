import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DialogType } from '../../../../../models/enums';
import { PositionDto } from '../../../../../models/position/position-dto';
import { PositionService } from '../../../../../services/position.service';
import { ProposalBuildPositionDto } from '../../../../../models/proposal-build/proposal-build-position-dto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'proposal-build-position-dialog',
  templateUrl: './proposal-build-position-dialog.component.html',
  styleUrls: ['./proposal-build-position-dialog.component.scss'],
})
export class ProposalBuildPositionDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  DialogType = DialogType;
  dialogType: DialogType = DialogType.Create;
  positions!: PositionDto[];
  position!: ProposalBuildPositionDto;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    positionService: PositionService
  ) {
    this.position = data.data;
    this.dialogType = data.type;
    if (this.dialogType == DialogType.Create) {
      this.position.countMembers = 1;
    }
    positionService
      .getAllPositions().pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((positions) => (this.positions = positions));
  }

  ngOnInit(): void {}

  canCreate(): boolean {
    return (
      this.position &&
      this.position?.countMembers > 0 &&
      this.position?.positionId > 0
    );
  }

  positionChange() {
    const name = this.positions.filter(
      (x) => x.positionId == this.position.positionId
    )[0].positionName;
    this.position.positionName = name;
  }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
