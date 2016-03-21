'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';

import __parentChild = services.parentChildBehavior;
import __objectUtility = services.object;

import {
	factoryName as autosaveFactoryName,
	moduleName as autosaveModuleName,
	IAutosaveService,
	IAutosaveServiceFactory,
	triggers,
} from '../../services/autosave/autosave.service';
import { IFormValidator } from '../../types/formValidators';

export let moduleName: string = 'rl.ui.behaviors.autosave';
export let directiveName: string = 'rlAutosave';
export let controllerName: string = 'AutosaveController';

export interface IAutosaveAttributes extends angular.IAttributes {
	rlAutosave: string;
	save: string;
	debounceDuration: string;
	triggers: string;
	saveWhenInvalid: string;
	ngSubmit: string;
}

export interface IAutosaveBehavior {
	autosave(): boolean;
}

export class AutosaveController {
	autosave: IAutosaveService;
	keyupListener: { (callback: triggers.IListener): triggers.IClearListener };

	form: IFormValidator;

	static $inject: string[] = ['$scope'
							, '$attrs'
							, '$parse'
							, '$element'
							, '$timeout'
							, autosaveFactoryName
							, __parentChild.serviceName
							, __objectUtility.serviceName];
	constructor(private $scope: angular.IScope
		, private $attrs: IAutosaveAttributes
		, private $parse: angular.IParseService
		, private $element: angular.IAugmentedJQuery
		, private $timeout: angular.ITimeoutService
		, private autosaveFactory: IAutosaveServiceFactory
		, private parentChildBehavior: __parentChild.IParentChildBehaviorService
		, private objectUtility: __objectUtility.IObjectUtility) {}

	$onInit(): void {
		this.keyupListener = (callback: triggers.IListener): triggers.IClearListener => {
			this.$element.on('keyup', (): void => { this.$scope.$apply(callback); });
			return (): void => {
				this.$element.off('keyup');
			};
		};

		let saveExpression: angular.ICompiledExpression = this.$parse(this.$attrs.save);
		let save: { (): angular.IPromise<void> } = (): angular.IPromise<void> => {
			return saveExpression(this.$scope);
		};

		let debounce: number = this.$parse(this.$attrs.debounceDuration)(this.$scope);

		this.autosave = this.autosaveFactory.getInstance({
			save: save,
			contentForm: this.form,
			debounceDuration: debounce,
			triggers: this.$attrs.triggers,
			setChangeListener: this.keyupListener,
			saveWhenInvalid: this.$parse(this.$attrs.saveWhenInvalid)(this.$scope),
		});

		let behavior: IAutosaveBehavior = {
			autosave: this.autosave.autosave,
		};

		// register autosave behavior and assign the value back to the parent
		let childLink: any = this.$parse(this.$attrs.rlAutosave)(this.$scope);
		this.parentChildBehavior.registerChildBehavior(childLink, behavior);
	}
}

export function autosave(): angular.IDirective {
	'use strict';
	return {
		restrict: 'A',
		priority: 1000,
		require: {
			autosaveController: 'rlAutosave',
			form: '?form',
		},
		controller: controllerName,
		bindToController: true,
	};
}

angular.module(moduleName, [
	autosaveModuleName,
	__objectUtility.moduleName,
	__parentChild.moduleName,
])
	.directive(directiveName, autosave)
	.controller(controllerName, AutosaveController);
