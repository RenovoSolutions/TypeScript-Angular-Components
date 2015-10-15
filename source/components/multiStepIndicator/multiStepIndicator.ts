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
	onClick?: {(): angular.IPromise<void> | void};
	stateName?: string;
	isCompleted?: boolean;
	isCurrent?: boolean;
}

export interface IConfiguredStep extends IStep {
	inactive: boolean;
	loading: boolean;
}

export class MultiStepIndicatorController {
	steps: IConfiguredStep[];

	static $inject: string[] = ['$state', '$q', __object.serviceName];
	constructor(private $state: angular.ui.IStateService
			, private $q: angular.IQService
			, private object: __object.IObjectUtility) {
		this.configureSteps();
	}

	onClick(step: IConfiguredStep): void {
		if (!this.anyLoading()) {
			step.loading = true;
			this.$q.when(step.onClick()).then((): void => {
				step.loading = false;
			});
		}
	}

	anyLoading(): boolean {
		return _.any(this.steps, (step: IConfiguredStep): boolean => {
			return step.loading;
		});
	}

	private configureSteps(): void {
		_.each(this.steps, (step: IConfiguredStep): void => {
			if (!_.isFunction(step.onClick)) {
				if (this.object.isNullOrWhitespace(step.stateName)) {
					step.inactive = true;
				} else {
					step.onClick = (): void => { this.redirectToState(step); };

					if (this.$state.includes(step.stateName)) {
						step.isCurrent = true;
					}
				}
			}
		});
	}

	private redirectToState: { (step: IConfiguredStep): void } = (step: IConfiguredStep): angular.IPromise<void> => {
		return this.$state.go(step.stateName).then((): void => {
			this.clearCurrentState();
			step.isCurrent = true;
		});
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
