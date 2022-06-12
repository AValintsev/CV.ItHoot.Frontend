import {StatusProposal} from "../enums";

export interface SmallProposalDto {
  id:number;
  proposalName:string;
  clientUserName:string;
  showLogo:boolean;
  showContacts:boolean;
  propozalSize:number;
  lastUpdated:Date;
  createdUserName:string,
  statusProposal:StatusProposal;
}
