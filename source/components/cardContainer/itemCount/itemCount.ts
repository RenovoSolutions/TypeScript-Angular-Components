'use strict';

import * as angular from 'angular';

import { IDataSource } from '../dataSources/dataSources.module';
import { CardContainerController } from '../cardContainer';

export var moduleName: string = 'rl.ui.components.cardContainer.itemCount';
export var directiveName: string = 'rlItemCount';

export interface IItemCountScope extends angular.IScope {
	source: IDataSource<any>;
}

export function itemCount(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		require: '^^rlCardContainer',
		template: `
<p ng-show="!source.loadingDataSet">
	Showing <strong>{{source.dataSet.length}} of {{source.count}}</strong> total items
</p>`,
		scope: true,
		link(scope: IItemCountScope
			, element: angular.IAugmentedJQuery
			, attrs: angular.IAttributes
			, cardContainerController: CardContainerController): void {
			scope.source = cardContainerController.dataSource;
		}
	};
}

angular.module(moduleName, [])
	.directive(directiveName, itemCount);
