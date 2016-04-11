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
	ngModel: ng.INgModelController;

	static $inject: string[] = ['$scope', '$attrs', __object.serviceName];
	constructor(private $scope: ng.IScope
			, private $attrs: IRadioGroupAttributes
			, private object: __object.IObjectUtility) {}

	$onInit(): void {
		let name: string;
		if (!this.object.isNullOrWhitespace(this.$attrs.rlRadioGroup)) {
			name = this.$attrs.rlRadioGroup;
		} else if (!this.object.isNullOrWhitespace(this.$attrs.name)) {
			name = this.$attrs.name;
		} else {
			name = 'RadioGroup' + this.getNextId();
		}

		this.group = new RadioGroup(this.ngModel, name);
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
		require: { ngModel: 'ngModel' },
		controller: controllerName,
		bindToController: true,
	};
}
