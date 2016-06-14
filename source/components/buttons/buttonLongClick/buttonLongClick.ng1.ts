import * as angular from 'angular';

import { services, downgrade } from 'typescript-angular-utilities';
import __object = services.object;
import __notification = services.notification;

import { IPromiseUtility, serviceName as promiseServiceName, moduleName as promiseModuleName} from '../../../services/promise/promise.service';


import { buildButton } from '../button/button.ng1';
import { ButtonAsyncController } from '../buttonAsync/buttonAsync.ng1';

export let moduleName: string = 'rl.ui.components.longClickButton';
export let componentName: string = 'rlLongClickButton';
export let controllerName: string = 'LongClickButtonController';

export class LongClickButtonController extends ButtonAsyncController {
	// bindings
	warning: string;
	text: string;
	onShortClickText: string;
	icon: string;

	duration: number = 2000; // Should match the CSS animation time
	active: boolean;
	private actionTimeout: angular.IPromise<void>;

	static $inject: string[] = ['$interval', '$timeout', downgrade.objectServiceName, promiseServiceName, downgrade.notificationServiceName];
	constructor(private $interval: angular.IIntervalService
			, private $timeout: angular.ITimeoutService
			, private objectUtility: __object.IObjectUtility
			, promise: IPromiseUtility
			, private notification: __notification.INotificationService) {
		super(promise);
	}

	startAction(): void {
		if (this.active || this.busy) {
			return;
		}

		this.active = true;

		this.actionTimeout = this.$timeout((): void => {
			this.cleanup();
			this.trigger();
		}, this.duration);
	}

	stopAction(): void {
		if (this.active) {
			if (this.actionTimeout != null) {
				this.warn();
			}

			this.cleanup();
		}
	}

	private cleanup(): void {
		this.$timeout.cancel(this.actionTimeout);
		this.actionTimeout = null;
		this.active = false;
	}

	private warn(): void {
		const warning: string = this.warning || this.onShortClickText || 'Press and hold to complete this action';
		this.notification.warning(warning);
	}
}

let longClickButton: angular.IComponentOptions = buildButton({
	template: require('./buttonLongClick.html'),
	controller: controllerName,
	bindings: {
		warning: '@',
		busy: '<?',
		rightAligned: '<?',
		// deprecated
		onShortClickText: '@',
		icon: '@',
		text: '@',
	},
});

angular.module(moduleName, [downgrade.moduleName, promiseModuleName])
	.component(componentName, longClickButton)
	.controller(controllerName, LongClickButtonController);
