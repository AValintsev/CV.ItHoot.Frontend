import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class HttpInternalService {
  public baseUrl: string = environment.apiUrl;
  public headers = new HttpHeaders();
  public params = new HttpParams()

  constructor(private http: HttpClient) {
  }

  public getHeaders(): HttpHeaders {
    return this.headers;
  }

  public getHeader(key: string): string | null {
    return this.headers.get(key);
  }

  public setHeader(key: string, value: string): void {
    this.headers.set(key, value);
  }

  public deleteHeader(key: string): void {
    this.headers.delete(key);
  }

  public setParams(key: string, value: string): void {
    this.params.set(key, value)
  }

  public getRequest<T>(url: string, httpParams?: any): Observable<T> {
    return this.http.get<T>(this.buildUrl(url), {headers: this.getHeaders(), params: httpParams});
  }

  public getFullRequest<T>(url: string, httpParams?: any): Observable<HttpResponse<T>> {
    return this.http.get<T>(this.buildUrl(url), {observe: 'response', headers: this.getHeaders(), params: httpParams,});
  }

  public postClearRequest<T>(url: string, payload: object): Observable<T> {
    return this.http.post<T>(this.buildUrl(url), payload);
  }

  public postRequest<T>(url: string, payload: object): Observable<T> {
    return this.http.post<T>(this.buildUrl(url), payload, {headers: this.getHeaders()});
  }

  public postForm(url: string, payload: object): Observable<any> {
    return this.http.post(this.buildUrl(url), payload);
  }

  public postFullRequest<T>(url: string, payload: object): Observable<HttpResponse<T>> {
    return this.http.post<T>(this.buildUrl(url), payload, {headers: this.getHeaders(), observe: 'response'});
  }

  public putRequest<T>(url: string, payload: any): Observable<T> {
    return this.http.put<T>(this.buildUrl(url), payload, {headers: this.getHeaders()});
  }

  public putFullRequest<T>(url: string, payload: object): Observable<HttpResponse<T>> {
    return this.http.put<T>(this.buildUrl(url), payload, {headers: this.getHeaders(), observe: 'response'});
  }

  public deleteRequest<T>(url: string, httpParams?: any): Observable<T> {
    return this.http.delete<T>(this.buildUrl(url), {headers: this.getHeaders(), params: httpParams});
  }

  public deleteFullRequest<T>(url: string, httpParams?: any): Observable<HttpResponse<T>> {
    return this.http.delete<T>(this.buildUrl(url), {
      headers: this.getHeaders(),
      observe: 'response',
      params: httpParams
    });
  }

  public getFile(url:string):Observable<Blob>{
    return this.http.get(this.buildUrl(url), {responseType: 'blob'})
  }

  public buildUrl(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return this.baseUrl + url;
  }

  public prepareData(payload: object): string {
    return JSON.stringify(payload);
  }
}
