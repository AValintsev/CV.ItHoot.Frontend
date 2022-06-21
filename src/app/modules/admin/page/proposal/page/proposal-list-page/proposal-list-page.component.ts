import {Component, OnInit} from '@angular/core';
import {SmallProposalDto} from "../../../../../../models/proposal/small-proposal-dto";
import {ProposalService} from "../../../../../../services/proposal.service";

@Component({
  selector: 'proposal-list-page',
  templateUrl: './proposal-list-page.component.html',
  styleUrls: ['./proposal-list-page.component.scss']
})
export class ProposalListPageComponent implements OnInit {
  proposals: SmallProposalDto[] = [];
  constructor(private proposalService:ProposalService) {
    this.proposalService.getAllProposals().subscribe(proposals => this.proposals = proposals);
  }


  ngOnInit(): void {
  }

  refreshProposals(){
    this.proposalService.getAllProposals().subscribe(proposals => this.proposals = proposals);
  }
}
