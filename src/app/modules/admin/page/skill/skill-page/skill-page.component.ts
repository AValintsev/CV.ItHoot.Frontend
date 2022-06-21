import {Component, OnInit} from '@angular/core';

import {MatDialog} from "@angular/material/dialog";
import {SkillService} from 'src/app/services/skill.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {SkillDialogComponent} from "../skill-dialog/skill-dialog.component";
import {SkillDto} from "../../../../../models/skill/skill-dto";
import {DialogType} from "../../../../../models/enums";


@Component({
	selector: 'app-language-page',
	templateUrl: './skill-page.component.html',
	styleUrls: ['./skill-page.component.scss']
})
export class SkillPageComponent implements OnInit {

	// displayedColumns: string[] = ['id', 'name', 'action'];
	displayedColumns: string[] = ['name', 'action'];
	skills: SkillDto[] = [];

	constructor(private skillService: SkillService, public dialog: MatDialog, private snackBar: SnackBarService) { }

	ngOnInit(): void {
		this.skillService.getAllSkills().subscribe(skills => this.skills = skills);
	}

	createSkill(skill: SkillDto) {
		this.skillService.createSkill(skill).subscribe({
			next: () => {
				this.snackBar.showSuccess('Created');
				this.skillService.getAllSkills().subscribe(skills => this.skills = skills);
			},
			error: () => this.snackBar.showDanger('Something went wrong')
		})
	}

	updateSkill(skill: SkillDto) {
		this.skillService.updateSkill(skill).subscribe({
			next: () => {
				this.snackBar.showSuccess('Updated');
				this.skillService.getAllSkills().subscribe(skills => this.skills = skills);
			},
			error: () => this.snackBar.showDanger('Something went wrong')
		})
	}

	deleteSkill(skill: SkillDto) {
		this.skillService.deleteSkill(skill).subscribe({
			next: () => {
				this.snackBar.showSuccess('Deleted');
				this.skillService.getAllSkills().subscribe(skills => this.skills = skills);
			},
			error: () => this.snackBar.showDanger('Something went wrong')
		})
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

		dialogRef.afterClosed().subscribe((skill: SkillDto) => {
			if (skill == null)
				return;
			if (dialogType == DialogType.Create) {
				this.createSkill(skill);
			} else {
				this.updateSkill(skill);
			}

		});
	}
}
