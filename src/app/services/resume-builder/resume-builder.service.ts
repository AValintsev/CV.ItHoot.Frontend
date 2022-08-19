import {ResumeLanguageDto} from "../../models/resume/resume-language-dto";
import {DialogType} from "../../models/enums";
import {MatDialog} from "@angular/material/dialog";
import {ResumeDto} from "../../models/resume/resume-dto";
import {FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {ResumeSkillDto} from "../../models/resume/resume-skill-dto";
import {EducationDto} from "../../models/resume/education-dto";
import {ExperienceDto} from "../../models/resume/experience-dto";
import {SkillDialog} from "../../modules/shared/resume/skill-dialog/skill-dialog.component";
import {LanguageDialog} from "../../modules/shared/resume/language-dialog/language-dialog.component";
import {EducationDialog} from "../../modules/shared/resume/education-dialog/education-dialog.component";
import {ExperienceDialog} from "../../modules/shared/resume/experience-dialog/experience-dialog.component";


export class ResumeBuilderService {

  constructor(private resume: ResumeDto,
              private resumeForm: FormGroup,
              private dialog: MatDialog,
  ) {}


  removeSkill(skill: ResumeSkillDto): void {
    const skillDto = this.resume.skills.find(e => e.skillId == skill.skillId);

    if (skillDto == null) return;

    const index = this.resume.skills.indexOf(skillDto);

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

    dialogRef.afterClosed().subscribe((skillDialog: ResumeSkillDto) => {

      if (skillDialog == null) return;

      let skillDto = this.resume.skills.find(skl => skl.skillId == skillDialog.skillId || skl.skillName == skillDialog.skillName);

      if (skillDto == null)

        if (dialogType == DialogType.Create)
          this.resume.skills.push(skillDialog);

        else if (dialogType == DialogType.Edit) {
          const resumeSkill = this.resume.skills.find(skl => skl.id == skillDialog.id)
          resumeSkill!.skillId = skillDialog.skillId;
          resumeSkill!.skillName = skillDialog.skillName;
          resumeSkill!.level = skillDialog.level;
        }

      this.listSkillsChanged();


    });
  }

  removeLanguage(language: ResumeLanguageDto) {
    const languageDto = this.resume.languages.find(e => e.languageId == language.languageId);

    if (languageDto == null) return;

    const index = this.resume.languages.indexOf(languageDto);

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
    let dialogType: DialogType;
    if (language == null) {
      language = {} as ResumeLanguageDto;
      dialogType = DialogType.Create;
    } else {;
      dialogType = DialogType.Edit;
    }

    const dialogRef = this.dialog.open(LanguageDialog, {
      width: '600px',
      autoFocus: false,
      data: {type: dialogType, data: language},
    });

    dialogRef.afterClosed().subscribe((languageDialog: ResumeLanguageDto) => {

      if (languageDialog == null) return;

      let languageDto = this.resume.languages.find(lng => lng.languageId == languageDialog.languageId ||
        lng.languageName == languageDialog.languageName);

      if (languageDto == null)

        if (dialogType == DialogType.Create)
          this.resume.languages.push(languageDialog);

        else if (dialogType == DialogType.Edit) {
          const resumeLanguage = this.resume.languages.find(lng => lng.id == languageDialog.id)
          resumeLanguage!.languageId = languageDialog.languageId;
          resumeLanguage!.languageName = languageDialog.languageName;
          resumeLanguage!.level = languageDialog.level;
        }

      this.listLanguageChanged();

    });
  }

  removeEducation(education: EducationDto) {

    const educationDto = this.resume.educations.find(e => e.id == education.id);

    if (educationDto == null) return;

    const index = this.resume.educations.indexOf(educationDto);

    if (index >= 0) {
      this.resume.educations.splice(index, 1);
      this.educationListChanged();
    }
  }

  educationListChanged() {
    (<UntypedFormArray>this.resumeForm.controls['educations']).clear();

    this.resume.educations = this.resume.educations.sort((a, b) =>
      Date.parse(b.endDate) - Date.parse(a.endDate) || Date.parse(a.startDate) - Date.parse(b.startDate))
    this.resume.educations
      .forEach((education) => {
        (<UntypedFormArray>this.resumeForm.controls['educations']).push(
          new UntypedFormGroup({
            id: new UntypedFormControl(education?.id ?? 0),
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
    let dialogType: DialogType;
    if (education == null) {
      education = {} as EducationDto;
      dialogType = DialogType.Create;
    } else {
      dialogType = DialogType.Edit;
    }
    const dialogRef = this.dialog.open(EducationDialog, {
      width: '700px',
      autoFocus: false,
      data: {type: dialogType, data: education},
    });

    dialogRef.afterClosed().subscribe((education: EducationDto) => {

      if (education == null) return;
      let educationDto = this.resume.educations.find((e) => e.id == education.id);
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
    const experienceDto = this.resume.experiences.find(e => e.id == experience.id);

    if (experienceDto == null) return;

    const index = this.resume.experiences.indexOf(experienceDto);

    if (index >= 0) {
      this.resume.experiences.splice(index, 1);
      this.experienceListChanged();
    }
  }

  experienceListChanged() {
    (<UntypedFormArray>this.resumeForm.controls['experiences']).clear();

    this.resume.experiences = this.resume.experiences.sort((a, b) =>
      Date.parse(b.endDate) - Date.parse(a.endDate) || Date.parse(a.startDate) - Date.parse(b.startDate))
    this.resume.experiences
      .forEach((experience) => {
        (<UntypedFormArray>this.resumeForm.controls['experiences']).push(
          new UntypedFormGroup({
            id: new UntypedFormControl(experience?.id ?? 0),
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
    let dialogType: DialogType;
    if (experience == null) {
      experience = {} as ExperienceDto;
      dialogType = DialogType.Create;
    } else {
      dialogType = DialogType.Edit;
    }

    const dialogRef = this.dialog.open(ExperienceDialog, {
      width: '700px',
      autoFocus: false,
      data: {type: dialogType, data: experience},
    });

    dialogRef.afterClosed().subscribe(experience => {
      if (experience == null) return;

      let experienceDto = this.resume.experiences.find((e) => e.id == experience.id);
      if (experienceDto != null) {
        this.removeExperience(experienceDto);
      } else {
        experience.id = this.resume.experiences.length;
      }


      this.resume.experiences.push(experience);
      this.experienceListChanged();
    });
  }

  howOld(birthDay: string) {
    const today = new Date();
    const birthDate = new Date(birthDay);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }


  getYear(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const month = (end.getMonth()) - (start.getMonth());
    let year = end.getFullYear() - start.getFullYear()
    if (month < 0) {
      year = year - 1;
    }
    // if (month <= 0 && year <= 0) {
    //   return ''
    // }
    return year;
  }

  getMonth(startDate: string, endDate: string) {

    const start: Date = new Date(startDate);
    const end: Date = new Date(endDate);
    const month = (end.getMonth()) - (start.getMonth());
    const year = end.getFullYear() - start.getFullYear()
    // if (month <= 0 && year <= 0) {
    //   return ''
    // }
    if (month < 0) {
      return 12 + month;
    } else {
      return month
    }
  }


}
