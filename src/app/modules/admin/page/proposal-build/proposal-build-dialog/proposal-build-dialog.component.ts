import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProposalBuildDto } from '../../../../../models/proposal-build/proposal-build-dto';
import { DialogType } from '../../../../../models/enums';
import { ComplexityService } from '../../../../../services/complexity.service';
import { ProposalBuildComplexityDto } from '../../../../../models/proposal-build/proposal-build-complexity-dto';
import { PositionService } from '../../../../../services/position.service';
import { PositionDto } from '../../../../../models/position/position-dto';
import { ProposalBuildPositionDto } from '../../../../../models/proposal-build/proposal-build-position-dto';
import { ProposalBuildPositionDialogComponent } from '../proposal-build-position-dialog/proposal-build-position-dialog.component';

@Component({
  selector: 'proposal-build-dialog',
  templateUrl: './proposal-build-dialog.component.html',
  styleUrls: ['./proposal-build-dialog.component.scss'],
})
export class ProposalBuildDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  DialogType = DialogType;
  dialogType: DialogType = DialogType.Create;

  proposalBuild: ProposalBuildDto = {} as ProposalBuildDto;
  complexities: ProposalBuildComplexityDto[] = [];
  positions: PositionDto[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProposalBuildDialogComponent>,
    private complexityService: ComplexityService,
    private positionService: PositionService,
    private dialog: MatDialog
  ) {
    this.proposalBuild = data.data;
    this.proposalBuild.complexityId = this.proposalBuild.complexity.id;
    this.dialogType = data.type;
    complexityService.getAllComplexities().pipe(
      takeUntil(this.destroy$)
    ).subscribe((complexities) => {
      this.complexities = complexities;
    });
    positionService
      .getAllPositions().pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((positions) => (this.positions = positions));
  }

  ngOnInit(): void {}

  removePosition(position: ProposalBuildPositionDto) {
    const index = this.proposalBuild.positions.indexOf(position);

    if (index >= 0) {
      this.proposalBuild.positions.splice(index, 1);
    }
  }

  openPositionDialog(position: ProposalBuildPositionDto | null = null) {
    let dialogType = DialogType.Edit;
    if (position == null) {
      dialogType = DialogType.Create;
      position = {} as ProposalBuildPositionDto;
    }

    const dialogRef = this.dialog.open(ProposalBuildPositionDialogComponent, {
      width: '600px',
      autoFocus: false,
      data: { type: dialogType, data: position },
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((position: ProposalBuildPositionDto) => {
      if (position == null) return;

      if (
        this.proposalBuild.positions.find(
          (x) => x.positionName == position.positionName
        )
      )
        return;

      if (dialogType == DialogType.Create) {
        this.proposalBuild.positions.push(position);
      }
    });
  }

  canCreate(): boolean {
    return (
      this.proposalBuild &&
      this.proposalBuild.projectTypeName != '' &&
      this.proposalBuild.complexity &&
      this.proposalBuild.complexityId > 0
    );
  }

  complexityChange() {
    this.proposalBuild.complexityId = this.proposalBuild.complexity.id;
  }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
