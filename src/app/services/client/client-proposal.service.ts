import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { ProposalDto, ProposalResumeDto } from 'src/app/models/proposal/proposal-dto';
import { ProposalService } from '../proposal.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { SmallProposalDto } from 'src/app/models/proposal/small-proposal-dto';
import { ObserversModule } from '@angular/cdk/observers';
import { PagedResponse } from 'src/app/models/paginations/paged-response';

@Injectable()

export class ClientProposalService implements OnInit {
	Map: any = new Map()
	resumes: any;
	public headerTitle$ = new BehaviorSubject<string|null>("You proposal")
	private headerProposal = new BehaviorSubject<any>(null)
	public numberCheckedResume$ = new BehaviorSubject<{
		proposalId:number,
		resumeId:number
}|null>(null)
	public headerUsersProposal$ = this.headerProposal.asObservable()
	private proposal$ = new BehaviorSubject<any>(this.proposalService.getAllProposals().pipe(
		switchMap(cards => this.getProposalById(cards.items[0].id)))
	)
	constructor(
		private proposalService: ProposalService
	) {

	}
	ngOnInit() {

	}
	changeProposal(value: number) {
		this.proposal$.next(this.getProposalById(value))
	}
	getProposal() {
		return this.proposal$
	}
	getAllProposal(): Observable<PagedResponse<SmallProposalDto[]>> {
		return this.proposalService.getAllProposals()
	}
	getProposalById(value: number) {
		return this.proposalService.getProposalById(value).pipe(
			map(array => {
				array.resumes.forEach((resume: any, index: number) => {
					if (this.Map.get(resume.positionName)) {
						const resumes = this.Map.get(resume.positionName)
						resumes.push(resume)
						this.Map.set(resume.positionName, resumes)
					} else {
						this.Map.set(resume.positionName, [resume])
					}
				})
				array.positionResumes = [...this.Map] as any
				this.Map.clear()
				return array

			}),
			tap(elem => {
				this.headerProposal.next(elem)
			})
		)
	}
}
