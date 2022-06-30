import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {SmallProposalDto} from '../../../../../../models/proposal/small-proposal-dto';
import {ProposalService} from '../../../../../../services/proposal.service';
import {ProposalListFilter} from '../../../../../../models/proposal/proposal-list-filter';

@Component({
  selector: 'proposal-list-page',
  templateUrl: './proposal-list-page.component.html',
  styleUrls: ['./proposal-list-page.component.scss'],
})
export class ProposalListPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  proposals: SmallProposalDto[] = [];
  proposalsCount: number = 0;

  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(private proposalService: ProposalService) {
  }

  ngOnInit(): void { }

  refreshProposals(filters: ProposalListFilter) {
    this.isLoadingResults = true;
    this.proposalService.getAllProposals(filters).pipe(
      map(data => {
        this.isLoadingResults = false;
        this.isRateLimitReached = data === null;

        if (data === null) {
          return [];
        }

        this.proposalsCount = data.totalRecords;
        return data.items;
      }),
      takeUntil(this.destroy$),
    )
      .subscribe(data => (this.proposals = data));
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
