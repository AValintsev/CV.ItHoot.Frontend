import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SnackBarService} from '../../../../../services/snack-bar.service';
import {ComplexityService} from '../../../../../services/complexity.service';
import {ProposalBuildComplexityDto} from '../../../../../models/proposal-build/proposal-build-complexity-dto';
import {DialogType} from '../../../../../models/enums';
import {ComplexityDialogComponent} from '../complexity-dialog/complexity-dialog.component';
import {DeleteModalService} from 'src/app/services/delete-modal.service';

@Component({
  selector: 'cv-complexity-page',
  templateUrl: './complexity-page.component.html',
  styleUrls: ['./complexity-page.component.scss'],
})
export class ComplexityPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  // displayedColumns: string[] = ['id', 'name', 'action'];
  displayedColumns: string[] = ['name', 'action'];
  complexities: ProposalBuildComplexityDto[] = [];

  constructor(
    private complexityService: ComplexityService,
    public dialog: MatDialog,
    private snackBar: SnackBarService,
    private deleteModalService: DeleteModalService
  ) {
    this.complexityService
      .getAllComplexities().pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((complexities) => (this.complexities = complexities));
  }

  ngOnInit(): void {}

  createComplexity(complexity: ProposalBuildComplexityDto) {
    this.complexityService.createComplexity(complexity).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.snackBar.showSuccess('Created');
      this.complexityService
        .getAllComplexities().pipe(
          takeUntil(this.destroy$)
        )
        .subscribe((complexities) => (this.complexities = complexities));
    });
  }

  updateComplexity(complexity: ProposalBuildComplexityDto) {
    this.complexityService.updateComplexity(complexity).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.snackBar.showSuccess('Updated');
      this.complexityService
        .getAllComplexities().pipe(
          takeUntil(this.destroy$)
        )
        .subscribe((complexities) => (this.complexities = complexities));
    });
  }

  deleteComplexity(complexity: ProposalBuildComplexityDto) {
    this.deleteModalService.matModal('Do you want to delete your resume?').subscribe({
      next: (response) => {
        if (response) {
        this.complexityService.deleteComplexity(complexity).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.snackBar.showSuccess('Deleted');
      this.complexityService
        .getAllComplexities().pipe(
          takeUntil(this.destroy$)
        )
        .subscribe((complexities) => (this.complexities = complexities));
    });
        }
        return false;
      },
      error: (error) => { },
    });

  }

  openComplexityDialog(complexity: ProposalBuildComplexityDto | null = null) {
    let dialogType: DialogType = DialogType.Edit;
    if (complexity == null) {
      complexity = {} as ProposalBuildComplexityDto;
      dialogType = DialogType.Create;
    }

    const dialogRef = this.dialog.open(ComplexityDialogComponent, {
      width: '600px',
      autoFocus: false,
      data: { type: dialogType, data: complexity },
    });

    dialogRef
      .afterClosed().pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((complexity: ProposalBuildComplexityDto) => {
        if (complexity == null) return;
        if (dialogType == DialogType.Create) {
          this.createComplexity(complexity);
        } else {
          this.updateComplexity(complexity);
        }
      });
  }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
