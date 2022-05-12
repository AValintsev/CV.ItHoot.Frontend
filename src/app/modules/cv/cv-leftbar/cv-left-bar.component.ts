import { AccountService } from 'src/app/services/account.service';
import { ResumeService } from 'src/app/services/resume.service';
import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SkillDialog} from "../skill-dialog/skill-dialog.component";
import {EducationDto, ExperienceDto, ResumeDto, SkillDto, UserLanguageDto} from "../../../models/resume-dto";
import {DialogType} from "../../../models/dialog-type";
import {LanguageDialog} from "../language-dialog/language-dialog.component";
import {EducationDialog} from "../education-dialog/education-dialog.component";
import {ExperienceDialog} from "../experience-dialog/experience-dialog.component";


@Component({
  selector: 'app-cv-create-left-bar',
  templateUrl: './cv-left-bar.component.html',
  styleUrls: ['./cv-left-bar.component.scss'],
})

export class CvLeftBarComponent implements OnInit {
  @Input()
  public resumeForm: FormGroup = {} as FormGroup;
  @Input()
  public resume: ResumeDto = {} as ResumeDto;

  constructor(
    public dialog: MatDialog,
    private resumeService: ResumeService,
    private accountService: AccountService,
    ) {
  }

  ngOnInit(): void{
    this.listSkillsChanged();
    this.listLanguageChanged();
    this.experienceListChanged();
    this.educationListChanged();
  }

  addPicture(picture:any){
    const userId = this.accountService.getUserId()
    if(userId!==null){
      this.resumeService.addPhoto(+userId,picture).subscribe({
        next:next=>console.log(next),
        error:error=>console.log(error)
      })
    }
    
  }
  getPhoto(){
    this.resumeService.getPhoto(3).subscribe({
      next: next => console.log(next),
      error: error => console.log(error)
    })
  }
  removeSkill(skill: SkillDto): void {
    const index = this.resume.skills.indexOf(skill);
    if (index >= 0) {
      this.resume.skills.splice(index, 1);
      this.listSkillsChanged()
    }
  }
  listSkillsChanged():void{
    (<FormArray>this.resumeForm.controls["skills"]).clear();
    this.resume.skills?.forEach(skill =>{
      (<FormArray>this.resumeForm.controls["skills"])
        .push(new FormGroup({
          id: new FormControl(skill.id),
          skillId: new FormControl(skill.skillId),
          name: new FormControl(skill.name),
          level: new FormControl(skill.level)
        }));
    })
  }
  openSkillDialog(skill:SkillDto|null = null): void {
    let data:SkillDto;
    let dialogType:DialogType;
    if(skill == null){
      data = {} as SkillDto;
      dialogType = DialogType.Create;
    }
    else{
      data = skill;
      dialogType = DialogType.Edit;
    }

    const dialogRef = this.dialog.open(SkillDialog, {
      width: '600px',
      autoFocus: false,
      data: {type: dialogType, data:data},
    });

    dialogRef.afterClosed().subscribe((skill: SkillDto) => {
      if (skill == null)
        return;

      let skillDto = this.resume.skills.find(e => e.name == skill.name);
      if (skillDto != null)
        skillDto = skill;
      else
        this.resume.skills.push(skill);

      this.listSkillsChanged()
    });
  }

  removeLanguage(language:UserLanguageDto){
    const index = this.resume.userLanguages.indexOf(language);
    if (index >= 0) {
      this.resume.userLanguages.splice(index, 1);
      this.listLanguageChanged()
    }
  }
  listLanguageChanged():void{
    (<FormArray>this.resumeForm.controls["userLanguages"]).clear();
    this.resume.userLanguages?.forEach(languages =>{
      (<FormArray>this.resumeForm.controls["userLanguages"])
        .push(new FormGroup({
          id: new FormControl(languages.id),
          languageId: new FormControl(languages.languageId),
          name: new FormControl(languages.name),
          level: new FormControl(languages.level)
        }));
    })
  }
  openLanguageDialog(language: UserLanguageDto|null = null) {
    let data:UserLanguageDto;
    let dialogType:DialogType;
    if(language == null){
      data = {} as UserLanguageDto;
      dialogType = DialogType.Create;
    }
    else{
      data = language;
      dialogType = DialogType.Edit;
    }

    const dialogRef = this.dialog.open(LanguageDialog, {
      width: '600px',
      autoFocus: false,
      data: {type: dialogType, data:data},
    });

    dialogRef.afterClosed().subscribe((language: UserLanguageDto) => {
      if (language == null)
        return;
      let languageDto = this.resume.userLanguages.find(e => e.name == language.name);
      if (languageDto != null)
        languageDto = language;
      else
        this.resume.userLanguages.push(language);

      this.listLanguageChanged()
    });
  }

