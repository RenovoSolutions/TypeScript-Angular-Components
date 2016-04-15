'use strict';

import * as ng from 'angular';

import { RadioGroup, RadioGroupController } from './radioGroup';

export let componentName: string = 'rlRadio';
export let controllerName: string = 'RadioController';

export class RadioController {
	radioGroup: RadioGroup;
	groupController: RadioGroupController;
	ngModel: ng.INgModelController;

	$onInit(): void {
		if (this.groupController != null) {
			this.radioGroup = this.groupController.group;
		} else {
			this.radioGroup = new RadioGroup(this.ngModel);
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
			<input id="radio" type="radio" name="{{::radio.radioGroup.name}}" ng-model="radio.radioGroup.selection" ng-value="::radio.value" />
			<span ng-transclude></div>
		</label>
	`,
	controller: controllerName,
	controllerAs: 'radio',
	bindings: {
		value: '<',
	},
};
