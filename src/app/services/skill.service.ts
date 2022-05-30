import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpInternalService} from "./http-internal.service";
import {SkillDto} from "../models/skill/skill-dto";

@Injectable({ providedIn: 'root' })
export class SkillService {
  private routePrefix: string = 'skills'
  constructor(private httpService: HttpInternalService){}

  public searchSkill(text:string):Observable<SkillDto[]>{
    return this.httpService.getRequest<SkillDto[]>(this.routePrefix+`/search?content=${text}`);
  }

  public getAllSkills():Observable<SkillDto[]>{
    return this.httpService.getRequest<SkillDto[]>(this.routePrefix);
  }

  public createSkill(skill:SkillDto):Observable<SkillDto>{
    return this.httpService.postRequest<SkillDto>(this.routePrefix,skill);
  }

  public updateSkill(skill:SkillDto):Observable<SkillDto>{
    return this.httpService.putRequest(this.routePrefix,skill);
  }

  public deleteSkill(skill:SkillDto):Observable<any>{
    return this.httpService.deleteRequest(this.routePrefix+`/${skill.id}`);
  }
}
