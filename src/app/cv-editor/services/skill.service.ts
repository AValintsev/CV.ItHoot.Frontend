
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from './../../services/base-api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { ISkill} from "../../shared/models/cvEditorModels/EditorModels";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkillService extends BaseApiService {

  private skillsBehavior = new BehaviorSubject<ISkill[]>(null as any);
  skills$ = this.skillsBehavior.asObservable();

  constructor(private _http: HttpClient) {
    super(_http)
  }

  getSkillByContent(content: string) : Observable<ISkill[]>{
    return this
      ._http.get<ISkill[]>( this.baseUrl + `skill` + "?content=" + content)
      .pipe(
        map((data) => {
          this.skillsBehavior.next(data);
          return data;
        })
      )
  }
}
