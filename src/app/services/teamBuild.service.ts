import {Injectable} from "@angular/core";
import {HttpInternalService} from "./http-internal.service";
import {Observable} from "rxjs";
import {TeamBuildDto} from "../models/teamBuild/teamBuild-dto";

@Injectable({providedIn: 'root'})
export class TeamBuildService {
  private routePrefix: string = 'teamBuilds'

  constructor(private httpService: HttpInternalService) {
  }

  public createTeamBuild(teamBuild:TeamBuildDto):Observable<TeamBuildDto>{
    return this.httpService.postRequest<TeamBuildDto>(this.routePrefix,teamBuild);
  }

  public updateTeamBuild(teamBuild:TeamBuildDto): Observable<TeamBuildDto> {
    return this.httpService.putRequest<TeamBuildDto>(this.routePrefix,teamBuild);
  }

  public getAllTeamBuilds(): Observable<TeamBuildDto[]> {
    return this.httpService.getRequest<TeamBuildDto[]>(this.routePrefix)
  }

}
