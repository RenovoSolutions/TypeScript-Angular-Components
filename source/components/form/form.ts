// /// <reference path='../../../typings/node/node.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { IFormValidator } from '../../types/formValidators';
import { IAutosaveService, IAutosaveServiceFactory, factoryName as autosaveFactoryName, moduleName as autosaveModule } from '../../services/autosave/autosave.service';

export let moduleName: string = 'rl.ui.components.form';
export let componentName: string = 'rlForm';
export let controllerName: string = 'rlFormController';

export interface IFormBindings {
	saving: boolean;
	save(): void;
}

export interface IFormScope extends angular.IScope {
	rlForm: IFormValidator;
}

export class FormController implements IFormBindings {
	saving: boolean;
	save: { (): void };
	form: IFormValidator;

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
			if (!this.$scope.$$phase) {
				this.$scope.$apply();
			}
		});

		this.$timeout((): void => {
			this.form = this.$scope.rlForm;
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
	template: `<form ng-transclude name="rlForm"></form>`,
	controller: controllerName,
	controllerAs: 'controller',
	bindings: {
		saving: '=?',
		save: '&',
		form: '=?',
	},
};

angular.module(moduleName, [autosaveModule])
	.component(componentName, form)
	.controller(controllerName, FormController);
