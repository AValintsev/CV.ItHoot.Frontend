import {Injectable} from "@angular/core";
import {HttpInternalService} from "./http-internal.service";
import {Observable} from "rxjs";
import {TeamBuildComplexityDto} from "../models/teamBuild/teamBuildComplexity-dto";

@Injectable({providedIn: 'root'})
export class ComplexityService {
  private routePrefix: string = 'complexities'

  constructor(private httpService: HttpInternalService) {
  }


  public getAllComplexities(): Observable<TeamBuildComplexityDto[]> {
    return this.httpService.getRequest<TeamBuildComplexityDto[]>(this.routePrefix)
  }

}
