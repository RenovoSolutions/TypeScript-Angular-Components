// /// <reference path='../../../typings/node/node.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import {IParentChildBehaviorService, IChild, serviceName as parentChildServiceName}  from '../../services/parentChild/parentChild.service';

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

export interface IFormBehavior {
	save(): angular.IPromise<void> | boolean;
}

export class FormController implements IFormBindings {
	saving: boolean;
	save: { (): void };
	form: IFormValidator;
	childLink: IChild<IFormBehavior>;

	autosave: IAutosaveService;

	static $inject: string[] = ['$element', '$scope', '$timeout', '$q', autosaveFactoryName, parentChildServiceName];
	constructor(private $element: angular.IAugmentedJQuery
		, private $scope: IFormScope
		, private $timeout: angular.ITimeoutService
		, private $q: angular.IQService
		, private autosaveFactory: IAutosaveServiceFactory
		, private parentChild: IParentChildBehaviorService) { }

	$onInit(): void {
		this.$timeout((): void => {
			this.form = this.$scope.rlForm;
			this.autosave = this.autosaveFactory.getInstance({
				save: this.saveForm.bind(this),
				contentForm: this.$scope.rlForm,
				triggers: 'none',
			});

			this.parentChild.registerChildBehavior(this.childLink, {
				save: this.autosave.validateAndSave.bind(this.autosave),
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
	template: `<form ng-transclude name="rlForm" ng-submit="controller.autosave.validateAndSave()"></form>`,
	controller: controllerName,
	controllerAs: 'controller',
	bindings: {
		saving: '=?',
		save: '&',
		form: '=?',
		childLink: '=?',
	},
};

angular.module(moduleName, [autosaveModule])
	.component(componentName, form)
	.controller(controllerName, FormController);
