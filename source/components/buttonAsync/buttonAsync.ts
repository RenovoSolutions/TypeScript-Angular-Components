'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';

import __promiseUtility = services.promise;

export var moduleName: string = 'rl.ui.components.buttonAsync';

export var directiveName: string = 'rlButtonAsync';
export var controllerName: string = 'ButtonAsyncController';

export interface IButtonBindings {
	busy: boolean;
	action(...params: any[]): angular.IPromise<any> | void;
	size: string;
	type: string;
	ngDisabled: boolean;
	rightAligned: boolean;
}

export class ButtonAsyncController {
	// bindings
	busy: boolean;
	action: { (...params: any[]): angular.IPromise<any> | void };
	size: string;
	type: string;
	ngDisabled: boolean;
	rightAligned: boolean;

	static $inject: string[] = [__promiseUtility.serviceName];
	constructor(private promiseUtility: __promiseUtility.IPromiseUtility) {
		this.type = this.type != null ? this.type : 'default';
		this.sizeClass = this.size != null ? 'btn-' + this.size : null;
	}

	trigger(): void {
		if (!this.busy) {
			this.busy = true;

			var result: angular.IPromise<any> = <angular.IPromise<any>>this.action();
			if (this.promiseUtility.isPromise(result) && _.isFunction(result.finally)) {
				result.finally((): void => {
					this.busy = false;
				});
			} else if (<any>result !== true) {
				this.busy = false;
			}
		}
	}

	sizeClass: string;
}

function buttonAsync(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		transclude: true,
		template: require('./buttonAsync.html'),
		scope: {},
		bindToController: {
			busy: '<?',
			action: '&',
			type: '@',
			ngDisabled: '<?',
			rightAligned: '<?',
			size: '@',
		},
		controller: controllerName,
		controllerAs: 'button',
	};
}

angular.module(moduleName, [__promiseUtility.moduleName])
	.directive(directiveName, buttonAsync)
	.controller(controllerName, ButtonAsyncController);
