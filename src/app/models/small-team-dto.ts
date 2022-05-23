import {StatusTeam} from "./create-team-dto";

export interface SmallTeamDto{
  id:number;
  teamName:string;
  clientUserName:string;
  teamSize:number;
  lastUpdated:Date;
  createdUserName:string,
  statusTeam:StatusTeam;
}
