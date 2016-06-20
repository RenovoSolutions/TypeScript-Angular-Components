import { Component, Inject } from '@angular/core';
import { mapValues, map, range } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __date = services.date;
import __transform = services.transform;
import __timezone = services.timezone;
import __object = services.object;

import { builder, CARD_CONTAINER_PROVIDERS } from '../../source/components/cardContainer/index';
import { SIMPLE_CARD_DIRECTIVES } from '../../source/components/simpleCardList/index';
import { INPUT_DIRECTIVES } from '../../source/components/inputs/index';
import { CARD_CONTAINER_DIRECTIVES } from '../../source/components/cardContainer/index';
import {
	DateFilter,
	FilterGroup,
	ModeFilterGroup,
	RangeFilterGroup,
	SelectFilter,
} from '../../source/components/cardContainer/filters/index';

interface ICardItem {
	name: string;
	value: number;
}

@Component({
	selector: 'tsCardsBootstrapper',
	template: require('./cardsNg2.html'),
	directives: [
		SIMPLE_CARD_DIRECTIVES,
		INPUT_DIRECTIVES,
		CARD_CONTAINER_DIRECTIVES,
	],
	providers: [CARD_CONTAINER_PROVIDERS],
})
export class CardsBootstrapper {
	alwaysOpen: boolean = false;
	builder: builder.CardContainerBuilder;
	options: number[];
	dateFilter: DateFilter;
	filterGroup: FilterGroup;
	modeFilterGroup: ModeFilterGroup;
	rangeFilterGroup: RangeFilterGroup;
	selectFilter: SelectFilter<any, any>;

	constructor( @Inject(__timezone.timezoneToken) timezone: __timezone.ITimezoneService
			, cardContainerBuilder: builder.CardContainerBuilder) {
		timezone.setCurrentTimezone('-05:00');

		const items: ICardItem[] = map(range(1, 101), (num: number): ICardItem => {
			const value = Math.floor(Math.random() * 2) + 1;
			return {
				name: 'Item' + num,
				value: value,
			};
		});

		this.options = [1, 2, 3, 4, 5];

		this.builder = cardContainerBuilder;
		this.builder.dataSource.buildSimpleDataSource(items);
		this.builder.usePaging();
		this.builder.addColumn({
			name: 'name',
			label: 'Name',
			size: 6,
			getValue: 'name',
		});
		this.builder.addColumn({
			name: 'value',
			label: 'Value',
			size: 6,
			getValue: 'value',
			template: '<b>{{myItem.value}}</b>',
		});

		this.dateFilter = new DateFilter({
			type: 'dateFilter',
			valueSelector: 'date',
		}, __date.dateUtility, __transform.transform);

		this.filterGroup = new FilterGroup({
			type: 'testGroup',
			label: 'Filter Group',
			options: [
				{
					label: 'Show',
					filter: item => item.show,
					serialize: () => 'show',
				},
				{
					label: 'Hide',
					filter: item => !item.show,
					serialize: () => 'hide',
				},
			],
		}, __object.objectUtility);

		this.modeFilterGroup = new ModeFilterGroup({
			type: 'testModeGroup',
			label: 'Mode Filter Group',
			getValue: 'value',
			options: [
				{
					label: 'All',
					displayAll: true,
				},
				{
					label: 'Value 1',
					value: 1,
				},
			],
		}, __object.objectUtility, __transform.transform);

		this.rangeFilterGroup = new RangeFilterGroup({
			type: 'testRangeGroup',
			label: 'Range Filter Group',
			getValue: 'value',
			options: [
				{
					label: '5 - 10',
					highInclusive: 10,
					lowInclusive: 5,
				},
				{
					label: '< 5',
					highExclusive: 5,
				},
			],
		}, __object.objectUtility, __transform.transform);

		this.selectFilter = new SelectFilter({
			valueSelector: 'value',
		}, __object.objectUtility, __transform.transform);

		this.dateFilter.subscribe(value => console.log(mapValues(value, date => date != null ? date.format(__date.defaultFormats.dateTimeFormat) : null)));
		this.filterGroup.subscribe(value => console.log(value));
		this.modeFilterGroup.subscribe(value => console.log(value));
		this.rangeFilterGroup.subscribe(value => console.log(value));
		this.selectFilter.subscribe(value => console.log(value));
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