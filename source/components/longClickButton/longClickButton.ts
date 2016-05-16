// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __promise = services.promise;
import __object = services.object;
import __notification = services.notification;

import { buildButton } from '../button/button';
import { ButtonAsyncController } from '../buttonAsync/buttonAsync';

export let moduleName: string = 'rl.ui.components.longClickButton';
export let componentName: string = 'rlLongClickButton';
export let controllerName: string = 'LongClickButtonController';

export class LongClickButtonController extends ButtonAsyncController {
	// bindings
	warning: string;
	text: string;
	onShortClickText: string;
	icon: string;

	private interval: number = 25;
	duration: number = 2000; // Should match the CSS animation time
	active: boolean;
	actionProgress: number;
	private actionInterval: angular.IPromise<void>;

	static $inject: string[] = ['$interval', '$timeout', __object.serviceName, __promise.serviceName, __notification.serviceName];
	constructor(private $interval: angular.IIntervalService
			, private $timeout: angular.ITimeoutService
			, private objectUtility: __object.IObjectUtility
			, promise: __promise.IPromiseUtility
			, private notification: __notification.INotificationService) {
		super(promise);
	}

	startAction(): void {
		if (this.active || this.busy) {
			return;
		}

		this.actionProgress = 0;
		this.active = true;

		this.actionInterval = this.$interval((): void => {
			this.actionProgress += this.interval;
			if (this.actionProgress >= this.duration) {
				this.cleanup();
				this.trigger();
			}
		}, this.interval);
	}

	stopAction(): void {
		if (this.active) {
			if (this.actionProgress < this.duration) {
				this.warn();
			}

			this.cleanup();
		}
	}

	private cleanup(): void {
		this.$interval.cancel(this.actionInterval);
		this.actionProgress = 0;
		this.active = false;
	}

	private warn(): void {
		const warning: string = this.warning || this.onShortClickText || 'Press and hold to complete this action';
		this.notification.warning(warning);
	}
}

let longClickButton: angular.IComponentOptions = buildButton({
	template: require('./longClickButton.html'),
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

angular.module(moduleName, [__object.moduleName])
	.component(componentName, longClickButton)
	.controller(controllerName, LongClickButtonController);
