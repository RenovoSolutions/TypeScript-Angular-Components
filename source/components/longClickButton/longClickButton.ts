// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import * as $ from 'jquery';

import { services } from 'typescript-angular-utilities';

export var moduleName: string = 'rl.ui.components.longClickButton';
export var directiveName: string = 'rlLongClickButton';
export var controllerName: string = 'LongClickButtonController';

import __object = services.object;

export class LongClickButtonController {
	// bindings
	onTriggered: {(): void};
	text: string;
	onShortClickText: string;
	type: string;

	private interval: number = 25;
	duration: number = 1500;
	buttonText: string;
	buttonClass: string;
	width: number;
	active: boolean;
	actionProgress: number;
	private actionInterval: angular.IPromise<void>;

	static $inject: string[] = ['$scope', '$interval', '$timeout', __object.serviceName];
	constructor($scope: angular.IScope
			, private $interval: angular.IIntervalService
			, private $timeout: angular.ITimeoutService
			, private objectUtility: __object.IObjectUtility) {
		this.buttonText = this.text;
		if (this.type != null) {
			this.buttonClass = this.type;
		} else {
			this.buttonClass = 'default';
		}

		$scope.$watch((): string => { return this.buttonText; }, (): void => {
			$timeout((): void => {
				this.width = $('#actionButton').outerWidth();
			});
		});
	}

	startAction(): void {
		if (this.active) {
			return;
		}

		this.actionProgress = 0;
		this.active = true;

		this.actionInterval = this.$interval((): void => {
			this.actionProgress += this.interval;
			if (this.actionProgress >= this.duration) {
				this.cleanup();
				this.buttonText = this.text;
				this.onTriggered();
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
		}
	}
}

function longClickButton(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./longClickButton.html'),
		controller: controllerName,
		controllerAs: 'button',
		scope: {},
		bindToController: {
			onTriggered: '&',
			text: '@',
			onShortClickText: '@',
			buttonIcon: '@',
			spinner: '=',
			rightAligned: '=',
			type: '@',
		},
	};
}

angular.module(moduleName, [__object.moduleName])
	.directive(directiveName, longClickButton)
	.controller(controllerName, LongClickButtonController);
