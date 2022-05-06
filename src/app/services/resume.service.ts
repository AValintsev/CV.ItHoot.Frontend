import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ResumeCardCreateDto} from "../models/cv-card";
import {HttpInternalService} from "./http-internal.service";

@Injectable({ providedIn: 'root' })
export class ResumeService {
  private routePrefix: string = 'cv'
  constructor(private httpService: HttpInternalService){}

  public createResume(resume: ResumeCardCreateDto):Observable<ResumeCardCreateDto>{
    return this.httpService.postRequest<ResumeCardCreateDto>(this.routePrefix,resume);
  }
}
