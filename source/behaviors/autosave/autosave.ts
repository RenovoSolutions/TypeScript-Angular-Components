'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';

export var moduleName: string = 'rl.ui.behaviors.autosave';
export var directiveName: string = 'rlAutosave';
export var controllerName: string = 'AutosaveController';

import __autosave = services.autosave;
import __parentChild = services.parentChildBehavior;
import __objectUtility = services.object;
import __autosaveAction = services.autosaveAction;

export interface IAutosaveAttributes extends angular.IAttributes {
	rlAutosave: string;
	validate: string;
	save: string;
	debounceDuration: string;
}

export interface IAutosaveBehavior {
	autosave(): boolean;
}

export class AutosaveController {
	private debounceDuration: number = 1000;
	private timer: angular.IPromise<void>;
	private autosave: __autosave.IAutosaveService;
	setKeyUpListener: { (callback: {(): void}): void };
	clearKeyUpListener: { (): void };

	static $inject: string[] = ['$scope'
							, '$attrs'
							, '$parse'
							, '$element'
							, '$timeout'
							, __autosave.factoryName
							, __parentChild.serviceName
							, __objectUtility.serviceName
							, __autosaveAction.serviceName];
	constructor(private $scope: angular.IScope
		, $attrs: IAutosaveAttributes
		, $parse: angular.IParseService
		, private $element: angular.IAugmentedJQuery
		, private $timeout: angular.ITimeoutService
		, autosaveFactory: __autosave.IAutosaveServiceFactory
		, parentChildBehavior: __parentChild.IParentChildBehaviorService
		, objectUtility: __objectUtility.IObjectUtility) {
		var contentForm: angular.IFormController = $element.controller('form');

		var hasValidator: boolean = objectUtility.isNullOrWhitespace($attrs.validate) === false;

		var validateExpression: angular.ICompiledExpression = $parse($attrs.validate);
		var validate: { (): boolean };

		if (hasValidator) {
			validate = (): boolean => {
				return validateExpression($scope);
			};
		}

		var saveExpression: angular.ICompiledExpression = $parse($attrs.save);
		var save: { (): angular.IPromise<void> } = (): angular.IPromise<void> => {
			return saveExpression($scope);
		};

		this.autosave = autosaveFactory.getInstance(save, contentForm, validate);

		var behavior: IAutosaveBehavior = {
			autosave: this.autosave.autosave,
		};

		// register autosave behavior and assign the value back to the parent
		var childLink: any = $parse($attrs.rlAutosave)($scope);
		parentChildBehavior.registerChildBehavior(childLink, behavior);

		let debounce: number = $parse($attrs.debounceDuration)($scope);
		this.debounceDuration = debounce != null ? debounce : this.debounceDuration;

		this.defaultListenerFunctions();

		$scope.$watch((): boolean => { return contentForm.$dirty; }, (value: boolean) => {
			if (value) {
				this.setTimer();

				this.setKeyUpListener((): void => {
					$timeout.cancel(this.timer);
					this.setTimer();
				});
			}
		});
	}

	private setTimer(): void {
		this.timer = this.$timeout((): void => {
			this.clearKeyUpListener();
			this.autosave.autosave();
		}, this.debounceDuration);
	}

	private defaultListenerFunctions(): void {
		if (this.setKeyUpListener == null) {
			this.setKeyUpListener = (): void => { console.log('JQuery not initialized'); };
		}
		if (this.clearKeyUpListener == null) {
			this.clearKeyUpListener = (): void => { console.log('No lisener registered'); };
		}
	}
}

export function autosave(): angular.IDirective {
	'use strict';
	return {
		restrict: 'A',
		require: ['rlAutosave', '?ngForm'],
		controller: controllerName,
		link(scope: any, element: angular.IAugmentedJQuery, attrs: any, controllers: any[]): void {
			let autosaveController: AutosaveController = controllers[0];
			autosaveController.setKeyUpListener = (callback: { (): void }): void => {
				element.on('keyup', callback);
			};
			autosaveController.clearKeyUpListener = (): void => {
				element.off('keyup');
			};
		},
	};
}

angular.module(moduleName, [
	__autosave.moduleName,
	__autosaveAction.moduleName,
	__objectUtility.moduleName,
	__parentChild.moduleName,
])
	.directive(directiveName, autosave)
	.controller(controllerName, AutosaveController);
