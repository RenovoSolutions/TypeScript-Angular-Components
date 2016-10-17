import { Component, Inject, forwardRef } from '@angular/core';

import { IDataPagerOld } from '../dataPager/dataPagerOld.service';
import { CardContainerComponent } from '../../cardContainer';

export const availablePageSizes: number[] = [10, 15, 20, 25];

@Component({
	selector: 'rlPageSize',
	template: require('./pageSize.html'),
})
export class PageSizeComponent<T> {
	pageSizes: number[];

	cardContainer: CardContainerComponent<T>;
	pager: IDataPagerOld;

	constructor(@Inject(forwardRef(() => CardContainerComponent)) cardContainer: CardContainerComponent<T>) {
		this.cardContainer = cardContainer;

		this.pager = this.cardContainer.dataSource.pager;

		this.pageSizes = availablePageSizes;
	}
}
