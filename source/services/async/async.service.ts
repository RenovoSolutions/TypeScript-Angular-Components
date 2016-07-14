import { isBoolean } from 'lodash';
import { Observable, BehaviorSubject } from 'rxjs';

export type IWaitValue<T> = Observable<T> | Promise<T> | boolean;

export class AsyncHelper {
	waitAsObservable(waitOn: IWaitValue<any>): Observable<any> {
		if (waitOn == null || isBoolean(waitOn)) {
			return new BehaviorSubject<boolean>(<boolean>waitOn);
		}

		return Observable.from(<any>waitOn);
	}
}
