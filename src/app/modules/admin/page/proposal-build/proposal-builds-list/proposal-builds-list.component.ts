import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ProposalBuildDto} from '../../../../../models/proposal-build/proposal-build-dto';
import {ProposalBuildService} from '../../../../../services/proposal-build.service';
import {ProposalBuildPositionDto} from '../../../../../models/proposal-build/proposal-build-position-dto';
import {DialogType} from '../../../../../models/enums';
import {MatDialog} from '@angular/material/dialog';
import {ProposalBuildDialogComponent} from '../proposal-build-dialog/proposal-build-dialog.component';
import {SnackBarService} from '../../../../../services/snack-bar.service';
import {ProposalBuildComplexityDto} from '../../../../../models/proposal-build/proposal-build-complexity-dto';
import {MatButtonToggleGroup} from '@angular/material/button-toggle';

@Component({
  selector: 'proposal-builds-list',
  templateUrl: './proposal-builds-list.component.html',
  styleUrls: ['./proposal-builds-list.component.scss'],
})
export class ProposalBuildsListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  displayedColumns: string[] = [
    'action',
    'projectType',
    'complexity',
    'positions',
    'proposalSize',
    'estimation',
    'status',
  ];

  proposalBuilds: ProposalBuildDto[] = [];

  constructor(
    private proposalBuildService: ProposalBuildService,
    public dialog: MatDialog,
    private snackBarService: SnackBarService,
    private cdr: ChangeDetectorRef
  ) {
    proposalBuildService.getAllProposalBuilds().pipe(
      takeUntil(this.destroy$)
    ).subscribe((proposalBuilds) => {
      this.proposalBuilds = proposalBuilds;
    });
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  getProposalSize(positions: ProposalBuildPositionDto[]): number {
    let size = 0;
    positions.forEach((position) => {
      size += position.countMembers;
    });
    return size;
  }

  openProposalBuildDialog(proposalBuild: ProposalBuildDto | null = null) {
    let dialogType = DialogType.Edit;
    if (proposalBuild == null) {
      dialogType = DialogType.Create;
      proposalBuild = {
        complexity: {},
        positions: [] as ProposalBuildPositionDto[],
      } as ProposalBuildDto;
    } else {
      if (proposalBuild.complexity == null) {
        proposalBuild.complexity = {} as ProposalBuildComplexityDto;
      }
    }

    const dialogRef = this.dialog.open(ProposalBuildDialogComponent, {
      width: '600px',
      autoFocus: false,
      data: { type: dialogType, data: proposalBuild },
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((proposalBuild: ProposalBuildDto) => {
      if (!proposalBuild) return;

      if (dialogType == DialogType.Create)
        this.proposalBuildService
          .createProposalBuild(proposalBuild).pipe(
            takeUntil(this.destroy$)
          )
          .subscribe(() => {
            this.proposalBuildService
              .getAllProposalBuilds().pipe(
                takeUntil(this.destroy$)
              )
              .subscribe(
                (proposalBuilds) => (this.proposalBuilds = proposalBuilds)
              );
            this.snackBarService.showSuccess('Created');
          });

      if (dialogType == DialogType.Edit)
        this.proposalBuildService
          .updateProposalBuild(proposalBuild).pipe(
            takeUntil(this.destroy$)
          )
          .subscribe(() => {
            this.proposalBuildService
              .getAllProposalBuilds().pipe(
                takeUntil(this.destroy$)
              )
              .subscribe(
                (proposalBuilds) => (this.proposalBuilds = proposalBuilds)
              );
            this.snackBarService.showSuccess('Updated');
          });
    });
  }

  isSticky(buttonToggleGroup: MatButtonToggleGroup, id: string) {
    return (buttonToggleGroup.value || []).indexOf(id) !== -1;
  }

   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
