import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ResumeService } from 'src/app/services/resume.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ResumeDto } from 'src/app/models/resume/resume-dto';
import { PositionDto } from 'src/app/models/position/position-dto';
import { PositionService } from 'src/app/services/position.service';
import { ResumeSkillDto } from 'src/app/models/resume/resume-skill-dto';
import { DialogType } from 'src/app/models/enums';
import { SkillDialog } from '../../component/modals/skill-dialog/skill-dialog.component';
import { ResumeLanguageDto } from 'src/app/models/resume/resume-language-dto';
import { LanguageDialog } from '../../component/modals/language-dialog/language-dialog.component';
import { EducationDto } from 'src/app/models/resume/education-dto';
import { EducationDialog } from '../../component/modals/education-dialog/education-dialog.component';
import { ExperienceDto } from 'src/app/models/resume/experience-dto';
import { ExperienceDialog } from '../../component/modals/experience-dialog/experience-dialog.component';
import { ResumeTemplateDto } from '../../../../models/resume/resume-template-dto';

@Component({
  selector: 'cv-create-form-bar',
  templateUrl: './form-bar.component.html',
  styleUrls: ['./form-bar.component.scss'],
})
export class FormBarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  @Input()
  public resumeForm: FormGroup = {} as FormGroup;
  @Input()
  public resume!: ResumeDto;

  resumeTemplates!: ResumeTemplateDto[];

  file: File | null = null;
  positions!: PositionDto[];


  constructor(
    public dialog: MatDialog,
    private resumeService: ResumeService,
    private positionService: PositionService
  ) {
    positionService.getAllPositions().pipe(
      takeUntil(this.destroy$)
    ).subscribe((positions) => {
      this.positions = positions;
    });
    this.resumeService
      .getAllTemplates().pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((templates) => (this.resumeTemplates = templates));
  }

  onSelectFile(event: any) {
    this.file = event.target.files[0];
    this.resumeService
      .addPhoto(this.resume.id, this.file!).pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((x) => {});
  }

  ngOnInit(): void {
    this.listSkillsChanged();
    this.listLanguageChanged();
    this.experienceListChanged();
    this.educationListChanged();
  }

  comparePosition(position: any, position1: any) {
    return position?.positionId === position1?.positionId;
  }

  compareTemplate(template: any, template1: any) {
    return template === template1;
  }

  removeSkill(skill: ResumeSkillDto): void {
    const index = this.resume.skills.indexOf(skill);
    if (index >= 0) {
      this.resume.skills.splice(index, 1);
      this.listSkillsChanged();
    }
  }

  listSkillsChanged(): void {
    (<FormArray>this.resumeForm.controls['skills']).clear();
    this.resume.skills?.forEach((skill) => {
      (<FormArray>this.resumeForm.controls['skills']).push(
        new FormGroup({
          id: new FormControl(skill.id),
          skillId: new FormControl(skill.skillId),
          skillName: new FormControl(skill.skillName),
          level: new FormControl(skill.level),
        })
      );
    });
  }

  openSkillDialog(skill: ResumeSkillDto | null = null): void {
    let data: ResumeSkillDto;
    let dialogType: DialogType;
    if (skill == null) {
      data = {} as ResumeSkillDto;
      dialogType = DialogType.Create;
    } else {
      data = skill;
      dialogType = DialogType.Edit;
    }

    const dialogRef = this.dialog.open(SkillDialog, {
      width: '600px',
      autoFocus: false,
      data: { type: dialogType, data: data },
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((skill: ResumeSkillDto) => {
      if (skill == null) return;

      let skillDto = this.resume.skills.find(
        (e) => e.skillName == skill.skillName
      );
      if (skillDto != null) skillDto = skill;
      else this.resume.skills.push(skill);
      this.listSkillsChanged();
    });
  }

  removeLanguage(language: ResumeLanguageDto) {
    const index = this.resume.languages.indexOf(language);
    if (index >= 0) {
      this.resume.languages.splice(index, 1);
      this.listLanguageChanged();
    }
  }

  listLanguageChanged(): void {
    (<FormArray>this.resumeForm.controls['languages']).clear();
    this.resume.languages?.forEach((languages) => {
      (<FormArray>this.resumeForm.controls['languages']).push(
        new FormGroup({
          id: new FormControl(languages.id),
          languageId: new FormControl(languages.languageId),
          languageName: new FormControl(languages.languageName),
          level: new FormControl(languages.level),
        })
      );
    });
  }

  openLanguageDialog(language: ResumeLanguageDto | null = null) {
    let data: ResumeLanguageDto;
    let dialogType: DialogType;
    if (language == null) {
      data = {} as ResumeLanguageDto;
      dialogType = DialogType.Create;
    } else {
      data = language;
      dialogType = DialogType.Edit;
    }

    const dialogRef = this.dialog.open(LanguageDialog, {
      width: '600px',
      autoFocus: false,
      data: { type: dialogType, data: data },
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((language: ResumeLanguageDto) => {
      if (language == null) return;
      let languageDto = this.resume.languages.find(
        (e) => e.languageName == language.languageName
      );
      if (languageDto != null) languageDto = language;
      else this.resume.languages.push(language);

      this.listLanguageChanged();
    });
  }

  removeEducation(education: EducationDto) {
    const index = this.resume.educations.indexOf(education);
    if (index >= 0) {
      this.resume.educations.splice(index, 1);
      this.educationListChanged();
    }
  }

  educationListChanged() {
    (<FormArray>this.resumeForm.controls['educations']).clear();
    this.resume.educations
      ?.sort(
        (a: EducationDto, b: EducationDto) =>
          Date.parse(b.endDate) - Date.parse(a.endDate)
      )
      .forEach((education) => {
        (<FormArray>this.resumeForm.controls['educations']).push(
          new FormGroup({
            id: new FormControl(0),
            institutionName: new FormControl(education.institutionName),
            specialization: new FormControl(education.specialization),
            description: new FormControl(education.description),
            degree: new FormControl(education.degree),
            startDate: new FormControl(education.startDate),
            endDate: new FormControl(education.endDate),
          })
        );
      });
  }

  openEducationDialog(education: EducationDto | null = null) {
    let data: EducationDto;
    let dialogType: DialogType;
    if (education == null) {
      data = {} as EducationDto;
      dialogType = DialogType.Create;
    } else {
      data = education;
      dialogType = DialogType.Edit;
    }

    const dialogRef = this.dialog.open(EducationDialog, {
      width: '650px',
      autoFocus: false,
      data: { type: dialogType, data: data },
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((education: EducationDto) => {
      if (education == null) return;
      let educationDto = this.resume.educations.find(
        (e) => e.id == education.id
      );
      if (educationDto != null) {
        this.removeEducation(educationDto);
      } else {
        education.id = this.resume.educations.length;
      }
      this.resume.educations.push(education);
      this.educationListChanged();
    });
  }

  removeExperience(experience: ExperienceDto) {
    const index = this.resume.experiences.indexOf(experience);
    if (index >= 0) {
      this.resume.experiences.splice(index, 1);
      this.experienceListChanged();
    }
  }

  experienceListChanged() {
    (<FormArray>this.resumeForm.controls['experiences']).clear();
    this.resume.experiences
      ?.sort(
        (a: ExperienceDto, b: ExperienceDto) =>
          Date.parse(b.endDate) - Date.parse(a.endDate)
      )
      .forEach((experience) => {
        (<FormArray>this.resumeForm.controls['experiences']).push(
          new FormGroup({
            id: new FormControl(0),
            position: new FormControl(experience.position),
            description: new FormControl(experience.description),
            company: new FormControl(experience.company),
            startDate: new FormControl(experience.startDate),
            endDate: new FormControl(experience.endDate),
          })
        );
      });
  }

  openExperienceDialog(experience: ExperienceDto | null = null) {
    let data: ExperienceDto;
    let dialogType: DialogType;
    if (experience == null) {
      data = {} as ExperienceDto;
      dialogType = DialogType.Create;
    } else {
      data = experience;
      dialogType = DialogType.Edit;
    }

    const dialogRef = this.dialog.open(ExperienceDialog, {
      width: '700px',
      autoFocus: false,
      data: { type: dialogType, data: data },
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((experience: ExperienceDto) => {
      if (experience == null) return;
      let experienceDto = this.resume.experiences.find(
        (e) => e.id == experience.id
      );
      if (experienceDto != null) {
        this.removeExperience(experienceDto);
      } else {
        experience.id = this.resume.experiences.length;
      }
      this.resume.experiences.push(experience);
      this.experienceListChanged();
    });
  }

  changeTeam(event: any) {}
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
