import {Injectable} from "@angular/core";
import {HttpInternalService} from "./http-internal.service";
import {Observable} from "rxjs";
import {ProposalBuildComplexityDto} from "../models/proposal-build/proposal-build-complexity-dto";

@Injectable({providedIn: 'root'})
export class ComplexityService {
  private routePrefix: string = 'complexities'

  constructor(private httpService: HttpInternalService) {
  }

  public createComplexity(complexity:ProposalBuildComplexityDto):Observable<ProposalBuildComplexityDto>{
    return this.httpService.postRequest<ProposalBuildComplexityDto>(this.routePrefix,complexity);
  }

  public updateComplexity(complexity:ProposalBuildComplexityDto):Observable<ProposalBuildComplexityDto>{
    return this.httpService.putRequest<ProposalBuildComplexityDto>(this.routePrefix,complexity);
  }

  public deleteComplexity(complexity:ProposalBuildComplexityDto):Observable<ProposalBuildComplexityDto>{
    return this.httpService.deleteRequest<ProposalBuildComplexityDto>(this.routePrefix+`/${complexity.id}`);
  }

  public getAllComplexities(): Observable<ProposalBuildComplexityDto[]> {
    return this.httpService.getRequest<ProposalBuildComplexityDto[]>(this.routePrefix)
  }

}
