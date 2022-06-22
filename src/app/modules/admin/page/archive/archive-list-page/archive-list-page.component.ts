import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProposalListFilter } from 'src/app/models/proposal/proposal-list-filter';
import { SmallProposalDto } from '../../../../../models/proposal/small-proposal-dto';
import { ProposalService } from '../../../../../services/proposal.service';

@Component({
  selector: 'archive-list-page',
  templateUrl: './archive-list-page.component.html',
  styleUrls: ['./archive-list-page.component.scss'],
})
export class ArchiveListPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  proposals: SmallProposalDto[] = [];
  proposalsCount: number = 0;

  constructor(private proposalService: ProposalService) {
    this.proposalService.getArchiveProposals().pipe(
      takeUntil(this.destroy$)
    ).subscribe((proposals) => {
      this.proposals = proposals.items;
      this.proposalsCount = proposals.totalRecords;
    });
  }

  getArchiveProposals(filters: ProposalListFilter) {
    this.proposalService.getArchiveProposals(filters).pipe(
      takeUntil(this.destroy$)
    ).subscribe((proposals) => {
      this.proposals = proposals.items;
      this.proposalsCount = proposals.totalRecords;
    });
  }

  ngOnInit(): void {}
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
