import {map, takeUntil} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Subject} from 'rxjs';
import { ProposalDto } from 'src/app/models/proposal/proposal-dto';
import { ProposalService } from 'src/app/services/proposal.service';


@Component({
  selector: 'proposal-page',
  templateUrl: './proposal-archive-page.component.html',
  styleUrls: ['./proposal-archive-page.component.scss'],
})
export class ProposalArchivePageComponent implements OnInit, OnDestroy {
  url = '/admin/archive/proposals/'
  private destroy$ = new Subject<boolean>();
  proposal: ProposalDto = {} as ProposalDto;

  constructor(
    private route: ActivatedRoute,
    private proposalService: ProposalService
  ) {
    this.route.params.pipe(map((params) => params['id'])).subscribe((id) => {
      this.proposalService
        .getProposalById(id).pipe(
          takeUntil(this.destroy$)
        )
        .subscribe((proposal) => (this.proposal = proposal));
    });
  }

  ngOnInit(): void {}
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
