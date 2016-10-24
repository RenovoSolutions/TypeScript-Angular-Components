import { Component } from '@angular/core';
import { mapValues, map, range } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __date = services.date;
import __transform = services.transform;
import __timezone = services.timezone;
import __object = services.object;

import { CardContainerBuilderService, ICardContainerInstance } from '../../source/components/cardContainer/builder/index';
import {
	DateFilter,
	IFilterGroup,
	IModeFilterGroup,
	IRangeFilterGroup,
	SelectFilter,
} from '../../source/components/cardContainer/filters/index';

interface ICardItem {
	name: string;
	value: number;
}

const rangeLow: number = 1;
const rangeHigh: number = 101;
const items: ICardItem[] = map(range(rangeLow, rangeHigh), (num: number): ICardItem => {
	return {
		name: 'Item' + num,
		value: num,
	};
});

@Component({
	selector: 'tsCardsBootstrapper',
	template: require('./cardsNg2.html'),
})
export class CardsBootstrapper {
	alwaysOpen: boolean = false;
	builder: ICardContainerInstance;
	builderWithFilters: ICardContainerInstance;
	options: number[];
	dateFilter: DateFilter;
	modeFilterGroup: IModeFilterGroup;
	rangeFilterGroup: IRangeFilterGroup;
	disabledFilterGroup: IFilterGroup;
	selectFilter: SelectFilter<any, any>;

	constructor(timezone: __timezone.TimezoneService
			, cardContainerBuilder: CardContainerBuilderService) {
		timezone.setCurrentTimezone('-05:00');

		this.options = [1, 2, 3, 4, 5];

		this.builder = cardContainerBuilder.getInstance({
			paging: true,
			search: true,
		});
		this.builderWithFilters = _.cloneDeep(cardContainerBuilder);

		cardContainerBuilder.buildObservableDataSource(this.builder, Observable.of(items).delay(1000));
		cardContainerBuilder.addColumn(this.builder, {
			name: 'name',
			label: 'Name',
			size: 6,
			getValue: 'name',
		});
		cardContainerBuilder.addColumn(this.builder, {
			name: 'value',
			label: 'Value',
			size: 6,
			getValue: 'value',
		});

		// const searchFilter = this.builder.useSearch();
		// searchFilter.minSearchLength = 5;

		this.initFilteredCardContainer();

		this.dateFilter = new DateFilter({
			type: 'dateFilter',
			valueSelector: 'date',
		}, __date.dateUtility, __transform.transform);

		this.selectFilter = new SelectFilter({
			valueSelector: 'value',
		}, __object.objectUtility, __transform.transform);

		this.dateFilter.subscribe(value => console.log(mapValues(value, date => date != null ? date.format(__date.defaultFormats.dateTimeFormat) : null)));
		this.selectFilter.subscribe(value => console.log(value));
	}

	initFilteredCardContainer() {
		// this.builderWithFilters.dataSource.buildDataServiceDataSource<ICardItem>(() => Observable.of(items).delay(1000));
		// this.builderWithFilters.usePaging();
		// this.builderWithFilters.addColumn({
		// 	name: 'name',
		// 	label: 'Name',
		// 	size: 6,
		// 	getValue: 'name',
		// });
		// this.builderWithFilters.addColumn({
		// 	name: 'value',
		// 	label: 'Value',
		// 	size: 6,
		// 	getValue: 'value',
		// 	template: '<b>{{myItem.value}}</b>',
		// });

		// this.rangeFilterGroup = this.builderWithFilters.filters.buildRangeFilterGroup({
		// 	type: 'testRangeGroup',
		// 	label: 'Range Filter Group',
		// 	getValue: 'value',
		// 	options: [
		// 		{
		// 			label: 'All',
		// 			highInclusive: rangeHigh,
		// 			lowInclusive: 0
		// 		},
		// 		{
		// 			label: '5 - 10',
		// 			highInclusive: 10,
		// 			lowInclusive: 5,
		// 		},
		// 		{
		// 			label: '< 5',
		// 			highExclusive: 5,
		// 		},
		// 	],
		// });

		// this.modeFilterGroup = this.builderWithFilters.filters.buildModeFilterGroup({
		// 	type: 'testModeGroup',
		// 	label: 'Mode Filter Group',
		// 	getValue: 'value',
		// 	options: [
		// 		{
		// 			label: 'All',
		// 			displayAll: true,
		// 		},
		// 		{
		// 			label: 'Value Equals 3',
		// 			value: 3,
		// 		},
		// 		{
		// 			label: 'Value Equals 10',
		// 			value: 10,
		// 		},
		// 	],
		// });

		// this.disabledFilterGroup = this.builderWithFilters.filters.buildFilterGroup({
		// 	type: 'testGroup',
		// 	label: 'Disabled Filter Group',
		// 	options: [
		// 		{
		// 			label: 'Show',
		// 			filter: item => true,
		// 			serialize: () => 'show',
		// 		},
		// 		{
		// 			label: 'Hide',
		// 			filter: item => false,
		// 			serialize: () => 'hide',
		// 		},
		// 	],
		// });

		// this.modeFilterGroup.subscribe(value => console.log('mode filter change', value));
		// this.rangeFilterGroup.subscribe(value => console.log('range filter change', value));
		// this.disabledFilterGroup.subscribe(value => console.log('disabled filter change', value));
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
