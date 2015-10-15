// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';

export var moduleName: string = 'rl.ui.components.multiStepIndicator';
export var directiveName: string = 'rlMultiStepIndicator';
export var controllerName: string = 'MultiStepIndicatorController';

import __object = services.object;

export interface IStep {
	title: string;
	subtitle?: string;
	onClick?: {(): void};
	stateName?: string;
	isCompleted?: boolean;
	isCurrent?: boolean;
}

interface IConfiguredStep extends IStep {
	inactive: boolean;
}

export class MultiStepIndicatorController {
	steps: IStep[];

	static $inject: string[] = ['$state', __object.serviceName];
	constructor(private $state: angular.ui.IStateService
			, private object: __object.IObjectUtility) {
		this.configureSteps();
	}

	private configureSteps(): void {
		_.each(this.steps, (step: IStep): void => {
			if (!_.isFunction(step.onClick)) {
				if (this.object.isNullOrWhitespace(step.stateName)) {
					(<IConfiguredStep>step).inactive = true;
				} else {
					step.onClick = (): void => { this.redirectToState(step); };

					if (this.$state.includes(step.stateName)) {
						step.isCurrent = true;
					}
				}
			}
		});
	}

	private redirectToState: { (step: IStep): void } = (step: IStep): void => {
		this.clearCurrentState();
		this.$state.go(step.stateName);
		step.isCurrent = true;
	}

	private clearCurrentState(): void {
		_.each(this.steps, (step: IStep): void => {
			step.isCurrent = false;
		});
	}
}

function multiStepIndicator(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./multiStepIndicator.html'),
		controller: controllerName,
		controllerAs: 'breadcrumb',
		scope: {},
		bindToController: {
			steps: '=',
			numbered: '=',
		},
	};
}

angular.module(moduleName, [__object.moduleName])
	.directive(directiveName, multiStepIndicator)
	.controller(controllerName, MultiStepIndicatorController);
