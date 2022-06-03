import {UserDto} from "../user-dto";
import {StatusTeam} from "../enums";
import {SkillDto} from "../skill/skill-dto";
import {TeamBuildDto} from "../teamBuild/teamBuild-dto";

export interface TeamDto {
  id: number;
  clientId: number;
  client: UserDto;
  teamBuild:TeamBuildDto;
  teamBuildId:number;
  statusTeam: StatusTeam;
  teamName: string;
  resumes: TeamResumeDto[];
  showLogo: true;
  showContacts: true;
  resumeTemplateId:number;
  positionResumes?: Record<string, TeamResumeDto[]>
}


export interface TeamResumeDto {
  id: number;
  resumeId: number;
  statusResume: StatusTeamResume;
  resumeName: string;
  firstName: string;
  lastName: string;
  positionId:number;
  positionName:string;
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
