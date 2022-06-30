import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpInternalService} from "./http-internal.service";
import {SmallResumeDto} from "../models/resume/small-resume-dto";
import {ResumeDto} from "../models/resume/resume-dto";
import {ResumeTemplateDto} from "../models/resume/resume-template-dto";
import {PositionDto} from "../models/position/position-dto";
import {PagedResponse} from "../models/paginations/paged-response";
import { ResumeListFilter } from 'src/app/models/resume/resume-list-filter';


@Injectable({providedIn: 'root'})
export class ResumeService {
  private routePrefix: string = 'resume'

  constructor(private httpService: HttpInternalService, private http: HttpClient) {
  }

  public createResume(resume: ResumeDto): Observable<ResumeDto> {
    return this.httpService.postRequest<ResumeDto>(this.routePrefix, resume);
  }

  public getAllResume(filters: ResumeListFilter | null = null, isArchive: boolean = false): Observable<PagedResponse<SmallResumeDto[]>> {

      if (filters == null) {
        return this.httpService.getRequest<PagedResponse<SmallResumeDto[]>>(this.routePrefix + `?isArchive=${isArchive}`);
      } else {
        let requestUrl = `${this.routePrefix}?term=${filters.term ?? ''}&sort=${filters.sort}&order=${filters.order}&page=${filters.page + 1}&pageSize=${filters.pageSize}&isArchive=${isArchive}`;

        if (filters.positions) {
          filters.positions.forEach(item => {
            requestUrl = `${requestUrl}&positions=${item}`
          });
        }

        if(filters.skills) {
          filters.skills.forEach(item => {
            requestUrl = `${requestUrl}&skills=${item}`
          });
        }
        return this.httpService.getRequest<PagedResponse<SmallResumeDto[]>>(requestUrl);
      }
  }

  public getResumeById(id: number): Observable<ResumeDto> {
    return this.httpService.getRequest<ResumeDto>(this.routePrefix + `/${id}`);
  }

  public getResumeHtmlById(id:number):Observable<any>{
    return this.httpService.getRequest(this.routePrefix+`/${id}/html`);
  }
  public updateResume(resume: ResumeDto): Observable<ResumeDto> {
    return this.httpService.putRequest<ResumeDto>(this.routePrefix, resume);
  }

  public deleteResume(id: number): Observable<any> {
    return this.httpService.deleteRequest(this.routePrefix + `/${id}`);
  }

  public recoverResume(resume: SmallResumeDto): Observable<any> {
    return this.httpService.putRequest(this.routePrefix + `/${resume.id}`, resume);
  }

  public addPhoto(resumeId: number, image: Blob): Observable<any> {

    const data = new FormData();
    data.append('image', image);
    return this.httpService.postForm(this.routePrefix + `/${resumeId}/image`, data);

  }

  public getPdf(resumeId: number) {
    return this.httpService.getFile(this.routePrefix + `/pdf/${resumeId}`);
  }

  public getAllTemplates(): Observable<ResumeTemplateDto[]> {
    return this.httpService.getRequest(this.routePrefix + `/templates`);
  }

  //todo !!
  public getAllResumesByPositions(positions: PositionDto[]): Observable<SmallResumeDto[]> {
    let position = ''
    positions.forEach(x => position += x.positionName + ',');
    position = position.slice(0, -1);
    return this.httpService.getRequest(this.routePrefix + `/position?positions=${position}`);
  }

  public getAllResumesByProposalBuild(proposalBuildId: number): Observable<SmallResumeDto[]> {
    return this.httpService.getRequest<SmallResumeDto[]>(this.routePrefix + `/proposalBuild/${proposalBuildId}`);
  }

  public getTemplateById(id: number): Observable<ResumeTemplateDto> {
    return this.httpService.getRequest<ResumeTemplateDto>(this.routePrefix + `/templates/${id}`);
  }

  public updateTemplate(template:ResumeTemplateDto):Observable<ResumeTemplateDto>{
    return this.httpService.putRequest<ResumeTemplateDto>(this.routePrefix+`/templates/${template.templateId}/${template.templateName}`,template.html);
  }

  public changeSalaryRate(resumeId:number,salaryRate:number):Observable<ResumeDto>{
    return this.httpService.putRequest(this.routePrefix+`/${resumeId}/salaryRate/${salaryRate}`,null);
  }

}
