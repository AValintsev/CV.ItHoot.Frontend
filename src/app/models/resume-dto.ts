export interface ResumeDto{
  id:0;
  showLogo:boolean;
  resumeName:string;
  picture:string;
  isDraft:boolean;
  firstName:string;
  lastName: string;
  position:PositionDto;
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
  languages: UserLanguageDto[];
}

export interface PositionDto{
  positionId:number;
  positionName:string;
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
  skillName:string;
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
  languageName:string;
  level:number;
}
