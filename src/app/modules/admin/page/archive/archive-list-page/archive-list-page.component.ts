import {Component, OnInit} from '@angular/core';
import {SmallProposalDto} from "../../../../../models/proposal/small-proposal-dto";
import {ProposalService} from "../../../../../services/proposal.service";

@Component({
  selector: 'archive-list-page',
  templateUrl: './archive-list-page.component.html',
  styleUrls: ['./archive-list-page.component.scss']
})
export class ArchiveListPageComponent implements OnInit {

  proposals: SmallProposalDto[] = [];

  constructor(private proposalService:ProposalService) {
    this.proposalService.getArchiveProposals().subscribe(proposals => this.proposals = proposals);
  }

  getArchiveProposals(){
      this.proposalService.getArchiveProposals().subscribe(proposals=>this.proposals = proposals);
  }

  ngOnInit(): void {
  }

}
