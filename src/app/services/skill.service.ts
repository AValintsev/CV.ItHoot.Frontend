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

}
