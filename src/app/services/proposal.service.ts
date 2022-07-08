import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpInternalService} from "./http-internal.service";
import {SmallProposalDto} from "../models/proposal/small-proposal-dto";
import {ProposalApprove, ProposalDto} from "../models/proposal/proposal-dto";
import {ProposalListFilter} from 'src/app/models/proposal/proposal-list-filter';
import {PagedResponse} from 'src/app/models/paginations/paged-response';


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

  public getAllProposals(filters: ProposalListFilter | null = null): Observable<PagedResponse<SmallProposalDto[]>> {
    if (filters == null) {
      return this.httpService.getRequest<PagedResponse<SmallProposalDto[]>>(this.routePrefix);
    }
    else {

      let pageNumber = 1;
      if (filters.page && filters.page > 0) {
        pageNumber = filters.page + 1;
      }

      let requestUrl = `${this.routePrefix}?term=${filters.term ?? ''}&sort=${filters.sort ?? ''}`+
                        `&order=${filters.order ?? ''}&page=${pageNumber}&pageSize=${filters.pageSize}`;

      if (filters.clients) {
        filters.clients.forEach(item => {
          requestUrl = `${requestUrl}&clients=${item}`
        });
      }

      if(filters.statuses) {
        filters.statuses.forEach(item => {
          requestUrl = `${requestUrl}&statuses=${item}`
        });
      }
      return this.httpService.getRequest<PagedResponse<SmallProposalDto[]>>(requestUrl);
    }
  }

  public getProposalById(id:number):Observable<ProposalDto>{
    return this.httpService.getRequest<ProposalDto>(this.routePrefix+`/${id}`);
  }

  public getArchiveProposals(filters: ProposalListFilter | null = null): Observable<PagedResponse<SmallProposalDto[]>>{
    if (filters == null) {
      return this.httpService.getRequest<PagedResponse<SmallProposalDto[]>>(this.routePrefix+'/archive');
    }
    else {
      let pageNumber = 1;
      if (filters.page && filters.page > 0) {
        pageNumber = filters.page + 1;
      }
      let requestUrl = `${this.routePrefix}/archive?term=${filters.term ?? ''}&sort=${filters.sort ?? ''}`+
                        `&order=${filters.order ?? ''}&page=${pageNumber}&pageSize=${filters.pageSize}`;

      if (filters.clients) {
        filters.clients.forEach(item => {
          requestUrl = `${requestUrl}&clients=${item}`
        });
      }

      if(filters.statuses) {
        filters.statuses.forEach(item => {
          requestUrl = `${requestUrl}&statuses=${item}`
        });
      }
      return this.httpService.getRequest<PagedResponse<SmallProposalDto[]>>(requestUrl);
    }
  }

  public getProposalResume(proposalId:number, resumeId:number):Observable<any>{
    return this.httpService.getRequest<any>(this.routePrefix+`/${proposalId}/resume/${resumeId}`);
  }

  public getProposalResumeHtml(proposalId:number, resumeId:number):Observable<any>{
    return this.httpService.getRequest<any>(this.routePrefix+`/${proposalId}/resume/${resumeId}/html`);
  }

  public getProposalResumeByUrl(shortUrl:string):Observable<any>{
    return this.httpService.getRequest<any>(this.routePrefix+`/resume/${shortUrl}`);
  }

  public getProposalResumePdf(proposalId:number, resumeId:number){
    return this.httpService.getFile(this.routePrefix+`/${proposalId}/resume/${resumeId}/pdf`);
  }

  public getProposalResumePdfByUrl(shortUrl:string){
    return this.httpService.getFile(this.routePrefix+`/resume/${shortUrl}/pdf`);
  }
}
