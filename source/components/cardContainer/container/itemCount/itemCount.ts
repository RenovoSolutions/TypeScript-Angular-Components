import { Component, Inject, forwardRef } from '@angular/core';

import { CardContainerComponent } from '../../cardContainer';
import { IDataSourceOld } from '../../dataSources/index';

@Component({
	selector: 'rlItemCount',
	template: require('./itemCount.html'),
})
export class ItemCountComponent<T> {
	cardContainer: CardContainerComponent<T>;

	get dataSource(): IDataSourceOld<T> {
		return this.cardContainer && this.cardContainer.dataSource
			? this.cardContainer.dataSource
			: null;
	}

	get loadingDataSet(): boolean {
		return this.dataSource
			? this.dataSource.loadingDataSet
			: false;
	}

	get visibleCount(): number {
		return this.dataSource && this.dataSource.dataSet
			? this.dataSource.dataSet.length
			: null;
	}

	get totalCount(): number {
		return this.dataSource
			? this.dataSource.count
			: null;
	}

	constructor(@Inject(forwardRef(() => CardContainerComponent)) cardContainer: CardContainerComponent<T>) {
		this.cardContainer = cardContainer;
	}
}
