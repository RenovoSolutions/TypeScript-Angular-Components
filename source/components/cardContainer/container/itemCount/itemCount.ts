import { Component, Inject, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';

import { CardContainerComponent } from '../../cardContainer';
import { IDataSource } from '../../dataSources/index';

@Component({
	selector: 'rlItemCount',
	template: require('./itemCount.html'),
})
export class ItemCountComponent<T> {
	cardContainer: CardContainerComponent<T>;

	get dataSource(): IDataSource<T> {
		return this.cardContainer && this.cardContainer.dataSource
			? this.cardContainer.dataSource
			: null;
	}

	get loadingDataSet$(): Observable<boolean> {
		return this.dataSource
			? this.dataSource.loadingDataSet$
			: Observable.of(false);
	}

	get visibleCount$(): Observable<number> {
		return this.dataSource && this.dataSource.dataSet$
			? this.dataSource.dataSet$.map(dataSet => dataSet ? dataSet.length : 0)
			: Observable.of(0);
	}

	get totalCount$(): Observable<number> {
		return this.dataSource
			? this.dataSource.count$
			: Observable.of(0);
	}

	constructor(@Inject(forwardRef(() => CardContainerComponent)) cardContainer: CardContainerComponent<T>) {
		this.cardContainer = cardContainer;
	}
}
