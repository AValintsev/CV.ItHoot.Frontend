import {Component, OnInit} from '@angular/core';

import {MatDialog} from "@angular/material/dialog";
import {DialogType} from 'src/app/models/dialog-type';
import {SkillTestDto} from 'src/app/models/resume-dto';
import {SkillService} from 'src/app/services/skill.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {SkillDialogComponent} from "../skill-dialog/skill-dialog.component";


@Component({
	selector: 'app-language-page',
	templateUrl: './skill-page.component.html',
	styleUrls: ['./skill-page.component.scss']
})
export class SkillPageComponent implements OnInit {

	displayedColumns: string[] = ['id', 'name', 'action'];
	skills: SkillTestDto[] = [];

	constructor(private skillService: SkillService, public dialog: MatDialog, private snackBar: SnackBarService) { }

	ngOnInit(): void {
		this.skillService.getAllSkills().subscribe(skills => this.skills = skills);
	}

	createSkill(skill: SkillTestDto) {
		this.skillService.createSkill(skill).subscribe({
			next: () => {
				this.snackBar.showSuccess('Created');
				this.skillService.getAllSkills().subscribe(skills => this.skills = skills);
			},
			error: () => this.snackBar.showDanger('Something went wrong')
		})
	}

	updateSkill(skill: SkillTestDto) {
		this.skillService.updateSkill(skill).subscribe({
			next: () => {
				this.snackBar.showSuccess('Updated');
				this.skillService.getAllSkills().subscribe(skills => this.skills = skills);
			},
			error: () => this.snackBar.showDanger('Something went wrong')
		})
	}

	deleteSkill(skill: SkillTestDto) {
		this.skillService.deleteSkill(skill).subscribe({
			next: () => {
				this.snackBar.showSuccess('Deleted');
				this.skillService.getAllSkills().subscribe(skills => this.skills = skills);
			},
			error: () => this.snackBar.showDanger('Something went wrong')
		})
	}

	openSkillDialog(skill: SkillTestDto | null = null): void {
		let dialogType: DialogType = DialogType.Edit;
		if (skill == null) {
			skill = {} as SkillTestDto;
			dialogType = DialogType.Create;
		}

		const dialogRef = this.dialog.open(SkillDialogComponent, {
			width: '600px',
			autoFocus: false,
			data: { type: dialogType, data: skill },
		});

		dialogRef.afterClosed().subscribe((skill: SkillTestDto) => {
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