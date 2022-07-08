import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProposalListFilter} from 'src/app/models/proposal/proposal-list-filter';
import {SmallProposalDto} from '../../../../../models/proposal/small-proposal-dto';
import {ProposalService} from '../../../../../services/proposal.service';

@Component({
  selector: 'proposal-archive-list-page',
  templateUrl: './proposal-archive-list-page.component.html',
  styleUrls: ['./proposal-archive-list-page.component.scss'],
})
export class ProposalArchiveListPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  proposals: SmallProposalDto[] = [];
  proposalsCount: number = 0;
  url = '/admin/archive/'
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(private proposalService: ProposalService) {
  }

  getArchiveProposals(filters: ProposalListFilter) {
    this.isLoadingResults = true;
    this.proposalService.getArchiveProposals(filters).pipe(
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

  ngOnInit(): void { }
  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
