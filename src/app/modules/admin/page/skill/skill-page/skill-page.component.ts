import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import {SkillService} from 'src/app/services/skill.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {SkillDialogComponent} from '../skill-dialog/skill-dialog.component';
import {SkillDto} from '../../../../../models/skill/skill-dto';
import {DialogType} from '../../../../../models/enums';
import { DeleteModalService } from 'src/app/services/delete-modal.service';

@Component({
  selector: 'app-language-page',
  templateUrl: './skill-page.component.html',
  styleUrls: ['./skill-page.component.scss'],
})
export class SkillPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  // displayedColumns: string[] = ['id', 'name', 'action'];
  displayedColumns: string[] = ['name', 'action'];
  skills: SkillDto[] = [];

  constructor(
    private skillService: SkillService,
    public dialog: MatDialog,
    private snackBar: SnackBarService,
    private deleteModalService: DeleteModalService
  ) {}

  ngOnInit(): void {
    this.skillService
      .getAllSkills().pipe(
		takeUntil(this.destroy$)
	  )
      .subscribe((skills) => (this.skills = skills));
  }

  createSkill(skill: SkillDto) {
    this.skillService.createSkill(skill).pipe(
		takeUntil(this.destroy$)
	  ).subscribe({
      next: () => {
        this.snackBar.showSuccess('Created');
        this.skillService
          .getAllSkills().pipe(
			takeUntil(this.destroy$)
		  )
          .subscribe((skills) => (this.skills = skills));
      },
      error: () => this.snackBar.showDanger('Something went wrong'),
    });
  }

  updateSkill(skill: SkillDto) {
    this.skillService.updateSkill(skill).pipe(
		takeUntil(this.destroy$)
	  ).subscribe({
      next: () => {
        this.snackBar.showSuccess('Updated');
        this.skillService
          .getAllSkills().pipe(
			takeUntil(this.destroy$)
		  )
          .subscribe((skills) => (this.skills = skills));
      },
      error: () => this.snackBar.showDanger('Something went wrong'),
    });
  }

  deleteSkill(skill: SkillDto) {
    this.deleteModalService.matModal('Do you want to delete your resume?').subscribe({
      next: (response) => {
        if (response) {
      this.skillService.deleteSkill(skill).pipe(
		takeUntil(this.destroy$)
	  ).subscribe({
      next: () => {
        this.snackBar.showSuccess('Deleted');
        this.skillService
          .getAllSkills().pipe(
			takeUntil(this.destroy$)
		  )
          .subscribe((skills) => (this.skills = skills));
      },
      error: () => this.snackBar.showDanger('Something went wrong'),
    });
        }
        return false;
      },
      error: (error) => { },
    });
   
  }

  openSkillDialog(skill: SkillDto | null = null): void {
    let dialogType: DialogType = DialogType.Edit;
    if (skill == null) {
      skill = {} as SkillDto;
      dialogType = DialogType.Create;
    }

    const dialogRef = this.dialog.open(SkillDialogComponent, {
      width: '600px',
      autoFocus: false,
      data: { type: dialogType, data: skill },
    });

    dialogRef.afterClosed().pipe(
		takeUntil(this.destroy$)
	  ).subscribe((skill: SkillDto) => {
      if (skill == null) return;
      if (dialogType == DialogType.Create) {
        this.createSkill(skill);
      } else {
        this.updateSkill(skill);
      }
    });
  }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
