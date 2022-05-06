export interface ResumeDto{
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
  educations: Array<EducationDto>;
  experiences: Array<ExperienceDto>;
  skills: Array<SkillDto>;
  userLanguages: Array<UserLanguageDto>;
}

export interface EducationDto{
  id: 0;
  institutionName: string;
  specialization: string;
  degree: string;
  description: string;
  startDate: string;
  endDate:string;
}

export interface ExperienceDto{
  id: 0;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate:string;
}

export interface SkillDto{
  id: 0;
  name:string;
  level:number;
}

export interface UserLanguageDto{
  id: 0;
  name:string;
  level:number;
}

export interface SkillDto{
  id: 0;
  institutionName: string;
  specialization: string;
  degree: string;
  description: string;
  startDate: string;
  endDate:string;
}
