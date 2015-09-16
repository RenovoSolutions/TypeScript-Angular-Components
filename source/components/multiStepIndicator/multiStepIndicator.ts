// uses typings/angular-ui-router
// uses typings/lodash
// uses typescript-angular-utilities

// /// <reference path='../../../typings/angular-ui-router/angular-ui-router.d.ts' />
// /// <reference path="../../../typings/lodash/lodash.d.ts" />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

module rl.ui.components.multiStepIndicator {
	'use strict';

	export var moduleName: string = 'rl.ui.components.multiStepIndicator';	
	export var directiveName: string = 'rlMultiStepIndicator';
	export var controllerName: string = 'MultiStepIndicatorController';
	
	import __object = rl.utilities.services.object;
	
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
		constructor(private $state: ng.ui.IStateService
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
	
	function multiStepIndicator(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			template: `
				<div class="multi-step" ng-class="{ 'numbered': breadcrumb.numbered }">
					<ol>
						<li ng-repeat="step in breadcrumb.steps" ng-click="step.onClick()"
							ng-class="{ 'completed': step.isCompleted, 'current': step.isCurrent, 'active': !step.inactive }">
							<div class="wrap">
								<p class="title">{{step.title}}</p>
								<p class="subtitle">{{step.subtitle}}</p>
							</div>
						</li>
					</ol>
				</div>
			`,
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
}
