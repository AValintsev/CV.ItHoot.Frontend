import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LanguageService} from 'src/app/services/language.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {LanguageDialogComponent} from "../language-dialog/language-dialog.component";
import {LanguageDto} from "../../../../../models/language/language-dto";
import {DialogType} from "../../../../../models/enums";


@Component({
  selector: 'app-language-page',
  templateUrl: './language-page.component.html',
  styleUrls: ['./language-page.component.scss']
})
export class LanguagePageComponent implements OnInit {
  // displayedColumns: string[] = ['id', 'name', 'action'];
  displayedColumns: string[] = ['name', 'action'];
  languages: LanguageDto[] = [];

  constructor(private languageService: LanguageService,
    private dialog: MatDialog,
    private snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.languageService.getAllLanguage().subscribe(language => this.languages = language);
  }

  createLanguage(language: LanguageDto) {
    this.languageService.createLanguage(language).subscribe({
      next: () => {
        this.snackBar.showSuccess('Created');
        this.languageService.getAllLanguage().subscribe(language => this.languages = language);
      },
      error: () => this.snackBar.showDanger('Something went wrong')
    })
  }

  updateLanguage(language: LanguageDto) {
    this.languageService.updateLanguage(language).subscribe({
      next: () => {
        this.snackBar.showSuccess('Updated');
        this.languageService.getAllLanguage().subscribe(language => this.languages = language);
      },
      error: () => this.snackBar.showDanger('Something went wrong')
    })
  }

  deleteLanguage(skill: LanguageDto) {
    this.languageService.deleteLanguage(skill).subscribe({
      next: () => {
        this.snackBar.showSuccess('Deleted');
        this.languageService.getAllLanguage().subscribe(language => this.languages = language);
      },
      error: () => this.snackBar.showDanger('Something went wrong')
    })
  }


  openLanguageDialog(language: LanguageDto | null = null): void {
    let dialogType: DialogType = DialogType.Edit;
    if (language == null) {
      language = {} as LanguageDto;
      dialogType = DialogType.Create;
    }

    const dialogRef = this.dialog.open(LanguageDialogComponent, {
      width: '600px',
      autoFocus: false,
      data: { type: dialogType, data: language },
    });

    dialogRef.afterClosed().subscribe((language: LanguageDto) => {
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
