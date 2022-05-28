import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpInternalService} from "./http-internal.service";
import {SmallTeamDto} from "../models/team/small-team-dto";
import {TeamDto, TeamResumeDto} from "../models/team/create-team-dto";


@Injectable({providedIn: 'root'})
export class TeamService {
  private routePrefix: string = 'teams'

  constructor(private httpService: HttpInternalService) {
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

  public getTeamById(id:number):Observable<TeamDto>{
    return this.httpService.getRequest<TeamDto>(this.routePrefix+`/${id}`);
  }

  public getArchiveTeams():Observable<SmallTeamDto[]>{
    return this.httpService.getRequest<SmallTeamDto[]>(this.routePrefix+'/archive');
  }

  public getTeamResume(teamId:number, resumeId:number):Observable<any>{
    return this.httpService.getRequest<any>(this.routePrefix+`/${teamId}/resume/${resumeId}`);
  }

  public getTeamResumePdf(teamId:number, resumeId:number){
    return this.httpService.getFile(this.routePrefix+`/${teamId}/resume/${resumeId}/pdf`);
  }
}
