import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
export type UserHeaderData = {
    id:number,
    firstName:string,
    lastName:string
}
@Injectable()

export class UserHeaderBtnService implements OnDestroy{
    private getBtnSub$ = new BehaviorSubject<string[]>([''])
    public getBtn$:Observable<string[]>
    public userDataSub$ = new BehaviorSubject<UserHeaderData|null>(null)
    public userData$:Observable<UserHeaderData|null>
    constructor(){}

    setBTNs(btn:string[]){
      this.getBtnSub$.next(btn);
      this.getBtn$ =  this.getBtnSub$.asObservable()
    }
    setUserData(data:UserHeaderData|null = null){
      this.userDataSub$.next(data);
      // this.userData$ =  this.userDataSub$.asObservable()
    }
    ngOnDestroy(){
      this.getBtnSub$.complete();
    }
}