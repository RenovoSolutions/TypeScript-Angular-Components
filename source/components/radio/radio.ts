'use strict';

import * as ng from 'angular';

import { RadioGroup, RadioGroupController } from './radioGroup';

export var directiveName: string = 'rlRadio';
export var controllerName: string = 'RadioController';

export class RadioController {
	radioGroup: RadioGroup;

	static $inject: string[] = ['$scope', '$element'];
	constructor($scope: ng.IScope, $element: ng.IAugmentedJQuery) {
		let radioGroupController: RadioGroupController = $element.controller('rlRadioGroup');

		if (radioGroupController != null) {
			this.radioGroup = radioGroupController.registerButton();
		} else {
			let ngModel: ng.INgModelController = $element.controller('ngModel');
			this.radioGroup = new RadioGroup($scope, ngModel);
		}
	}
}

export function radio(): ng.IDirective {
	'use strict';
	return {
		restrict: 'E',
		require: ['?^^rlRadioGroup', '?ngModel'],
		transclude: true,
		template: `
			<label>
				<input id="radio" type="radio" name="{{radio.radioGroup.name}}" ng-model="radio.radioGroup.selection" ng-value="radio.value" />
				<span ng-transclude></div>
			</label>
		`,
		controller: controllerName,
		controllerAs: 'radio',
		scope: true,
		bindToController: {
			value: '=',
		},
	};
}
