import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpInternalService} from "./http-internal.service";
import {SkillDto, SkillTestDto, UserLanguageTestDto} from "../models/resume-dto";

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private routePrefix: string = 'languages'
  constructor(private httpService: HttpInternalService){}

  public searchLanguage(text:string):Observable<UserLanguageTestDto[]>{
    return this.httpService.getRequest<UserLanguageTestDto[]>(this.routePrefix+`/search?content=${text}`);
  }

}