  removeEducation(education: EducationDto) {
    const index = this.resume.educations.indexOf(education);
    if (index >= 0) {
      this.resume.educations.splice(index, 1);
      this.educationListChanged()
    }
  }
  educationListChanged() {
    console.log('start',this.resume.educations);
    (<FormArray>this.resumeForm.controls["educations"]).clear();
    const arr = this.resume.educations?.sort((a: EducationDto, b: EducationDto) => Date.parse(a.startDate) - Date.parse(b.startDate))
   arr.forEach(education =>{
      (<FormArray>this.resumeForm.controls["educations"])
        .push(new FormGroup({
          id: new FormControl(education.id),
          institutionName: new FormControl(education.institutionName),
          specialization: new FormControl(education.specialization),
          description: new FormControl(education.description),
          degree: new FormControl(education.degree),
          startDate: new FormControl(education.startDate),
          endDate: new FormControl(education.endDate),
        }));
    })
    console.log('start', this.resume.educations);
  }
  openEducationDialog(education:EducationDto|null = null){
    let data:EducationDto;
    let dialogType:DialogType;
    if(education == null){
      data = {} as EducationDto;
      dialogType = DialogType.Create;
    }
    else{
      data = education;
      dialogType = DialogType.Edit;
    }

    const dialogRef = this.dialog.open(EducationDialog, {
      width: '650px',
      autoFocus: false,
      data: {type: dialogType, data:data},
    });

    dialogRef.afterClosed().subscribe((education: EducationDto) => {
      if (education == null)
        return;
      let educationDto = this.resume.educations.find(e => e.id  == education.id);
      if (educationDto != null){
        this.removeEducation(educationDto);
      }
      else
      {
        education.id = this.resume.educations.length;
      }
      this.resume.educations.push(education);
      this.educationListChanged()
    });
  }

  removeExperience(experience: ExperienceDto) {
    const index = this.resume.experiences.indexOf(experience);
    if (index >= 0) {
      this.resume.experiences.splice(index, 1);
      this.experienceListChanged()
    }
  }
  experienceListChanged() {
    (<FormArray>this.resumeForm.controls["experiences"]).clear();
    this.resume.experiences?.sort((a: ExperienceDto, b: ExperienceDto)=>Date.parse(a.startDate) - Date.parse(b.startDate)).forEach(experience =>{
      (<FormArray>this.resumeForm.controls["experiences"])
        .push(new FormGroup({
          id: new FormControl(experience.id),
          position: new FormControl(experience.position),
          description: new FormControl(experience.description),
          company: new FormControl(experience.company),
          startDate: new FormControl(experience.startDate),
          endDate: new FormControl(experience.endDate),
        }));
    })
  }
  openExperienceDialog(experience: ExperienceDto| null = null) {
    let data:ExperienceDto;
    let dialogType:DialogType;
    if(experience == null){
      data = {} as ExperienceDto;
      dialogType = DialogType.Create;
    }
    else{
      data = experience;
      dialogType = DialogType.Edit;
    }

    const dialogRef = this.dialog.open(ExperienceDialog, {
      width: '700px',
      autoFocus: false,
      data: {type: dialogType, data:data},
    });

    dialogRef.afterClosed().subscribe((experience: ExperienceDto) => {
      if (experience == null)
        return;
      let experienceDto = this.resume.experiences.find(e => e.id  == experience.id);
      if (experienceDto != null){
        this.removeExperience(experienceDto);
      }
      else
      {
        experience.id = this.resume.experiences.length;
      }
      this.resume.experiences.push(experience);
      this.experienceListChanged()
    });
  }


}
