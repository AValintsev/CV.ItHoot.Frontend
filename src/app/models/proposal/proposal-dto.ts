import {UserDto} from "../user-dto";
import {StatusProposal} from "../enums";
import {SkillDto} from "../skill/skill-dto";
import {ProposalBuildDto} from "../proposal-build/proposal-build-dto";

export interface ProposalDto {
  id: number;
  clientId: number;
  client: UserDto;
  proposalBuild:ProposalBuildDto;
  proposalBuildId:number;
  statusProposal: StatusProposal;
  proposalName: string;
  resumes: ProposalResumeDto[];
  showLogo: boolean;
  showCompanyNames:boolean;
  isIncognito: boolean;
  resumeTemplateId:number;
  positionResumes?: Record<string, ProposalResumeDto[]>
}


export interface ProposalResumeDto {
  id: number;
  resumeId: number;
  statusResume: StatusProposalResume;
  resumeName: string;
  firstName: string;
  lastName: string;
  positionId:number;
  positionName:string;
  picture: string;
  shortUrl:string;
  salaryRate:number;
  skills: SkillDto[];
}

export enum StatusProposalResume {
  NotSelected = 1,
  Selected,
  Denied
}

export interface ProposalApprove {
  proposalId: number,
  resumes: ProposalApproveResume[]
}
export interface ProposalApproveResume {
  id: number,
  isSelected: boolean
}
