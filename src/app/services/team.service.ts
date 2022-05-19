import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpInternalService} from "./http-internal.service";
import {TeamDto} from "../models/team-dto";
import {SmallTeamDto} from "../models/small-team-dto";


@Injectable({providedIn: 'root'})
export class TeamService {
  private routePrefix: string = 'teams'

  constructor(private httpService: HttpInternalService, private http: HttpClient) {
  }

  public createTeam(team: TeamDto): Observable<TeamDto> {
    return this.httpService.postRequest<TeamDto>(this.routePrefix, team);
  }

  public updateTeam(team: TeamDto): Observable<TeamDto> {
    return this.httpService.putRequest<TeamDto>(this.routePrefix, team);
  }

  public getAllTeams(): Observable<SmallTeamDto[]> {
    return this.httpService.getRequest<SmallTeamDto[]>(this.routePrefix);
  }
}
