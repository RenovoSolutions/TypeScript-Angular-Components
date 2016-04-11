'use strict';

import * as ng from 'angular';

import { RadioGroup, RadioGroupController } from './radioGroup';

export let componentName: string = 'rlRadio';
export let controllerName: string = 'RadioController';

export class RadioController {
	radioGroup: RadioGroup;
	groupController: RadioGroupController;
	ngModel: ng.INgModelController;

	static $inject: string[] = ['$scope'];
	constructor(private $scope: ng.IScope) { }

	$onInit(): void {
		if (this.groupController != null) {
			this.radioGroup = this.groupController.group;
		} else {
			this.radioGroup = new RadioGroup(this.$scope, this.ngModel);
		}
	}
}

export let radio: ng.IComponentOptions = {
	require: {
		groupController: '?^^rlRadioGroup',
		ngModel: '?ngModel',
	},
	transclude: true,
	template: `
		<label>
			<input id="radio" type="radio" name="{{radio.radioGroup.name}}" ng-model="radio.radioGroup.selection" ng-value="radio.value" />
			<span ng-transclude></div>
		</label>
	`,
	controller: controllerName,
	controllerAs: 'radio',
	bindings: {
		value: '=',
	},
};
