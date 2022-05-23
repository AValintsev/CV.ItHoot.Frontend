export interface TeamDto {
  teamName:string;
  clientId:number;
  resumes:TeamResumeDto[];
}
export interface TeamResumeDto {
  resumeId:number;
}
