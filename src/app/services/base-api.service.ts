import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class BaseApiService {

  protected baseUrl: string = "https://localhost:5001/api/v1/";

  constructor(private http: HttpClient)
  {

  }

  protected post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, JSON.stringify(body));
  }
  protected get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url);
  }
  protected put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(this.baseUrl + url, JSON.stringify(body));
  }
  protected patch<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(this.baseUrl + url, JSON.stringify(body));
  }
  protected delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.baseUrl + url);
  }

  protected buildUrlParams(request: any): string {

    if (!request) return '';

    const prms = Object.keys(request).map(key => {
      return `${key}=${request[key]}`;
    });

    return `?${prms.join('&')}`;
  }


}
