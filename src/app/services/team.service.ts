import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpInternalService} from "./http-internal.service";
import {SmallTeamDto} from "../models/team/small-team-dto";
import {TeamApprove, TeamDto, TeamResumeDto} from "../models/team/create-team-dto";


@Injectable({providedIn: 'root'})
export class TeamService {
  private routePrefix: string = 'teams'

  constructor(private httpService: HttpInternalService) {
  }

  public createTeam(team: TeamDto): Observable<TeamDto> {
    return this.httpService.postRequest<TeamDto>(this.routePrefix, team);
  }
  public approveTeam(team: TeamApprove): Observable<TeamDto> {
    return this.httpService.postRequest<TeamDto>(this.routePrefix+'/approve', team);
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

  public getTeamResumeByUrl(shortUrl:string):Observable<any>{
    return this.httpService.getRequest<any>(this.routePrefix+`/resume/${shortUrl}`);
  }

  public getTeamResumePdf(teamId:number, resumeId:number){
    return this.httpService.getFile(this.routePrefix+`/${teamId}/resume/${resumeId}/pdf`);
  }

  public getTeamResumePdfByUrlShort(shortUrl:string){
    return this.httpService.getFile(this.routePrefix+`/resume/${shortUrl}/pdf`);
  }
}
