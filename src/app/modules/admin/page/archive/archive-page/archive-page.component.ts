import { Component, OnInit } from '@angular/core';
import {ProposalDto} from "../../../../../models/proposal/proposal-dto";
import {ActivatedRoute} from "@angular/router";
import {ProposalService} from "../../../../../services/proposal.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'archive-page',
  templateUrl: './archive-page.component.html',
  styleUrls: ['./archive-page.component.scss']
})
export class ArchivePageComponent implements OnInit {

  proposal:ProposalDto = {} as ProposalDto

  constructor(private route: ActivatedRoute, private proposalService:ProposalService) {
    this.route.params.pipe(map(params => params['id'])).subscribe(id => {
      this.proposalService.getProposalById(id).subscribe(proposal => this.proposal = proposal);
    });
  }

  ngOnInit(): void {
  }

}
