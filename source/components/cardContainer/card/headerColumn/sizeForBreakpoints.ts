'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __string = services.string;

import { xs, sm, md, lg } from '../../../../services/breakpoints/breakpoint';
import { IBreakpointSize } from '../../column';

export var sizeForBreakpointsName: string = 'rlSizeForBreakpoints';

export interface ISizeForBreapointsAttrs extends angular.IAttributes {
	rlSizeForBreakpoints: string;


}

export interface ISizeForBreapointsStyling extends angular.IScope{
	styling: string;
	rlSizeForBreakpoints: ISizeForBreapointsAttrs;
}

sizeForBreakpoints.$inject = [ __string.serviceName];
export function sizeForBreakpoints(stringUtility: __string.IStringUtilityService): angular.IDirective {
	'use strict';
	return {
		restrict: 'A',
		link: linkDirective,
		scope: {
			styling: '@',
			rlSizeForBreakpoints:'='
		}
	};

	function linkDirective(scope: ISizeForBreapointsStyling
		, element: angular.IAugmentedJQuery
		, attributes: ISizeForBreapointsAttrs): void {
		var sizes: IBreakpointSize = scope.rlSizeForBreakpoints;

		var classes: any[] = [];
		classes.push(getColumnClass(sizes, xs));
		classes.push(getColumnClass(sizes, sm));
		classes.push(getColumnClass(sizes, md));
		classes.push(getColumnClass(sizes, lg));

		element.addClass(classes.join(' '));
		element.addClass(scope.styling);
	}

	function getColumnClass(columnSizes: IBreakpointSize, attribute: string): string {
		var value: number | string = columnSizes[attribute];
		if (value > 0 && value !== 'hidden') {
			return stringUtility.substitute('col-{0}-{1}', attribute, <string>value);
		} else {
			return 'hidden-' + attribute;
		}
	}
}
