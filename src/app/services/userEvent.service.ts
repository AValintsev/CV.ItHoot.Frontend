import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
	providedIn:'root'
})

export class UserEventService{
	private userId$ = new BehaviorSubject<string>('0')
	constructor(){}
	setUserId(userId:string):void{
		console.log('userId', userId)
     this.userId$.next(userId)
	}
	getUserId():BehaviorSubject<string>{
     return this.userId$
	}
}
