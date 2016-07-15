import * as angular from 'angular';
import * as _ from 'lodash';

import { IPromiseUtility, serviceName as promiseServiceName, moduleName as promiseModuleName} from '../../../services/promise/promise.service';

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
}

export class ButtonAsyncController extends ButtonController {
	// bindings
	busy: boolean;
	action: { (...params: any[]): angular.IPromise<any> | void };

	static $inject: string[] = [promiseServiceName];
	constructor(private promiseUtility: IPromiseUtility) {
		super();
	}

	trigger(): void {
		if (!this.busy) {
			this.busy = true;

			let result: angular.IPromise<any> = <angular.IPromise<any>>this.action();
			if (this.promiseUtility.isPromise(result)) {
				result.then((): void => {
					this.busy = false;
				}).catch((error) => {
					this.busy = false;
					throw error; //do not swallow error here, allow it to be handled gracefully further down the chain
				});
			} else if (<any>result !== true) {
				this.busy = false;
			}
		}
	}
}

const buttonAsync: angular.IComponentOptions = buildButton({
	template: require('./buttonAsync.ng1.html'),
	bindings: {
		busy: '<?',
	},
	controller: controllerName,
});

angular.module(moduleName, [promiseModuleName])
	.component(componentName, buttonAsync)
	.controller(controllerName, ButtonAsyncController);
