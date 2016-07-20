import * as angular from 'angular';
import * as _ from 'lodash';

import { IPromiseUtility, serviceName as promiseServiceName, moduleName as promiseModuleName} from '../../../services/promise/promise.service';

import { buildButton, ButtonController } from '../button/button.ng1';

export const moduleName: string = 'rl.ui.components.buttonAsync';

export const componentName: string = 'rlButtonAsync';
export const controllerName: string = 'ButtonAsyncController';

export interface IButtonBindings {
	busy: boolean;
	action(...params: any[]): Promise<any> | void;
	size: string;
	type: string;
	ngDisabled: boolean;
}

export class ButtonAsyncController extends ButtonController {
	// bindings
	busy: boolean;
	action: { (...params: any[]): Promise<any> | void };

	static $inject: string[] = [promiseServiceName];
	constructor(private promiseUtility: IPromiseUtility) {
		super();
	}

	trigger(): Promise<any> {
		if (!this.busy) {
			this.busy = true;

			let result: Promise<any> = <Promise<any>>this.action();

			if (this.promiseUtility.isPromise(result)) {
				return result.then((): void => {
					this.busy = false;
				}).catch((error) => {
					this.busy = false;
					throw error;
				});
			} else if (<any>result !== true) {
				this.busy = false;
			}
		}

		return null;
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
