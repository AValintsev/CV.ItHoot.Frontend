import {Component, OnInit} from '@angular/core';
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {ProposalService} from "../../../../../../services/proposal.service";
import {ProposalDto} from "../../../../../../models/proposal/proposal-dto";

@Component({
  selector: 'proposal-page',
  templateUrl: './proposal-page.component.html',
  styleUrls: ['./proposal-page.component.scss']
})
export class ProposalPageComponent implements OnInit {

  proposal:ProposalDto = {} as ProposalDto

  constructor(private route: ActivatedRoute, private proposalService:ProposalService) {
    this.route.params.pipe(map(params => params['id'])).subscribe(id => {
      this.proposalService.getProposalById(id).subscribe(proposal => this.proposal = proposal);
    });
  }

  ngOnInit(): void {

  }


}
