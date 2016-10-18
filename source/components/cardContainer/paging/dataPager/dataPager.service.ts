import { drop, take } from 'lodash';
import { Observable, BehaviorSubject } from 'rxjs';

export const defaultPageSize: number = 10;

export interface IDataPager {
	pageNumber$: Observable<number>;
	pageSize$: Observable<number>;

	setPage(page: number): void;

	startItem$: Observable<number>;
	filter<T>(dataSet$: Observable<T[]>): Observable<T[]>;
}

export class DataPager implements IDataPager {
	private _pageNumber: BehaviorSubject<number>;
	private _pageSize: BehaviorSubject<number>;

	constructor() {
		this._pageNumber = new BehaviorSubject<number>(1);
		this._pageSize = new BehaviorSubject<number>(defaultPageSize);
	}

	setPage(page: number): void {
		this._pageNumber.next(page);
	}

	get pageNumber$(): Observable<number> {
		return this._pageNumber.asObservable();
	}

	get pageSize$(): Observable<number> {
		return this._pageSize.asObservable();
	}

	get startItem$(): Observable<number> {
		return this.pageNumber$.combineLatest(this.pageSize$)
							  .map(([pageNumber, pageSize]) => (pageNumber - 1) * pageSize);
	}

	filter(dataSet$: Observable<any[]>): Observable<any[]> {
		return dataSet$.combineLatest(this.startItem$, this.pageSize$)
					   .map(([dataSet, startItem, pageSize]) => {
				return take(drop(dataSet, startItem), pageSize);
			});
	}
}
