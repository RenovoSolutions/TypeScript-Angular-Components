// uses typings/angularjs
// uses typescript-angular-utilities

// /// <reference path='../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../../../../services/breakpoints/breakpoint.ts' />
/// <reference path='../../column.ts' />

module rl.ui.components.cardContainer.card.headerColumn {
	'use strict';
	
	export var sizeForBreakpointsName: string = 'sizeForBreakpoints';
	
	import __string = rl.utilities.services.string;
	
	export interface ISizeForBreapointsAttrs extends ng.IAttributes {
		sizeForBreakpoints: string;
	}
	
	sizeForBreakpoints.$inject = ['$parse', __string.serviceName];
	export function sizeForBreakpoints($parse: ng.IParseService, stringUtility: __string.IStringUtilityService): ng.IDirective {
		'use strict';
		return {
			restrict: 'A',
			link: linkDirective,
		};
	
		function linkDirective(scope: ng.IScope
							, element: ng.IAugmentedJQuery
							, attributes: ISizeForBreapointsAttrs): void {
			var sizes: IBreakpointSize = $parse(attributes.sizeForBreakpoints)(scope);
	
			var classes: any[] = [];
			classes.push(getColumnClass(sizes, services.breakpoints.xs));
			classes.push(getColumnClass(sizes, services.breakpoints.sm));
			classes.push(getColumnClass(sizes, services.breakpoints.md));
			classes.push(getColumnClass(sizes, services.breakpoints.lg));
	
			element.addClass(classes.join(' '));
		}
	
		function getColumnClass(columnSizes: IBreakpointSize, breakpoint: string): string {
			var value: number | string = columnSizes[breakpoint];
			if (value > 0 && value !== 'hidden') {
				return stringUtility.substitute('col-{0}-{1}', breakpoint, <string>value);
			} else {
				return 'hidden-' + breakpoint;
			}
		}
	}
}