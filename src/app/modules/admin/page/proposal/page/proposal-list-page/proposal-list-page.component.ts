import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SmallProposalDto } from '../../../../../../models/proposal/small-proposal-dto';
import { ProposalService } from '../../../../../../services/proposal.service';
import { ProposalListFilter } from '../../../../../../models/proposal/proposal-list-filter';

@Component({
  selector: 'proposal-list-page',
  templateUrl: './proposal-list-page.component.html',
  styleUrls: ['./proposal-list-page.component.scss'],
})
export class ProposalListPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  proposals: SmallProposalDto[] = [];
  proposalsCount: number = 0;
  constructor(private proposalService: ProposalService) {
    this.proposalService.getAllProposals().subscribe((proposals) => {
      this.proposals = proposals.items;
      this.proposalsCount = proposals.totalRecords;
    });
  }

  ngOnInit(): void {}

  refreshProposals(filters: ProposalListFilter) {
    this.proposalService.getAllProposals(filters).pipe(
      takeUntil(this.destroy$)
    ).subscribe((proposals) => {
      this.proposals = proposals.items;
      this.proposalsCount = proposals.totalRecords;
    });
  }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
