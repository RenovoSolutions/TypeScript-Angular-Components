import * as angular from 'angular';
import * as _ from 'lodash';

import { factoryName as builderService, ICardContainerBuilderFactory, ICardContainerBuilder } from '../../source/components/cardContainer/cardContainerBuilder.service';

export const moduleName: string = 'CardTestModule';

interface ICardItem {
	name: string;
	value: number;
}

class CardTestController {
	builder: ICardContainerBuilder;

	static $inject: string[] = [builderService];
	constructor(cardContainerBuilderFactory: ICardContainerBuilderFactory) {
		const items: ICardItem[] = _.map(_.range(1, 101), (num: number): ICardItem => {
			return { name: 'Item' + num, value: Math.floor(Math.random() * 2) + 1 };
		});

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
	}
}

CardRoute.$inject = ['$stateProvider'];
function CardRoute($stateProvider) {
	$stateProvider
		.state('cards', {
			url: '/cards',
			template: require('./cards.html'),
			controller: 'CardTestController',
			controllerAs: 'card',
		});
}

angular.module(moduleName, [])
	.controller('CardTestController', CardTestController)
	.config(CardRoute);