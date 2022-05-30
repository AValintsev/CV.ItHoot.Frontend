import {ResumeSkillDto} from "./resume-skill-dto";
import {PositionDto} from "../position/position-dto";
import {ResumeLanguageDto} from "./resume-language-dto";
import {ExperienceDto} from "./experience-dto";
import {EducationDto} from "./education-dto";

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
  skills: ResumeSkillDto[];
  languages: ResumeLanguageDto[];
}











