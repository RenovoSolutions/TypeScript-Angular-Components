'use strict';

import * as ng from 'angular';

import { services } from 'typescript-angular-utilities';
import __object = services.object;

export var directiveName: string = 'rlRadioGroup';
export var controllerName: string = 'RadioGroupController';

export interface IRadioGroupAttributes extends ng.IAttributes {
	rlRadioGroup: string;
	name: string;
}

export class RadioGroup {
	selection: any;

	constructor($scope: ng.IScope, ngModel: ng.INgModelController, public name?: string) {
		$scope.$watch((): any => { return ngModel.$viewValue; }, (value: any): void => {
			this.selection = value;
		});

		$scope.$watch((): any => { return this.selection; }, (value: any): void => {
			ngModel.$setViewValue(value);
		});
	}
}

export class RadioGroupController {
	private static nextId: number = 1;
	group: RadioGroup;

	static $inject: string[] = ['$scope', '$attrs', '$element', __object.serviceName];
	constructor($scope: ng.IScope, $attrs: IRadioGroupAttributes, $element: ng.IAugmentedJQuery, object: __object.IObjectUtility) {
		let name: string;
		if (!object.isNullOrWhitespace($attrs.rlRadioGroup)) {
			name = $attrs.rlRadioGroup;
		} else if (!object.isNullOrWhitespace($attrs.name)) {
			name = $attrs.name;
		} else {
			name = 'RadioGroup' + this.getNextId();
		}

		let ngModel: ng.INgModelController = $element.controller('ngModel');
		this.group = new RadioGroup($scope, ngModel, name);
	}

	registerButton(): RadioGroup {
		return this.group;
	}

	private getNextId(): string {
		let nextId: string = RadioGroupController.nextId.toString();
		RadioGroupController.nextId++;
		return nextId;
	}
}

export function radioGroup(): ng.IDirective {
	'use strict';
	return {
		restrict: 'AE',
		require: 'ngModel',
		controller: controllerName,
	};
}
