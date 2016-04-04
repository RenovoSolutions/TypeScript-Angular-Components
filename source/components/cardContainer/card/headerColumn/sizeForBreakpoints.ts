'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __string = services.string;

import { xs, sm, md, lg, styling } from '../../../../services/breakpoints/breakpoint';
import { IBreakpointSize } from '../../column';

export var sizeForBreakpointsName: string = 'rlSizeForBreakpoints';

export interface ISizeForBreapointsAttrs extends angular.IAttributes {
	rlSizeForBreakpoints: string;

}

sizeForBreakpoints.$inject = ['$parse', __string.serviceName];
export function sizeForBreakpoints($parse: angular.IParseService, stringUtility: __string.IStringUtilityService): angular.IDirective {
	'use strict';
	return {
		restrict: 'A',
		link: linkDirective,
	};

	function linkDirective(scope: angular.IScope
		, element: angular.IAugmentedJQuery
		, attributes: ISizeForBreapointsAttrs): void {
		var sizes: IBreakpointSize = $parse(attributes.rlSizeForBreakpoints)(scope);

		var classes: any[] = [];
		classes.push(getColumnClass(sizes, xs));
		classes.push(getColumnClass(sizes, sm));
		classes.push(getColumnClass(sizes, md));
		classes.push(getColumnClass(sizes, lg));
		classes.push(getColumnClass(sizes, styling));

		element.addClass(classes.join(' '));
	}

	function getColumnClass(columnSizes: IBreakpointSize, attribute: string): string {
		var value: number | string = columnSizes[attribute];
		if (attribute === styling) {
			return value.toString();
		}
		if (value > 0 && value !== 'hidden') {
			return stringUtility.substitute('col-{0}-{1}', attribute, <string>value);
		} else {
			return 'hidden-' + attribute;
		}
	}
}
