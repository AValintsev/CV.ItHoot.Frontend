import {StatusTeam} from "../enums";

export interface SmallTeamDto{
  id:number;
  teamName:string;
  clientUserName:string;
  showLogo:boolean;
  showContacts:boolean;
  teamSize:number;
  lastUpdated:Date;
  createdUserName:string,
  statusTeam:StatusTeam;
}
