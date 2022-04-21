import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CV } from '../shared/models/cv';
import { CvCard } from '../shared/models/cv-card';
import { GetCvCardsResponse } from '../shared/models/responses/getCvCardsResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CVService {
   baseUrl = "https://localhost:5001/api/v1/cv";

  private cvCards = new BehaviorSubject<Array<CvCard>>(null as any);
  cvCards$ = this.cvCards.asObservable();

  private cv = new BehaviorSubject<CV>(null as any);
  cv$ = this.cv.asObservable();

  constructor(private http: HttpClient, private router: Router) {
   }

   editCv(data:any){
     return this.http.post<any>(this.baseUrl + "/updateCv",data).pipe(map(p => 
      p))
   }

   getAllCvCards() {
    return this.http.get<GetCvCardsResponse>(this.baseUrl + "/list")
    .pipe(
      map((data:GetCvCardsResponse)=>{
        if(data) {
          this.cvCards.next(data.cvCards);
        }
        return data.cvCards;
      })
    );
  }

  getCVbyId(id: number) {
    return this.http.get<CV>(this.baseUrl + "?Id=" + id)
     .pipe(
       map((data:CV)=>{
         if(data) {
           this.cv.next(data);
         }
         return data;
       })
     );
  };

  getCVbyIdV2(id: number) {
    return this.http.get<any>(this.baseUrl + "?Id=" + id)
     .pipe(
       map((data:CV)=>{
         return data;
       })
     );
  };
  
  createCV(data: any) {
    console.log("data: ", data)
    let postUrl = this.baseUrl + "/create";
    return this.http.post<any>(postUrl, data).pipe(map(user=>{
       return user
    }));
  }

  loadingFileToCv(data:any){
    console.log("file vith id",data)
    let postUrl = "https://localhost:5001/api/v1/file/create";

    return this.http.post<any>(postUrl,data).pipe(map(FulCv =>{
      console.log("fulCv",FulCv)
    }))
  }

  getCv(){
    return this.http.get<CV>(this.baseUrl)
  }
  
}
