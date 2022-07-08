import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {ProposalService} from '../proposal.service';
import {map, share, switchMap, tap} from 'rxjs/operators';
import {SmallProposalDto} from 'src/app/models/proposal/small-proposal-dto';
import {PagedResponse} from 'src/app/models/paginations/paged-response';

@Injectable({
  providedIn: 'root'
})
export class ClientProposalService implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  Map: any = new Map();
  resumes: any;
  public headerTitle$ = new BehaviorSubject<string | null>('You proposal');
  public showLogo$ = new BehaviorSubject<boolean>(false);
  public headerProposal = new BehaviorSubject<any>(null);
  public numberCheckedResume$ = new BehaviorSubject<{
    proposalId: number;
    resumeId: number;
  } | null>(null);
  // public headerUsersProposal$ = this.headerProposal.asObservable()
  allProposals$:Observable<PagedResponse<SmallProposalDto[]>>
  private proposal$ = new BehaviorSubject<any>(
    this.proposalService
      .getAllProposals()
      .pipe(switchMap((cards) => this.getProposalById(cards.items[0].id)))
  );
  constructor(private proposalService: ProposalService) {}
  ngOnInit() {
	this.allProposals$ = this.proposalService.getAllProposals().pipe(share())
  }
  changeProposal(value: number) {
    localStorage.setItem('proposalNumber',value.toString())
    const state = localStorage.getItem('proposalNumber')
    if (state){
      const number = parseInt(state)
      this.proposal$.next(this.getProposalById(number));
    }
  }
  getProposal() {
    const state = localStorage.getItem('proposalNumber')
    if (state) {
      const number = parseInt(state)
      this.proposal$.next(this.getProposalById(number));
    }
    return this.proposal$;
  }
  getAllProposal(): Observable<PagedResponse<SmallProposalDto[]>> {
    return this.proposalService.getAllProposals().pipe(share());
  }
  getProposalById(value: number) {
    return this.proposalService.getProposalById(value).pipe(
      map((array) => {
        array.resumes.forEach((resume: any, index: number) => {
          if (this.Map.get(resume.positionName)) {
            const resumes = this.Map.get(resume.positionName);
            resumes.push(resume);
            this.Map.set(resume.positionName, resumes);
          } else {
            this.Map.set(resume.positionName, [resume]);
          }
        });
        array.positionResumes = [...this.Map] as any;
        this.Map.clear();
        return array;
      }),
      tap((elem) => {
        this.headerProposal.next(elem);
      })
    );
  }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
