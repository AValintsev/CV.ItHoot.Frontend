import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpInternalService} from "./http-internal.service";
import {LanguageTestDto} from "../models/resume-dto";

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private routePrefix: string = 'languages'
  constructor(private httpService: HttpInternalService){}

  public searchLanguage(text:string):Observable<LanguageTestDto[]>{
    return this.httpService.getRequest<LanguageTestDto[]>(this.routePrefix+`/search?content=${text}`);
  }

  public getAllLanguage():Observable<LanguageTestDto[]>{
    return this.httpService.getRequest<LanguageTestDto[]>(this.routePrefix);
  }

  public createLanguage(language:LanguageTestDto):Observable<LanguageTestDto>{
    return this.httpService.postRequest<LanguageTestDto>(this.routePrefix,language);
  }

  public updateLanguage(skill:LanguageTestDto):Observable<LanguageTestDto>{
    return this.httpService.putRequest(this.routePrefix,skill);
  }

  public deleteLanguage(language:LanguageTestDto):Observable<any>{
    return this.httpService.deleteRequest(this.routePrefix+`/${language.id}`);
  }

}
