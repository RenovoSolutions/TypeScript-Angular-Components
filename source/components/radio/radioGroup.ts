'use strict';

import * as ng from 'angular';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __guid = services.guid;

export var directiveName: string = 'rlRadioGroup';
export var controllerName: string = 'RadioGroupController';

export interface IRadioGroupAttributes extends ng.IAttributes {
	rlRadioGroup: string;
	name: string;
}

export class RadioGroup {
	get selection(): any {
		return this.ngModel.$viewValue;
	}

	set selection(value: any) {
		this.ngModel.$setViewValue(value);
	}

	constructor(private ngModel: ng.INgModelController, public name?: string) {}
}

export class RadioGroupController {
	group: RadioGroup;
	ngModel: ng.INgModelController;

	static $inject: string[] = ['$attrs', __object.serviceName];
	constructor(private $attrs: IRadioGroupAttributes
			, private object: __object.IObjectUtility) {}

	$onInit(): void {
		let name: string;
		if (!this.object.isNullOrWhitespace(this.$attrs.rlRadioGroup)) {
			name = this.$attrs.rlRadioGroup;
		} else if (!this.object.isNullOrWhitespace(this.$attrs.name)) {
			name = this.$attrs.name;
		} else {
			name = 'RadioGroup-' + __guid.guid.random();
		}

		this.group = new RadioGroup(this.ngModel, name);
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
