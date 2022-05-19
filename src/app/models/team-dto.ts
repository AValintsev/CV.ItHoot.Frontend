export interface TeamDto{
  teamName:string;
  resumes:CreateTeamResume[];
}

export interface CreateTeamResume{
  id:number;
  resumeId:number;
}
