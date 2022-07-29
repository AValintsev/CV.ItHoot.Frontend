import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LanguageService} from 'src/app/services/language.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {LanguageDialogComponent} from '../language-dialog/language-dialog.component';
import {LanguageDto} from '../../../../../models/language/language-dto';
import {DialogType} from '../../../../../models/enums';
import {DeleteModalService} from 'src/app/services/delete-modal.service';

@Component({
  selector: 'app-language-page',
  templateUrl: './language-page.component.html',
  styleUrls: ['./language-page.component.scss'],
})
export class LanguagePageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  // displayedColumns: string[] = ['id', 'name', 'action'];
  displayedColumns: string[] = ['action','name'];
  languages: LanguageDto[] = [];

  constructor(
    private languageService: LanguageService,
    private dialog: MatDialog,
    private snackBar: SnackBarService,
    private deleteModalService: DeleteModalService
  ) {}

  ngOnInit(): void {
    this.languageService
      .getAllLanguage().pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((language) => (this.languages = language));
  }

  createLanguage(language: LanguageDto) {
    this.languageService.createLanguage(language).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.snackBar.showSuccess('Created');
        this.languageService
          .getAllLanguage().pipe(
            takeUntil(this.destroy$)
          )
          .subscribe((language) => (this.languages = language));
      },
      error: () => this.snackBar.showDanger('Something went wrong'),
    });
  }

  updateLanguage(language: LanguageDto) {
    this.languageService.updateLanguage(language).subscribe({
      next: () => {
        this.snackBar.showSuccess('Updated');
        this.languageService
          .getAllLanguage().pipe(
            takeUntil(this.destroy$)
          )
          .subscribe((language) => (this.languages = language));
      },
      error: () => this.snackBar.showDanger('Something went wrong'),
    });
  }

  deleteLanguage(skill: LanguageDto) {
    this.deleteModalService.matModal('Do you want to delete language?').subscribe({
      next: (response) => {
        if (response) {
       this.languageService.deleteLanguage(skill).subscribe({
      next: () => {
        this.snackBar.showSuccess('Deleted');
        this.languageService
          .getAllLanguage().pipe(
            takeUntil(this.destroy$)
          )
          .subscribe((language) => (this.languages = language));
      },
      error: () => this.snackBar.showDanger('Something went wrong'),
    });
        }
        return false;
      },
      error: (error) => { },
    });

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

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((language: LanguageDto) => {
      if (!language) return;
      if (dialogType == DialogType.Create) {
        this.createLanguage(language);
      } else {
        this.updateLanguage(language);
      }
    });
  }


   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
