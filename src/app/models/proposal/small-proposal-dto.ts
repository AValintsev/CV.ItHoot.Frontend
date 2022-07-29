import {StatusProposal} from "../enums";
import {PositionDto} from "../position/position-dto";

export interface SmallProposalDto {
  id:number;
  proposalName:string;
  clientUserName:string;
  showLogo:boolean;
  showCompanyNames:boolean;
  proposalSize:number;
  lastUpdated:Date;
  positions:PositionDto[];
  createdUserName:string,
  statusProposal:StatusProposal;
}
