import {map, takeUntil} from 'rxjs/operators';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProposalService} from '../../../../../../services/proposal.service';
import {ProposalDto} from '../../../../../../models/proposal/proposal-dto';
import {Subject} from 'rxjs';

@Component({
  selector: 'proposal-page',
  templateUrl: './proposal-page.component.html',
  styleUrls: ['./proposal-page.component.scss'],
})
export class ProposalPage implements OnInit, OnDestroy {
  url = '/admin/proposals/'
  private destroy$ = new Subject<boolean>();
  proposal: ProposalDto = {} as ProposalDto;

  constructor(
    private route: ActivatedRoute,
    private proposalService: ProposalService,
    private cdRef: ChangeDetectorRef
  ) {
    this.route.params.pipe(map((params) => params['id'])).subscribe((id) => {
      this.proposalService
        .getProposalById(id).pipe(
          takeUntil(this.destroy$)
        )
        .subscribe((proposal) => (this.proposal = proposal));
    });
  }
  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }


  ngOnInit(): void {}
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
