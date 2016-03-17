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

export var moduleName: string = 'rl.ui.behaviors.autosave';
export var directiveName: string = 'rlAutosave';
export var controllerName: string = 'AutosaveController';

export interface IAutosaveAttributes extends angular.IAttributes {
	rlAutosave: string;
	save: string;
	debounceDuration: string;
	triggers: string;
}

export interface IAutosaveBehavior {
	autosave(): boolean;
}

export class AutosaveController {
	autosave: IAutosaveService;
	keyupListener: { (callback: triggers.IChangeListener): triggers.IClearChangeListener };

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
		this.keyupListener = (callback: triggers.IChangeListener): triggers.IClearChangeListener => {
			this.$element.on('keyup', (): void => { this.$scope.$apply(callback); });
			return (): void => {
				this.$element.off('keyup');
			};
		};

		var hasValidator: boolean = this.objectUtility.isNullOrWhitespace(this.$attrs.validate) === false;

		var saveExpression: angular.ICompiledExpression = this.$parse(this.$attrs.save);
		var save: { (): angular.IPromise<void> } = (): angular.IPromise<void> => {
			return saveExpression(this.$scope);
		};

		let debounce: number = this.$parse(this.$attrs.debounceDuration)(this.$scope);

		this.autosave = this.autosaveFactory.getInstance({
			save: save,
			contentForm: this.form,
			debounceDuration: debounce,
			triggers: this.$attrs.triggers,
			setChangeListener: this.keyupListener,
		});

		var behavior: IAutosaveBehavior = {
			autosave: this.autosave.autosave,
		};

		// register autosave behavior and assign the value back to the parent
		var childLink: any = this.$parse(this.$attrs.rlAutosave)(this.$scope);
		this.parentChildBehavior.registerChildBehavior(childLink, behavior);
	}
}

export function autosave(): angular.IDirective {
	'use strict';
	return {
		restrict: 'A',
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
