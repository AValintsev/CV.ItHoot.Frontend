import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpInternalService} from "./http-internal.service";
import {SmallTeamDto} from "../models/small-team-dto";
import {CreateTeamDto, TeamDto} from "../models/create-team-dto";


@Injectable({providedIn: 'root'})
export class TeamService {
  private routePrefix: string = 'teams'

  constructor(private httpService: HttpInternalService) {
  }

  public createTeam(team: CreateTeamDto): Observable<CreateTeamDto> {
    return this.httpService.postRequest<CreateTeamDto>(this.routePrefix, team);
  }

  public updateTeam(team: TeamDto): Observable<TeamDto> {
    return this.httpService.putRequest<TeamDto>(this.routePrefix, team);
  }

  public getAllTeams(): Observable<SmallTeamDto[]> {
    return this.httpService.getRequest<SmallTeamDto[]>(this.routePrefix);
  }

  public getTeamById(id:number):Observable<TeamDto>{
    return this.httpService.getRequest<TeamDto>(this.routePrefix+`/${id}`);
  }

  public getArchiveTeams():Observable<SmallTeamDto[]>{
    return this.httpService.getRequest<SmallTeamDto[]>(this.routePrefix+'/archive');
  }
}
