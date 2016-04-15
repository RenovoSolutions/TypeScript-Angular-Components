// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import * as $ from 'jquery';

import { services } from 'typescript-angular-utilities';
import __promise = services.promise;
import __object = services.object;

import { buildButton } from '../button/button';
import { ButtonAsyncController } from '../buttonAsync/buttonAsync';

export let moduleName: string = 'rl.ui.components.longClickButton';
export let componentName: string = 'rlLongClickButton';
export let controllerName: string = 'LongClickButtonController';

export class LongClickButtonController extends ButtonAsyncController {
	// bindings
	text: string;
	onShortClickText: string;
	icon: string;

	private interval: number = 25;
	duration: number = 1500;
	buttonText: string;
	width: number;
	active: boolean;
	actionProgress: number;
	private actionInterval: angular.IPromise<void>;

	static $inject: string[] = ['$interval', '$timeout', __object.serviceName, __promise.serviceName];
	constructor(private $interval: angular.IIntervalService
			, private $timeout: angular.ITimeoutService
			, private objectUtility: __object.IObjectUtility
			, promise: __promise.IPromiseUtility) {
		super(promise);
		this.buttonText = this.text;
		this.updateProgressBarWidth();
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
				this.buttonText = this.text;
				this.updateProgressBarWidth();
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
		if (this.objectUtility.isNullOrEmpty(this.onShortClickText) === false) {
			this.buttonText = this.onShortClickText;
			this.updateProgressBarWidth();
		}
	}

	private updateProgressBarWidth(): void {
		this.$timeout((): void => {
			this.width = $('#actionButton').outerWidth();
		});
	}
}

let longClickButton: angular.IComponentOptions = buildButton({
	template: require('./longClickButton.html'),
	controller: controllerName,
	bindings: {
		text: '@',
		onShortClickText: '@',
		icon: '@',
		busy: '<?',
		rightAligned: '<?',
	},
});

angular.module(moduleName, [__object.moduleName])
	.component(componentName, longClickButton)
	.controller(controllerName, LongClickButtonController);
