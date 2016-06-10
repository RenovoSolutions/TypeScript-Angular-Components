import * as angular from 'angular';
import * as _ from 'lodash';

import {
	factoryName as builderService,
	ICardContainerBuilderFactory,
	ICardContainerBuilder,
	ISelectFilter,
	IDataSource,
} from '../../source/components/cardContainer/cardContainerBuilder.service';

export const moduleName: string = 'CardTestModule';

interface ICardItem {
	name: string;
	value: number;
}

class CardTestController {
	builder: ICardContainerBuilder;
	builderWithSelectFilter: ICardContainerBuilder;
	options: number[];
	selectFilter: ISelectFilter<number>;
	dataSource: IDataSource<ICardItem>;

	static $inject: string[] = [builderService];
	constructor(cardContainerBuilderFactory: ICardContainerBuilderFactory) {
		const items: ICardItem[] = _.map(_.range(1, 101), (num: number): ICardItem => {
			return { name: 'Item' + num, value: Math.floor(Math.random() * 2) + 1 };
		});

		this.options = [1, 2];

		this.builder = cardContainerBuilderFactory.getInstance();
		this.builder.dataSource.buildSimpleDataSource(items);
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

		this.builderWithSelectFilter = cardContainerBuilderFactory.getInstance();
		this.dataSource = this.builderWithSelectFilter.dataSource.buildSimpleDataSource(items);
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
	}
}

CardRoute.$inject = ['$stateProvider'];
function CardRoute($stateProvider) {
	$stateProvider
		.state('cards', {
			url: '/cards',
			template: require('./cards.html'),
		})
		.state('cards.ng1', {
			url: '/ng1',
			template: require('./cardsNg1.html'),
			controller: 'CardTestController',
			controllerAs: 'cards',
		})
		.state('cards.ng2', {
			url: '/ng2',
			template: '<ts-cards-bootstrapper></ts-cards-bootstrapper>',
		});
}

angular.module(moduleName, [])
	.controller('CardTestController', CardTestController)
	.config(CardRoute);