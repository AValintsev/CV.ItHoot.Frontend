import {takeUntil} from 'rxjs/operators';
import {ResumeService} from 'src/app/services/resume.service';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UntypedFormArray, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {SkillDialog} from '../skill-dialog/skill-dialog.component';
import {LanguageDialog} from '../language-dialog/language-dialog.component';
import {EducationDialog} from '../education-dialog/education-dialog.component';
import {ExperienceDialog} from '../experience-dialog/experience-dialog.component';
import {PositionService} from '../../../services/position.service';
import {ResumeDto} from '../../../models/resume/resume-dto';
import {PositionDto} from '../../../models/position/position-dto';
import {ResumeSkillDto} from '../../../models/resume/resume-skill-dto';
import {DialogType} from '../../../models/enums';
import {ResumeLanguageDto} from '../../../models/resume/resume-language-dto';
import {EducationDto} from '../../../models/resume/education-dto';
import {ExperienceDto} from '../../../models/resume/experience-dto';
import {Subject} from 'rxjs';
import {ResumeTemplateDto} from 'src/app/models/resume/resume-template-dto';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike','code-block',{ 'header': 1 }, { 'header': 2 },{ 'list': 'ordered'}, { 'list': 'bullet' },{ 'align': [] }],        // toggled buttons
    [{ 'size': ['small', false, 'large', 'huge'] },{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  ]
};


@Component({
  selector: 'form-bar',
  templateUrl: './form-bar.component.html',
  styleUrls: ['./form-bar.component.scss'],
})
export class FormBarComponent implements OnInit, OnDestroy {

  modules = modules;

  private destroy$ = new Subject<boolean>();
  @Input()
  public resumeForm: UntypedFormGroup = {} as UntypedFormGroup;
  @Input()
  public resume!: ResumeDto;
  @Input() isCreateForm: boolean = true;
  @Output() templateChange: EventEmitter<any> = new EventEmitter<any>();

  resumeTemplates!: ResumeTemplateDto[];

  file: File | null = null;
  positions!: PositionDto[];


  constructor(
    public dialog: MatDialog,
    private resumeService: ResumeService,
    private positionService: PositionService
  ) {
    positionService.getAllPositions().subscribe(positions => {
      this.positions = positions;
    });

    this.resumeService.getAllTemplates().subscribe(templates => this.resumeTemplates = templates);
  }

  changeTemplate(templateId: number) {
    this.templateChange.emit(templateId);
  }

  onSelectFile(event: any) {
    this.file = event.target.files[0];

    if (!this.isCreateForm) {

      this.resumeService.addPhoto(this.resume.id, this.file!).subscribe();

    } else {

      this.resumeService.createPhoto(this.file!).subscribe(image => {
        this.resumeForm.patchValue({imageId: image.id});
        this.resume.imageId = image.id
      });

    }
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
    (<UntypedFormArray>this.resumeForm.controls['skills']).clear();
    this.resume.skills?.forEach((skill) => {
      (<UntypedFormArray>this.resumeForm.controls['skills']).push(
        new UntypedFormGroup({
          id: new UntypedFormControl(skill.id),
          skillId: new UntypedFormControl(skill.skillId),
          skillName: new UntypedFormControl(skill.skillName),
          level: new UntypedFormControl(skill.level),
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
      data: {type: dialogType, data: data},
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
    (<UntypedFormArray>this.resumeForm.controls['languages']).clear();
    this.resume.languages?.forEach((languages) => {
      (<UntypedFormArray>this.resumeForm.controls['languages']).push(
        new UntypedFormGroup({
          id: new UntypedFormControl(languages.id),
          languageId: new UntypedFormControl(languages.languageId),
          languageName: new UntypedFormControl(languages.languageName),
          level: new UntypedFormControl(languages.level),
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
      data: {type: dialogType, data: data},
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
    (<UntypedFormArray>this.resumeForm.controls['educations']).clear();
    this.resume.educations
      ?.sort(
        (a: EducationDto, b: EducationDto) =>
          Date.parse(b.endDate) - Date.parse(a.endDate)
      )
      .forEach((education) => {
        (<UntypedFormArray>this.resumeForm.controls['educations']).push(
          new UntypedFormGroup({
            id: new UntypedFormControl(0),
            institutionName: new UntypedFormControl(education.institutionName),
            specialization: new UntypedFormControl(education.specialization),
            description: new UntypedFormControl(education.description),
            degree: new UntypedFormControl(education.degree),
            startDate: new UntypedFormControl(education.startDate),
            endDate: new UntypedFormControl(education.endDate),
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
      data: {type: dialogType, data: data},
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
    (<UntypedFormArray>this.resumeForm.controls['experiences']).clear();
    this.resume.experiences
      ?.sort(
        (a: ExperienceDto, b: ExperienceDto) =>
          Date.parse(b.endDate) - Date.parse(a.endDate)
      )
      .forEach((experience) => {
        (<UntypedFormArray>this.resumeForm.controls['experiences']).push(
          new UntypedFormGroup({
            id: new UntypedFormControl(0),
            position: new UntypedFormControl(experience.position),
            description: new UntypedFormControl(experience.description),
            company: new UntypedFormControl(experience.company),
            startDate: new UntypedFormControl(experience.startDate),
            endDate: new UntypedFormControl(experience.endDate),
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
      data: {type: dialogType, data: data},
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

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
