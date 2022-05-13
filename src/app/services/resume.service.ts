import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpInternalService} from "./http-internal.service";
import {SmallResumeDto} from "../models/small-resume-dto";
import {ResumeDto} from "../models/resume-dto";
import {environment} from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class ResumeService {
  private routePrefix: string = 'cv'
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
 public addPhoto(id:number,photo:any):Observable<any>{
   const formData = new FormData();

   // Store form name as "file" with file data
   formData.append("file", photo, photo.name);
   formData.append("cvId", id.toString());

   // Make http post request over api
   // with formData as req
   return this.http.post(this.baseUrl+'files', formData)

   // return this.httpService.postRequest<any>(this.baseUrl+'files',{cvId: id, file:photo})
 }
 public getPhoto(id:number):Observable<any>{
   return this.httpService.getRequest<any>('files' + `/${id}`)
 }
}
