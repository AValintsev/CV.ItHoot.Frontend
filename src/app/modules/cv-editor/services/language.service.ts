import {Injectable} from '@angular/core';
import {BaseApiService} from "../../../services/base-api.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ILanguage} from "../../../models/cvEditorModels/EditorModels";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends BaseApiService  {

  constructor(private _http: HttpClient) {
    super(_http);
  }

  getLanguageByContent(content: string) : Observable<ILanguage[]>{
    return this
      ._http.get<ILanguage[]>( this.baseUrl + `Language` + "?content=" + content)
      .pipe(
        map((data) => {
          return data;
        })
      )
  }
}
