import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpInternalService} from "./http-internal.service";
import {LanguageDto} from "../models/language/language-dto";

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private routePrefix: string = 'languages'
  constructor(private httpService: HttpInternalService){}

  public searchLanguage(text:string):Observable<LanguageDto[]>{
    return this.httpService.getRequest<LanguageDto[]>(this.routePrefix+`/search?content=${text}`);
  }

  public getAllLanguage():Observable<LanguageDto[]>{
    return this.httpService.getRequest<LanguageDto[]>(this.routePrefix);
  }

  public createLanguage(language:LanguageDto):Observable<LanguageDto>{
    return this.httpService.postRequest<LanguageDto>(this.routePrefix,language);
  }

  public updateLanguage(skill:LanguageDto):Observable<LanguageDto>{
    return this.httpService.putRequest(this.routePrefix,skill);
  }

  public deleteLanguage(language:LanguageDto):Observable<any>{
    return this.httpService.deleteRequest(this.routePrefix+`/${language.id}`);
  }

}
