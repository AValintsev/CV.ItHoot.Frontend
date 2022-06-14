import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SnackBarService} from "../../../../../services/snack-bar.service";
import {ComplexityService} from "../../../../../services/complexity.service";
import {ProposalBuildComplexityDto} from "../../../../../models/proposal-build/proposal-build-complexity-dto";
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
  complexities: ProposalBuildComplexityDto[] = [];

  constructor(private complexityService: ComplexityService,
              public dialog: MatDialog,
              private snackBar: SnackBarService) {
    this.complexityService.getAllComplexities().subscribe(complexities=> this.complexities = complexities);
  }


  ngOnInit(): void {
  }

  createComplexity(complexity:ProposalBuildComplexityDto){
    this.complexityService.createComplexity(complexity).subscribe(
      () => {
        this.snackBar.showSuccess('Created');
        this.complexityService.getAllComplexities().subscribe(complexities => this.complexities = complexities);
      }
    )
  }

  updateComplexity(complexity:ProposalBuildComplexityDto){
    this.complexityService.updateComplexity(complexity).subscribe(
      () => {
        this.snackBar.showSuccess('Updated');
        this.complexityService.getAllComplexities().subscribe(complexities => this.complexities = complexities);
      }
    )
  }

  deleteComplexity(complexity:ProposalBuildComplexityDto){
    this.complexityService.deleteComplexity(complexity).subscribe(
      () => {
        this.snackBar.showSuccess('Deleted');
        this.complexityService.getAllComplexities().subscribe(complexities => this.complexities = complexities);
      }
    )
  }

  openComplexityDialog(complexity:ProposalBuildComplexityDto| null = null){
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

    dialogRef.afterClosed().subscribe((complexity: ProposalBuildComplexityDto) => {
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
