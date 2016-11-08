import * as _ from 'lodash';
import * as Rx from 'rxjs';

import { defaultPageSize } from './dataPager.service';

export interface IDataPagerOld {
	pageNumber: number;
	pageSize: number;

	pageNumberChanges: Rx.Subject<number>;
	pageSizeChanges: Rx.Subject<number>;

	startItem: number;
	filter<T>(dataSet: T[]): T[];
}

export class DataPagerOld implements IDataPagerOld {
	private _pageNumber: number = 1;
	private _pageSize: number = defaultPageSize;

	pageNumberChanges: Rx.Subject<number>;
	pageSizeChanges: Rx.Subject<number>;

	constructor() {
		this.pageNumberChanges = new Rx.Subject<number>();
		this.pageSizeChanges = new Rx.Subject<number>();
	}

	get pageNumber(): number {
		return this._pageNumber;
	}

	set pageNumber(value: number) {
		this._pageNumber = value;
		this.pageNumberChanges.next(value);
	}

	get pageSize(): number {
		return this._pageSize;
	}

	set pageSize(value: number) {
		this._pageSize = value;
		this.pageSizeChanges.next(value);
	}

	get startItem(): number {
		return (this.pageNumber - 1) * this.pageSize;
	}

	filter(dataSet: any[]): any[] {
		return _(dataSet)
			.drop(this.startItem)
			.take(this.pageSize)
			.value();
	}
}
