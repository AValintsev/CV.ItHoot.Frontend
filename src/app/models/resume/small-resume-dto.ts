import {AvailabilityStatus} from "../enums";
import {SkillDto} from "../skill/skill-dto";

export interface ResumeClientDto{
   firstName:string;
   lastName:string;
   clientId:number;
}

export interface SmallUserDto{
  fistName:string;
  lastName:string;
  userId:number;
}

export interface SmallResumeDto{
  id: number;
  resumeName: string;
  positionName:string;
  isDraft: true;
  firstName: string;
  lastName: string;
  picture: string;
  aboutMe:string;
  salaryRate:number;
  availabilityStatus: AvailabilityStatus;
  deletedAt: string | null;
  skills:SkillDto[];
  clients: ResumeClientDto[];
  shortUrlFullResume:string;
  shortUrlIncognito:string;
  shortUrlIncognitoWithoutLogo:string;
  createdBy: SmallUserDto;
  owner: SmallResumeDto;
}
