import * as angular from 'angular';
import * as _ from 'lodash';

import { IPromiseUtility, serviceName as promiseServiceName, moduleName as promiseModuleName} from '../../services/promise/promise.service';

import { buildButton, ButtonController } from '../button/button.ng1';

export const moduleName: string = 'rl.ui.components.buttonAsync';

export const componentName: string = 'rlButtonAsync';
export const controllerName: string = 'ButtonAsyncController';

export interface IButtonBindings {
	busy: boolean;
	action(...params: any[]): angular.IPromise<any> | void;
	size: string;
	type: string;
	ngDisabled: boolean;
	rightAligned: boolean;
}

export class ButtonAsyncController extends ButtonController {
	// bindings
	busy: boolean;
	action: { (...params: any[]): angular.IPromise<any> | void };
	rightAligned: boolean;

	static $inject: string[] = [promiseServiceName];
	constructor(private promiseUtility: IPromiseUtility) {
		super();
	}

	trigger(): void {
		if (!this.busy) {
			this.busy = true;

			let result: angular.IPromise<any> = <angular.IPromise<any>>this.action();
			if (this.promiseUtility.isPromise(result) && _.isFunction(result.finally)) {
				result.finally((): void => {
					this.busy = false;
				});
			} else if (<any>result !== true) {
				this.busy = false;
			}
		}
	}
}

const buttonAsync: angular.IComponentOptions = buildButton({
	template: require('./buttonAsync.html'),
	bindings: {
		busy: '<?',
		rightAligned: '<?',
	},
	controller: controllerName,
});

angular.module(moduleName, [promiseModuleName])
	.component(componentName, buttonAsync)
	.controller(controllerName, ButtonAsyncController);
