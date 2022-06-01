import {Injectable} from "@angular/core";
import {HttpInternalService} from "./http-internal.service";
import {Observable} from "rxjs";
import {TeamBuildComplexityDto} from "../models/teamBuild/teamBuildComplexity-dto";

@Injectable({providedIn: 'root'})
export class ComplexityService {
  private routePrefix: string = 'complexities'

  constructor(private httpService: HttpInternalService) {
  }

  public createComplexity(complexity:TeamBuildComplexityDto):Observable<TeamBuildComplexityDto>{
    return this.httpService.postRequest<TeamBuildComplexityDto>(this.routePrefix,complexity);
  }

  public updateComplexity(complexity:TeamBuildComplexityDto):Observable<TeamBuildComplexityDto>{
    return this.httpService.putRequest<TeamBuildComplexityDto>(this.routePrefix,complexity);
  }

  public deleteComplexity(complexity:TeamBuildComplexityDto):Observable<TeamBuildComplexityDto>{
    return this.httpService.deleteRequest<TeamBuildComplexityDto>(this.routePrefix+`/${complexity.id}`);
  }

  public getAllComplexities(): Observable<TeamBuildComplexityDto[]> {
    return this.httpService.getRequest<TeamBuildComplexityDto[]>(this.routePrefix)
  }

}
