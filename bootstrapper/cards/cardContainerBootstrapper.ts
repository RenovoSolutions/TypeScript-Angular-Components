import { factoryName as builderService, ICardContainerBuilderFactory, ICardContainerBuilder } from '../../source/components/cardContainer/cardContainerBuilder.service';

interface ICardItem {
	name: string;
	value: number;
}

class CardTestController {
	builder: ICardContainerBuilder;

	static $inject: string[] = [builderService];
	constructor(cardContainerBuilderFactory: ICardContainerBuilderFactory) {
		const items: ICardItem[] = [
			{ name: 'Item 1', value: 1 },
			{ name: 'Item 2', value: 2 },
			{ name: 'Item 3', value: 1 },
			{ name: 'Item 4', value: 1 },
			{ name: 'Item 5', value: 2 },
			{ name: 'Item 6', value: 2 },
		];

		this.builder = cardContainerBuilderFactory.getInstance();
		this.builder.dataSource.buildSimpleDataSource(items);
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

angular.module('app')
	.controller('CardTestController', CardTestController);