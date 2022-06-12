import {Injectable} from "@angular/core";
import {HttpInternalService} from "./http-internal.service";
import {Observable} from "rxjs";
import {ProposalBuildDto} from "../models/proposal-build/proposal-build-dto";

@Injectable({providedIn: 'root'})
export class ProposalBuildService {
  private routePrefix: string = 'proposalBuilds'

  constructor(private httpService: HttpInternalService) {
  }

  public createProposalBuild(proposalBuild:ProposalBuildDto):Observable<ProposalBuildDto>{
    return this.httpService.postRequest<ProposalBuildDto>(this.routePrefix,proposalBuild);
  }

  public updateProposalBuild(proposalBuild:ProposalBuildDto): Observable<ProposalBuildDto> {
    return this.httpService.putRequest<ProposalBuildDto>(this.routePrefix,proposalBuild);
  }

  public getAllProposalBuilds(): Observable<ProposalBuildDto[]> {
    return this.httpService.getRequest<ProposalBuildDto[]>(this.routePrefix)
  }

}
