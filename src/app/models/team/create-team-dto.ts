import {UserDto} from "../user-dto";
import {StatusTeam} from "../enums";
import {SkillDto} from "../skill/skill-dto";
import {ResumeTemplateDto} from "../resume/resume-template-dto";

export interface TeamDto {
  id: number;
  clientId: number;
  client: UserDto;
  statusTeam: StatusTeam;
  teamName: string;
  resumes: TeamResumeDto[];
  showLogo: true;
  showContacts: true;
  resumeTemplateId:number;
}


export interface TeamResumeDto {
  id: number;
  resumeId: number;
  statusResume: StatusTeamResume;
  resumeName: string;
  firstName: string;
  lastName: string;
  picture: string
  skills: SkillDto[];
}

export enum StatusTeamResume {
  NotSelected = 1,
  Selected,
  Denied
}

export interface TeamApprove {
  teamId: number,
  resumes: TeamApproveResume[]
}
export interface TeamApproveResume {
  id: number,
  isSelected: boolean
}