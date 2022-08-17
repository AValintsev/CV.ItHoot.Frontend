import {ResumeDto} from "../../models/resume/resume-dto";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Injectable} from "@angular/core";
import {ExperienceDto} from "../../models/resume/experience-dto";

@Injectable({providedIn: 'root'})
export class ResumeFormBuilderService {


  buildResumeForm (): FormGroup {
    const resume = {} as ResumeDto;
    return new FormGroup({
      id: new FormControl(resume.id, [
      ]),
      resumeName: new FormControl(resume.resumeName, [
        Validators.required,
      ]),
      firstName: new FormControl(resume.firstName, [
        Validators.required,
      ]),
      lastName: new FormControl(resume.lastName, [
        Validators.required,
      ]),
      position: new FormControl(resume.position, [
        Validators.required,
      ]),
      email: new FormControl(resume.email, [
        Validators.required,
        Validators.email,
      ]),
      site: new FormControl(resume.site),
      phone: new FormControl(resume.phone, [
        Validators.pattern('[- +()0-9]+'), Validators.minLength(10),
      ]),
      code: new FormControl(resume.code),
      country: new FormControl(resume.country, [
        Validators.required,
      ]),
      city: new FormControl(resume.city, [Validators.required]),
      street: new FormControl(resume.street, [
        Validators.required,
      ]),
      requiredPosition: new FormControl(resume.requiredPosition, [
        Validators.required,
      ]),
      birthdate: new FormControl(resume.birthdate, [
        Validators.required,
      ]),
      aboutMe: new FormControl(resume.aboutMe, [
        Validators.required,
      ]),
      resumeTemplateId: new FormControl(resume.resumeTemplateId, [
        Validators.required,
      ]),
      imageId: new FormControl(resume.imageId),
      picture: new FormControl(resume.picture),
      salaryRate: new FormControl(resume?.salaryRate),
      availabilityStatus: new FormControl(resume?.availabilityStatus),
      countDaysUnavailable: new FormControl(resume?.countDaysUnavailable),
      educations: new FormArray([]),
      experiences: new FormArray([]),
      skills: new FormArray([]),
      languages: new FormArray([]),
    });
  }

  patchForm(resume: ResumeDto, resumeForm: FormGroup) {
    (<FormArray>resumeForm.controls['skills']).clear();
    (<FormArray>resumeForm.controls['languages']).clear();
    (<FormArray>resumeForm.controls['educations']).clear();
    (<FormArray>resumeForm.controls['experiences']).clear();
    resumeForm.patchValue({id: resume.id});
    resumeForm.patchValue({resumeName: resume.resumeName});
    resumeForm.patchValue({firstName: resume.firstName});
    resumeForm.patchValue({lastName: resume.lastName});
    resumeForm.patchValue({email: resume.email});
    resumeForm.patchValue({site: resume.site});
    resumeForm.patchValue({phone: resume.phone});
    resumeForm.patchValue({code: resume.code});
    resumeForm.patchValue({country: resume.country});
    resumeForm.patchValue({city: resume.city});
    resumeForm.patchValue({street: resume.street});
    resumeForm.patchValue({requiredPosition: resume.requiredPosition,});
    resumeForm.patchValue({birthdate: resume.birthdate});
    resumeForm.patchValue({aboutMe: resume.aboutMe});
    resumeForm.patchValue({picture: resume.picture});
    resumeForm.patchValue({position: resume.position});
    resumeForm.patchValue({salaryRate: resume.salaryRate});
    resumeForm.patchValue({resumeTemplateId: resume.resumeTemplateId});
    resumeForm.patchValue({availabilityStatus: resume.availabilityStatus});
    resumeForm.patchValue({countDaysUnavailable: resume.countDaysUnavailable});

    resume.experiences = resume.experiences.sort((a, b) => Date.parse(b.startDate) - Date.parse(a.startDate))
    resume.educations = resume.educations.sort((a, b) => Date.parse(b.startDate) - Date.parse(a.startDate))


    resume.skills?.forEach((skill) => {
      (<FormArray>resumeForm.controls['skills']).push(
        new FormGroup({
          id: new FormControl(skill.id),
          skillId: new FormControl(skill.skillId),
          skillName: new FormControl(skill.skillName),
          level: new FormControl(skill.level),
        })
      );
    });

    resume.languages?.forEach((languages) => {
      (<FormArray>resumeForm.controls['languages']).push(
        new FormGroup({
          id: new FormControl(languages.id),
          languageId: new FormControl(languages.languageId),
          languageName: new FormControl(languages.languageName),
          level: new FormControl(languages.level),
        })
      );
    });

    resume.educations?.forEach((education) => {
      (<FormArray>resumeForm.controls['educations']).push(
        new FormGroup({
          id: new FormControl(education.id),
          institutionName: new FormControl(education.institutionName),
          specialization: new FormControl(education.specialization),
          description: new FormControl(education.description,),
          degree: new FormControl(education.degree),
          startDate: new FormControl(education.startDate),
          endDate: new FormControl(education.endDate),
        })
      );
    });

    resume.experiences?.forEach((experience) => {
      (<FormArray>resumeForm.controls['experiences']).push(
        new FormGroup({
          id: new FormControl(experience.id),
          position: new FormControl(experience.position),
          description: new FormControl(experience.description),
          company: new FormControl(experience.company),
          startDate: new FormControl(experience.startDate),
          endDate: new FormControl(experience.endDate),
        })
      );
    });
  }

}
