export interface ResumeDto{
  [key:string]:any;
  id:0;
  cvName:string;
  isDraft:boolean;
  firstName:string;
  lastName: string;
  email: string;
  site: string;
  phone: string;
  code: string;
  country: string;
  city: string;
  street: string;
  requiredPosition: string;
  birthdate: string;
  aboutMe: string;
  educations: EducationDto[];
  experiences: ExperienceDto[];
  skills: SkillDto[];
  userLanguages: UserLanguageDto[];
}

export interface EducationDto{
  id: number;
  institutionName: string;
  specialization: string;
  degree: string;
  description: string;
  startDate: string;
  endDate:string;
}

export interface ExperienceDto{
  id: number;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate:string;
}

export interface SkillDto{
  id: number;
  skillId:number;
  name:string;
  level:number;
}

export interface SkillTestDto{
  id: number;
  name:string;
}

export interface LanguageTestDto {
  id: number;
  name:string;
}

export interface UserLanguageDto{
  id: number;
  languageId:number;
  name:string;
  level:number;
}
