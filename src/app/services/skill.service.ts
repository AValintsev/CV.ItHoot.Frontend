import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpInternalService} from "./http-internal.service";
import {SkillTestDto} from "../models/resume-dto";

@Injectable({ providedIn: 'root' })
export class SkillService {
  private routePrefix: string = 'skills'
  constructor(private httpService: HttpInternalService){}

  public searchSkill(text:string):Observable<SkillTestDto[]>{
    return this.httpService.getRequest<SkillTestDto[]>(this.routePrefix+`/search?content=${text}`);
  }

  public getAllSkills():Observable<SkillTestDto[]>{
    return this.httpService.getRequest<SkillTestDto[]>(this.routePrefix);
  }

  public createSkill(skill:SkillTestDto):Observable<SkillTestDto>{
    return this.httpService.postRequest<SkillTestDto>(this.routePrefix,skill);
  }

  public updateSkill(skill:SkillTestDto):Observable<SkillTestDto>{
    return this.httpService.putRequest(this.routePrefix,skill);
  }

  public deleteSkill(skill:SkillTestDto):Observable<any>{
    return this.httpService.deleteRequest(this.routePrefix+`/${skill.id}`);
  }
}
