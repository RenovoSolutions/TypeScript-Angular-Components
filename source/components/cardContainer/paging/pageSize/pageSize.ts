import { Component } from '@angular/core';

import { IDataPager } from '../dataPager/dataPager.service';
import { CardContainerComponent } from '../../cardContainer';
import { SelectComponent } from '../../../inputs/index';

export const availablePageSizes: number[] = [10, 25, 50, 100];

@Component({
	selector: 'rlPageSize',
	template: require('./pageSize.html'),
	directives: [SelectComponent],
})
export class PageSizeComponent<T> {
	pageSizes: number[];

	cardContainer: CardContainerComponent<T>;
	pager: IDataPager;

	constructor(cardContainer: CardContainerComponent<T>) {
		this.cardContainer = cardContainer;

		this.pager = this.cardContainer.dataSource.pager;

		this.pageSizes = availablePageSizes;
	}
}
