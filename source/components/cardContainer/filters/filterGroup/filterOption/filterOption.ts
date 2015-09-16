// uses typings/angularjs

// /// <reference path='../../../typings/angularjs/angular.d.ts' />

module rl.ui.components.cardContainer.filters.filterGroup.filterOption {
	'use strict';

	export var moduleName: string = 'rl.ui.components.cardContainer.filters.filterGroup.filterOption';
	export var directiveName: string = 'rlFilterOption';

	export function filterOption(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			template: `
				<div class="row filter-option" ng-class="{ 'active': isActive }" ng-click="activate()">
					<div class="col-sm-1">
						<i class='fa fa-arrow-right' ng-show="isActive == true"></i>
					</div>
					<div class="col-sm-1" ng-if="hasIcon" ng-bind-html="option.icon"></div>
					<div ng-class="{ 'col-sm-6': hasIcon, 'col-sm-7': !hasIcon }">
						{{option.label}}
					</div>
					<div class="col-sm-3 text-right" ng-show="option.count != null">
						({{option.count}})
					</div>
				</div>
			`,
			scope: {
				activate: '&',
				isActive: '=active',
				option: '=',
			},
		};
	}
	
	angular.module(moduleName, [])
		.directive(directiveName, filterOption);
}
