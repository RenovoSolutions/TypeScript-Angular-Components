'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __string = services.string;

import { xs, sm, md, lg } from '../../../../services/breakpoints/breakpoint';
import { IBreakpointSize } from '../../column';

export var sizeForBreakpointsName: string = 'rlSizeForBreakpoints';

export interface ISizeForBreapointsAttrs extends angular.IAttributes {
	sizeForBreakpoints: string;
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
		var sizes: IBreakpointSize = $parse(attributes.sizeForBreakpoints)(scope);

		var classes: any[] = [];
		classes.push(getColumnClass(sizes, xs));
		classes.push(getColumnClass(sizes, sm));
		classes.push(getColumnClass(sizes, md));
		classes.push(getColumnClass(sizes, lg));

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
