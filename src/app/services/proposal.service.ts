import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpInternalService} from "./http-internal.service";
import {SmallProposalDto} from "../models/proposal/small-proposal-dto";
import {ProposalApprove, ProposalDto} from "../models/proposal/proposal-dto";


@Injectable({providedIn: 'root'})
export class ProposalService {
  private routePrefix: string = 'proposals'

  constructor(private httpService: HttpInternalService) {
  }

  public createProposal(proposal: ProposalDto): Observable<ProposalDto> {
    return this.httpService.postRequest<ProposalDto>(this.routePrefix, proposal);
  }
  public approveProposal(proposal: ProposalApprove): Observable<ProposalDto> {
    return this.httpService.postRequest<ProposalDto>(this.routePrefix+'/approve', proposal);
  }

  public updateProposal(proposal: ProposalDto): Observable<ProposalDto> {
    return this.httpService.putRequest<ProposalDto>(this.routePrefix, proposal);
  }

  public getAllProposals(): Observable<SmallProposalDto[]> {
    return this.httpService.getRequest<SmallProposalDto[]>(this.routePrefix);
  }

  public getProposalById(id:number):Observable<ProposalDto>{
    return this.httpService.getRequest<ProposalDto>(this.routePrefix+`/${id}`);
  }

  public getArchiveProposals():Observable<SmallProposalDto[]>{
    return this.httpService.getRequest<SmallProposalDto[]>(this.routePrefix+'/archive');
  }

  public getProposalResume(proposalId:number, resumeId:number):Observable<any>{
    return this.httpService.getRequest<any>(this.routePrefix+`/${proposalId}/resume/${resumeId}`);
  }

  public getProposalResumeHtml(proposalId:number, resumeId:number):Observable<any>{
    return this.httpService.getRequest<any>(this.routePrefix+`/${proposalId}/resume/${resumeId}/html`);
  }

  public getProposalResumeHtmlByUrl(shortUrl:string):Observable<any>{
    return this.httpService.getRequest<any>(this.routePrefix+`/resume/${shortUrl}`);
  }

  public getProposalResumePdf(proposalId:number, resumeId:number){
    return this.httpService.getFile(this.routePrefix+`/${proposalId}/resume/${resumeId}/pdf`);
  }

  public getProposalResumePdfByUrl(shortUrl:string){
    return this.httpService.getFile(this.routePrefix+`/resume/${shortUrl}/pdf`);
  }
}
