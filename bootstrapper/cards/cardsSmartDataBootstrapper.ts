import { Component } from '@angular/core';
import { map, range, filter, sortBy, take } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';

import { IServerSearchParams, IDataResult } from '../../source/components/cardContainer/dataSources/index';
import { CardContainerBuilderService, ICardContainerInstance } from '../../source/components/cardContainer/builder/index';
import {
	IFilterGroup,
	IModeFilterGroup,
	IRangeFilterGroup,
} from '../../source/components/cardContainer/filters/index';

export interface ICardItem {
	id: number;
	name: string;
	value: number;
}

const rangeLow: number = 1;
const rangeHigh: number = 10001;
const items: ICardItem[] = map(range(rangeLow, rangeHigh), (num: number): ICardItem => {
	return {
		id: num,
		name: 'Item' + num,
		value: num,
	};
});

@Component({
	selector: 'tsCardsSmartDataBootstrapper',
	template: require('./cardsSmartData.html'),
})
export class CardsSmartDataBootstrapper {
	builder: ICardContainerInstance;
	oddsEvensFilter: IFilterGroup<any>;
	rangeFilterGroup: IRangeFilterGroup<any>;

	constructor(cardContainerBuilder: CardContainerBuilderService) {
		this.builder = this.setupCardContainer(cardContainerBuilder);
	}

	setupCardContainer(cardContainerBuilder: CardContainerBuilderService): ICardContainerInstance {
		const builder = cardContainerBuilder.getInstance({
			paging: true,
			search: true,
		});
		cardContainerBuilder.buildSmartDataSource(builder, params => this.search(params));
		cardContainerBuilder.addColumn(builder, {
			name: 'name',
			label: 'Name',
			size: 6,
			getValue: 'name',
		});
		cardContainerBuilder.addColumn(builder, {
			name: 'value',
			label: 'Value',
			size: 6,
			getValue: 'value',
		});

		this.oddsEvensFilter = cardContainerBuilder.buildFilterGroup(builder, {
			type: 'oddsEventsFilter',
			label: 'Odds Events Filter',
			options: [
				{
					label: 'All',
					predicate: () => true,
					value: null,
				},
				{
					label: 'Odd',
					predicate: (item: ICardItem) => !!(item.value % 2),
					value: 'odd',
				},
				{
					label: 'Even',
					predicate: (item: ICardItem) => !(item.value % 2),
					value: 'even',
				},
			],
		});

		this.rangeFilterGroup = cardContainerBuilder.buildRangeFilterGroup(builder, {
			type: 'rangeFilter',
			label: 'Range Filter Group',
			getValue: 'value',
			options: [
				{
					label: 'All',
				},
				{
					label: '5,000 - 9,800',
					highInclusive: 9800,
					lowInclusive: 5000,
				},
				{
					label: '< 5,000',
					highExclusive: 5000,
				},
				{
					label: '> 9,800',
					lowExclusive: 9800,
				},
			],
		});

		this.oddsEvensFilter.serialize().skip(1).subscribe(value => console.log('odds evens filter change', value));
		this.rangeFilterGroup.serialize().skip(1).subscribe(value => console.log('range filter change', value));

		return builder;
	}

	search(params: IServerSearchParams): Observable<IDataResult<ICardItem>> {
		console.log('Searching', params);
		const filtered = filter(items, item => {
			const inRange = this.searchRange(item, params.filters['rangeFilter']);
			const matchesOddOrEven = this.searchOddEven(item, params.filters['oddsEventsFilter']);
			return inRange && matchesOddOrEven;
		});
		const sorted = params.sorts.length ? sortBy(filtered, params.sorts[0]) : filtered;
		const paged = take(sorted, params.paging.pageSize);
		return Observable.of({
			count: filtered.length,
			dataSet: paged,
			isEmpty: !!filtered.length,
		}).delay(1000);
	}

	searchOddEven(item: ICardItem, filterValue: string): boolean {
		if (!filterValue) {
			return true;
		}

		if (filterValue === 'odd') {
			return !!(item.value % 2);
		}
		return !(item.value % 2);
	}

	searchRange(item: ICardItem, option: any): boolean {
		if (!option) {
			return true;
		}

		const value: number = item.value;

		let result: boolean = true;

		if (option.highExclusive) {
			result = value < option.highExclusive;
		} else if (option.highInclusive) {
			result = value <= option.highInclusive;
		}

		if (option.lowExclusive) {
			result = result && value > option.lowExclusive;
		} else if (option.lowInclusive) {
			result = result && value >= option.lowInclusive;
		}

		return result;
	}

	submitAsync: { (data: any): Promise<void> } = (data: any) => {
		return new Promise<void>((resolve: Function, reject: Function): void => {
			setTimeout(() => {
				console.log(data);
				resolve();
			}, 1000);
		});
	}
}
