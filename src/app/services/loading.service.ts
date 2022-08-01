import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
	providedIn:'root'
})
export class LoadingService {
	private _isLoading$ = new BehaviorSubject<boolean>(false);
	public totalRequests = new BehaviorSubject<number>(0);
	isLoading$ = this._isLoading$.asObservable();

	setLoading(isLoading: boolean) {
		this._isLoading$.next(isLoading);
	}

}
