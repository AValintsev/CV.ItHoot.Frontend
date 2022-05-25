import {UserDto} from "./user-dto";

export interface CreateTeamDto {
  teamName:string;
  clientId:number;
  resumes:CreateTeamResumeDto[];
}
export interface CreateTeamResumeDto {
  resumeId:number;
}




export interface TeamDto{
  id:number;
  clientId:number;
  client:UserDto;
  statusTeam:StatusTeam;
  teamName:string;
  resumes:TeamResumeDto[];

}

export interface TeamClientDto{
  userId:number;
  firstName:string;
  lastName:string;
}

export enum StatusTeam{
  Created=1,
  InReview,
  Approved,
  Done,
  Denied,
  InWorking
}
export interface TeamResumeDto{
  id:number;
  resumeId:number;
  statusResume:StatusTeamResume;
  resumeName:string;
  firstName:string;
  lastName:string;
}
export enum StatusTeamResume{
  NotSelected=1,
  Selected,
 Denied
}
