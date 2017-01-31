import { Component, Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
import * as angular from 'angular';
import * as _ from 'lodash';
import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __timezone = services.timezone;

import { ICardContainerBuilderOld } from '../../source/components/cardContainer/builder/index';
import { IDataSourceOld } from '../../source/components/cardContainer/dataSources/index';
import { ISelectFilterOld, IDateFilterOld, } from '../../source/components/cardContainer/filters/index';
import { cardContainerBuilderServiceName } from '../../source/componentsDowngrade';

export const moduleName: string = 'CardTestModule';

interface ICardItem {
	name: string;
	value: number;
	date: moment.Moment;
}

class CardTestController {
	builder: ICardContainerBuilderOld;
	builderWithSelectFilter: ICardContainerBuilderOld;
	builderWithDateFilter: ICardContainerBuilderOld;
	builderWithSearch: ICardContainerBuilderOld;
	options: number[];
	selectFilter: ISelectFilterOld<number>;
	dateFilter: IDateFilterOld;
	dataSource: IDataSourceOld<ICardItem>;

	static $inject: string[] = [cardContainerBuilderServiceName];
	constructor(cardContainerBuilderFactory: any) {
		__timezone.timezoneService.setCurrentTimezone('-08:00');

		const items: ICardItem[] = _.map(_.range(1, 101), (num: number): ICardItem => {
			const value = Math.floor(Math.random() * 2) + 1;
			return {
				name: 'Item' + num,
				value: value,
				date: moment().subtract(value, 'days'),
			};
		});

		this.options = [1, 2];

		this.builder = cardContainerBuilderFactory.getInstance();
		this.builder.dataSource.buildSimpleDataSource(_.cloneDeep(items));
		this.builder.usePaging();
		this.builder.addColumn({
			label: 'Name',
			size: 6,
			getValue: 'name',
		});
		this.builder.addColumn({
			label: 'Value',
			size: 6,
			getValue: 'value',
			template: '<b>{{myItem.value}}</b>',
		});
		this.builder.renderFilters();
		this.builder.filters.buildModeFilterGroup({
			label: 'Mode Filter',
			type: 'modeFilter',
			getValue: 'value',
			options: [
				{
					label: 'All',
					displayAll: true,
				},
				{
					label: '1',
					value: 1,
				},
				{
					label: '2',
					value: 2,
				},
			],
		});

		this.builderWithSearch = cardContainerBuilderFactory.getInstance();
		this.builderWithSearch.dataSource.buildSimpleDataSource(_.cloneDeep(items));
		this.builder.usePaging();
		this.builderWithSearch.addColumn({
			label: 'Name',
			size: 6,
			getValue: 'name',
		});
		this.builderWithSearch.addColumn({
			label: 'Value',
			size: 6,
			getValue: 'value',
			template: '<b>{{myItem.value}}</b>',
		});
		this.builderWithSearch.useSearch();

		this.builderWithSelectFilter = cardContainerBuilderFactory.getInstance();
		this.dataSource = this.builderWithSelectFilter.dataSource.buildSimpleDataSource(_.cloneDeep(items));
		this.builderWithSelectFilter.usePaging();
		this.builderWithSelectFilter.addColumn({
			label: 'Name',
			size: 6,
			getValue: 'name',
		});
		this.builderWithSelectFilter.addColumn({
			label: 'Value',
			size: 6,
			getValue: 'value',
			template: '<b>{{myItem.value}}</b>',
		});
		this.selectFilter = this.builderWithSelectFilter.filters.buildSelectFilter({
			valueSelector: 'value',
		});

		this.builderWithDateFilter = cardContainerBuilderFactory.getInstance();
		this.dataSource = this.builderWithDateFilter.dataSource.buildSimpleDataSource(_.cloneDeep(items));
		this.builderWithDateFilter.usePaging();
		this.builderWithDateFilter.addColumn({
			label: 'Name',
			size: 6,
			getValue: 'name',
		});
		this.builderWithDateFilter.addColumn({
			label: 'Date',
			size: 6,
			getValue: 'date',
			template: '<b>{{myItem.date | rlDate}}</b>',
		});
		this.dateFilter = this.builderWithDateFilter.filters.buildDateFilter({
			type: 'dateFilter',
			valueSelector: 'date',
		});
	}
}

@Component({
	selector: 'tsCardsNg1Bootstrapper',
	template: '<tsCardsNg1></tsCardsNg1>'
})
export class CardsNg1BootstrapperComponent { }

@Directive({
	selector: 'tsCardsNg1'
})
export class CardsNg1Directive extends UpgradeComponent {
	constructor(elementRef: ElementRef, injector: Injector) {
		super('tsCardsNg1', elementRef, injector);
	}
}

angular.module(moduleName, [])
	.component('tsCardsNg1', {
		template: require('./cardsNg1.html'),
		controller: 'CardTestController',
		controllerAs: 'cards',
	})
	.controller('CardTestController', CardTestController);
