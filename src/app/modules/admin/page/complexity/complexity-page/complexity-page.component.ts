import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SnackBarService} from "../../../../../services/snack-bar.service";
import {ComplexityService} from "../../../../../services/complexity.service";
import {TeamBuildComplexityDto} from "../../../../../models/teamBuild/teamBuildComplexity-dto";
import {DialogType} from "../../../../../models/enums";
import {SkillDto} from "../../../../../models/skill/skill-dto";
import {SkillDialogComponent} from "../../skill/skill-dialog/skill-dialog.component";
import {ComplexityDialogComponent} from "../complexity-dialog/complexity-dialog.component";

@Component({
  selector: 'cv-complexity-page',
  templateUrl: './complexity-page.component.html',
  styleUrls: ['./complexity-page.component.scss']
})
export class ComplexityPageComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'action'];
  complexities: TeamBuildComplexityDto[] = [];

  constructor(private complexityService: ComplexityService,
              public dialog: MatDialog,
              private snackBar: SnackBarService) {
    this.complexityService.getAllComplexities().subscribe(complexities=> this.complexities = complexities);
  }


  ngOnInit(): void {
  }

  createComplexity(complexity:TeamBuildComplexityDto){
    this.complexityService.createComplexity(complexity).subscribe(
      () => {
        this.snackBar.showSuccess('Created');
        this.complexityService.getAllComplexities().subscribe(complexities => this.complexities = complexities);
      }
    )
  }

  updateComplexity(complexity:TeamBuildComplexityDto){
    this.complexityService.updateComplexity(complexity).subscribe(
      () => {
        this.snackBar.showSuccess('Updated');
        this.complexityService.getAllComplexities().subscribe(complexities => this.complexities = complexities);
      }
    )
  }

  deleteComplexity(complexity:TeamBuildComplexityDto){
    this.complexityService.deleteComplexity(complexity).subscribe(
      () => {
        this.snackBar.showSuccess('Deleted');
        this.complexityService.getAllComplexities().subscribe(complexities => this.complexities = complexities);
      }
    )
  }

  openComplexityDialog(complexity:TeamBuildComplexityDto| null = null){
    let dialogType: DialogType = DialogType.Edit;
    if (complexity == null) {
      complexity = {} as TeamBuildComplexityDto;
      dialogType = DialogType.Create;
    }

    const dialogRef = this.dialog.open(ComplexityDialogComponent, {
      width: '600px',
      autoFocus: false,
      data: { type: dialogType, data: complexity },
    });

    dialogRef.afterClosed().subscribe((complexity: TeamBuildComplexityDto) => {
      if (complexity == null)
        return;
      if (dialogType == DialogType.Create) {
        this.createComplexity(complexity);
      } else {
        this.updateComplexity(complexity);
      }

    });
  }

}
