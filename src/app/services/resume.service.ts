import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpInternalService} from "./http-internal.service";
import {SmallResumeDto} from "../models/small-resume-dto";
import {ResumeDto} from "../models/resume-dto";
import {environment} from '../../environments/environment';



@Injectable({ providedIn: 'root' })
export class ResumeService {
  private routePrefix: string = 'resume'
  public baseUrl: string = environment.apiUrl;
  constructor(private httpService: HttpInternalService,private http:HttpClient){}

  public createResume(resume: ResumeDto):Observable<ResumeDto>{
    return this.httpService.postRequest<ResumeDto>(this.routePrefix,resume);
  }

  public getAllResume():Observable<SmallResumeDto[]>{
    return this.httpService.getRequest<SmallResumeDto[]>(this.routePrefix);
  }

  public getResumeById(id:number):Observable<ResumeDto>{
    return this.httpService.getRequest<ResumeDto>(this.routePrefix+`/${id}`);
  }

  public updateResume(resume:ResumeDto):Observable<ResumeDto>{
    return this.httpService.putRequest<ResumeDto>(this.routePrefix,resume);
  }

  public deleteResume(id:number):Observable<any>{
    return this.httpService.deleteRequest(this.routePrefix+`/${id}`);
  }
 public addPhoto(resumeId:number, image:Blob):Observable<any>{

   const data = new FormData();
   data.append('image', image);
   return this.httpService.postForm(this.routePrefix+`/${resumeId}/image`, data);

 }
 getPdf(id:number):Observable<any>{
   return this.http.get<any>('https://cvbuilder-it.azurewebsites.net/api/v1/resume/pdf' + `/${id}`, 
  //  { observe:'response', responseType:'text'}
   )}}
