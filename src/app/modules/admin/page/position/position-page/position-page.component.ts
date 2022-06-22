import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SnackBarService} from "../../../../../services/snack-bar.service";
import {PositionService} from "../../../../../services/position.service";
import {PositionDialogComponent} from "../position-dialog/position-dialog.component";
import {PositionDto} from "../../../../../models/position/position-dto";
import {DialogType} from "../../../../../models/enums";

@Component({
  selector: 'cv-position-page',
  templateUrl: './position-page.component.html',
  styleUrls: ['./position-page.component.scss']
})
export class PositionPageComponent implements OnInit,OnDestroy {

  // displayedColumns: string[] = ['id', 'name', 'action'];
  displayedColumns: string[] = ['name', 'action'];
  positions: PositionDto[] = [];

  constructor(private positionService: PositionService, public dialog: MatDialog, private snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.positionService.getAllPositions().subscribe(positions => this.positions = positions);
  }

  createSkill(position: PositionDto) {
    this.positionService.createPosition(position).subscribe({
      next: () => {
        this.snackBar.showSuccess('Created');
        this.positionService.getAllPositions().subscribe(positions => this.positions = positions);
      },
      error: () => this.snackBar.showDanger('Something went wrong')
    })
  }

  updateSkill(position: PositionDto) {
    this.positionService.updatePosition(position).subscribe({
      next: () => {
        this.snackBar.showSuccess('Updated');
        this.positionService.getAllPositions().subscribe(positions => this.positions = positions);
      },
      error: () => this.snackBar.showDanger('Something went wrong')
    })
  }

  deleteSkill(position: PositionDto) {
    this.positionService.deletePosition(position).subscribe({
      next: () => {
        this.snackBar.showSuccess('Deleted');
        this.positionService.getAllPositions().subscribe(positions => this.positions = positions);
      },
      error: () => this.snackBar.showDanger('Something went wrong')
    })
  }

  openPositionDialog(position: PositionDto | null = null): void {
    let dialogType: DialogType = DialogType.Edit;
    if (position == null) {
      position = {} as PositionDto;
      dialogType = DialogType.Create;
    }

    const dialogRef = this.dialog.open(PositionDialogComponent, {
      width: '600px',
      autoFocus: false,
      data: { type: dialogType, data: position },
    });

    dialogRef.afterClosed().subscribe((position: PositionDto) => {
      if (position == null)
        return;
      if (dialogType == DialogType.Create) {
        this.createSkill(position);
      } else {
        this.updateSkill(position);
      }

    });
  }
  ngOnDestroy() { }
}
