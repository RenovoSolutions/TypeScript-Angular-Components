// /// <reference path='../../../typings/node/node.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __guid = services.guid;

import { IFormValidator } from '../../types/formValidators';
import { IAutosaveService, IAutosaveServiceFactory, factoryName as autosaveFactoryName, moduleName as autosaveModule } from '../../services/autosave/autosave.service';

export let moduleName: string = 'rl.ui.components.form';
export let componentName: string = 'rlForm';
export let controllerName: string = 'rlFormController';

export interface IFormBindings {
	saving: boolean;
	save(): void;
	name: string;
}

export interface IFormScope extends angular.IScope {
	rlForm: IFormValidator;
}

export class FormController implements IFormBindings {
	saving: boolean;
	save: { (): void };
	name: string;

	autosave: IAutosaveService;

	static $inject: string[] = ['$element', '$scope', '$timeout', '$q', autosaveFactoryName];
	constructor(private $element: angular.IAugmentedJQuery
			, private $scope: IFormScope
			, private $timeout: angular.ITimeoutService
			, private $q: angular.IQService
			, private autosaveFactory: IAutosaveServiceFactory) { }

	$onInit(): void {
		this.$element.find('form').on('submit', (): void => {
			this.autosave.validateAndSave();
			this.$scope.$apply();
		});

		if (__object.objectUtility.isNullOrEmpty(this.name)) {
			this.name = 'form-' + __guid.guid.random();
		}

		this.$timeout((): void => {
			this.autosave = this.autosaveFactory.getInstance({
				save: this.saveForm.bind(this),
				contentForm: this.$scope.rlForm,
				triggers: 'none',
			});
		});
	}

	saveForm(): angular.IPromise<void> {
		this.saving = true;
		return this.$q.when(this.save()).then((): void => {
			this.saving = false;
		}).catch((): void => { this.saving = false; });
	}
}

let form: angular.IComponentOptions = {
	transclude: true,
	template: `<form ng-transclude name="{{controller.name}}"></form>`,
	controller: controllerName,
	controllerAs: 'controller',
	bindings: {
		saving: '=?',
		save: '&',
		name: '@',
	},
};

angular.module(moduleName, [autosaveModule])
	.component(componentName, form)
	.controller(controllerName, FormController);
