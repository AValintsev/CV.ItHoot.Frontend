import { Component, OnInit } from '@angular/core';
import { ProposalListFilter } from 'src/app/models/proposal/proposal-list-filter';
import {SmallProposalDto} from "../../../../../../models/proposal/small-proposal-dto";
import {ProposalService} from "../../../../../../services/proposal.service";

@Component({
  selector: 'proposal-list-page',
  templateUrl: './proposal-list-page.component.html',
  styleUrls: ['./proposal-list-page.component.scss']
})
export class ProposalListPageComponent implements OnInit {
  proposals: SmallProposalDto[] = [];
  proposalsCount: number = 0;
  constructor(private proposalService:ProposalService) {
    this.proposalService.getAllProposals().subscribe(proposals => {
      this.proposals = proposals.items;
      this.proposalsCount = proposals.totalRecords
    });
  }


  ngOnInit(): void {
  }

  refreshProposals(filters: ProposalListFilter){
    this.proposalService.getAllProposals(filters).subscribe(proposals => {
      this.proposals = proposals.items;
      this.proposalsCount = proposals.totalRecords
    });
  }
}
