// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import __object = services.object;
import __guid = services.guid;
import __array = services.array;

import { INgModelValidator } from '../../types/formValidators';
import { directiveName as requiredDirectiveName, RequiredController } from '../../behaviors/required/required';
import {
	IComponentValidator,
	IComponentValidatorFactory,
	factoryName as componentValidatorFactoryName,
	moduleName as componentValidatorModuleName,
} from '../../services/componentValidator/componentValidator.service';

export var moduleName: string = 'rl.ui.components.input';
export var controllerName: string = 'InputController';

export interface IInputBindings {
	validator: __validation.IValidationHandler;
	validators: __validation.IValidationHandler[];
	label: string;
	name: string;
}

export interface IInputAttributes extends angular.IAttributes {
	name: string;
}

export interface IInputOptions {
	template: string;
	controller?: string | Function;
	controllerAs?: string;
	bindings?: any;
}

export class InputController {
	// bindings
	validator: __validation.IValidationHandler;
	validators: __validation.IValidationHandler[];
	label: string;
	name: string;

	ngModel: INgModelValidator;
	required: RequiredController;
	inputValidator: IComponentValidator;
	inputType: string = 'input';

	get inputValue(): string {
		return this.ngModel.$viewValue;
	}

	set inputValue(value: string) {
		this.ngModel.$setViewValue(value);
	}

	static $inject: string[] = ['$scope', '$attrs', componentValidatorFactoryName];
	constructor(protected $scope: angular.IScope
			, protected $attrs: IInputAttributes
			, private componentValidatorFactory: IComponentValidatorFactory) { }

	$onInit(): void {
		let validators: __validation.IValidationHandler[] = [];

		if (!_.isUndefined(this.validator)) {
			validators = validators.concat(__array.arrayUtility.arrayify(this.validator));
		}

		if (!_.isUndefined(this.validators)) {
			validators = validators.concat(__array.arrayUtility.arrayify(this.validators));
		}

		if (__object.objectUtility.isNullOrEmpty(this.$attrs.name)) {
			this.$attrs.$set('name', this.inputType + '-' + __guid.guid.random());
		}

		if (this.required != null) {
			validators.push({
				name: 'rlRequired',
				validate: (): boolean => { return !__object.objectUtility.isNullOrEmpty(this.ngModel.$viewValue); },
				errorMessage: this.required.message,
			});
		}

		if (_.some(validators)) {
			this.inputValidator = this.componentValidatorFactory.getInstance({
				ngModel: this.ngModel,
				$scope: this.$scope,
				validators: validators,
			});
		}
	}
}

let baseInputOptions: angular.IComponentOptions = {
	require: {
		ngModel: 'ngModel',
		required: '?' + requiredDirectiveName,
	},
	template: '',
	controller: controllerName,
	controllerAs: 'input',
	bindings: {
		validator: '<?',
		validators: '<?',
		label: '@',
		name: '@',
	},
};

export function buildInput(options: IInputOptions): angular.IComponentOptions {
	let clone: any = _.clone(baseInputOptions);
	clone.template = options.template;
	clone.controller = options.controller || clone.controller;
	clone.controllerAs = options.controllerAs || clone.controllerAs;
	clone.bindings = _.assign({}, clone.bindings, options.bindings);
	return clone;
}

angular.module(moduleName, [componentValidatorModuleName])
	.controller(controllerName, InputController);
