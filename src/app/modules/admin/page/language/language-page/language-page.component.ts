import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DialogType } from 'src/app/models/dialog-type';
import { LanguageTestDto } from 'src/app/models/resume-dto';
import { LanguageService } from 'src/app/services/language.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { LanguageDialogComponent } from "../language-dialog/language-dialog.component";


@Component({
  selector: 'app-language-page',
  templateUrl: './language-page.component.html',
  styleUrls: ['./language-page.component.scss']
})
export class LanguagePageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  languages: LanguageTestDto[] = [];

  constructor(private languageService: LanguageService,
    private dialog: MatDialog,
    private snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.languageService.getAllLanguage().subscribe(language => this.languages = language);
  }

  createLanguage(language: LanguageTestDto) {
    this.languageService.createLanguage(language).subscribe({
      next: () => {
        this.snackBar.showSuccess('Created');
        this.languageService.getAllLanguage().subscribe(language => this.languages = language);
      },
      error: () => this.snackBar.showDanger('Something went wrong')
    })
  }

  updateLanguage(language: LanguageTestDto) {
    this.languageService.updateLanguage(language).subscribe({
      next: () => {
        this.snackBar.showSuccess('Updated');
        this.languageService.getAllLanguage().subscribe(language => this.languages = language);
      },
      error: () => this.snackBar.showDanger('Something went wrong')
    })
  }

  deleteLanguage(skill: LanguageTestDto) {
    this.languageService.deleteLanguage(skill).subscribe({
      next: () => {
        this.snackBar.showSuccess('Deleted');
        this.languageService.getAllLanguage().subscribe(language => this.languages = language);
      },
      error: () => this.snackBar.showDanger('Something went wrong')
    })
  }


  openLanguageDialog(language: LanguageTestDto | null = null): void {
    let dialogType: DialogType = DialogType.Edit;
    if (language == null) {
      language = {} as LanguageTestDto;
      dialogType = DialogType.Create;
    }

    const dialogRef = this.dialog.open(LanguageDialogComponent, {
      width: '600px',
      autoFocus: false,
      data: { type: dialogType, data: language },
    });

    dialogRef.afterClosed().subscribe((language: LanguageTestDto) => {
      if (language == null)
        return;
      if (dialogType == DialogType.Create) {
        this.createLanguage(language);
      } else {
        this.updateLanguage(language);
      }

    });
  }
}
