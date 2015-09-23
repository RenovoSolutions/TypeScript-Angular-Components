// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path="../../../libraries/typescript-angular-utilities/typings/utility.d.ts" />

/// <reference path="responsiveCardGrid.ts" />
/// <reference path="../../behaviors/autosave/autosave.ts" />

module rl.ui.components.responsiveCard {
	'use strict';

	export var directiveName: string = 'rlResponsiveCard';
	export var controllerName: string = 'ResponsiveCardController';

	import __jqueryHelper = rl.utilities.services.jquery;
	import __parentChildBehavior = rl.utilities.services.parentChildBehavior;
	import __promiseUtility = rl.utilities.services.promise;

	export interface ICardHeader {
		name: string;
		summary?: { (): string };
		summaryLength?: number;
		icon?: string;
		iconTooltip?: string;
		showIcon?: { (): boolean };
		count?: { (): number };
		status?: { (): string };
	}

	export interface ICardBehavior {
		autosave(): boolean;
		close(): void;
		open(): void;
		hoverIn(): void;
		hoverOut(): void;
		updateEndOfRowStatus(): void;
	}

	export interface IResponsiveCardController {
		autosaveLink: __parentChildBehavior.IChild<behaviors.autosave.IAutosaveBehavior>;
		showDetails: boolean;
		isHovering: boolean;
		cardGridController: responsiveCardGrid.IResponsiveCardGridController;

		toggle(): void;
		triggerHoverIn(): void;
		triggerHoverOut(): void;
	}

	export interface IResponsiveCardBindings {
		header: ICardHeader;
		validate(): boolean;
		save(): ng.IPromise<void>;
	}

	export class ResponsiveCardController implements IResponsiveCardController {
		// bindings
		header: ICardHeader;
		validate: { (): boolean };
		save: { (): ng.IPromise<void> };

		static $inject: string[] = ['$scope', '$q', '$element', __parentChildBehavior.serviceName, __promiseUtility.serviceName];
		constructor(private $scope: ng.IScope
			, private $q: ng.IQService
			, private $element: ng.IAugmentedJQuery
			, private parentChildBehavior: __parentChildBehavior.IParentChildBehaviorService
			, private promiseUtility: __promiseUtility.IPromiseUtility) {
			this.behavior = {
				autosave: this.autosave,
				close: this.close,
				open: this.open,
				hoverIn: this.hoverIn,
				hoverOut: this.hoverOut,
				updateEndOfRowStatus: this.updateEndOfRowStatus,
			};

			this.summary = this.header.summary != null ? this.header.summary : (): string => { return ''; };
			this.summaryLength = this.header.summaryLength != null ? this.header.summaryLength : 25;
			this.showIcon = this.header.showIcon != null ? this.header.showIcon : (): boolean => { return false; };

			this.cardGridController = $element.controller('rlResponsiveCardGrid');

			this.unregister = this.cardGridController.registerCard(this.behavior, $element);
			this.isEndOfRow = this.cardGridController.cardIsEndOfRow(<any>this.behavior);

			$scope.$on('$destroy', (): void => {
				this.unregister();
			});
		}

		private behavior: ICardBehavior;
		cardGridController: responsiveCardGrid.IResponsiveCardGridController;
		autosaveLink: __parentChildBehavior.IChild<behaviors.autosave.IAutosaveBehavior> = { viewData: null };
		showDetails: boolean;
		isHovering: boolean;
		isEndOfRow: boolean;
		summary: { (): string };
		summaryLength: number;
		showIcon: { (): boolean };

		private unregister: { (): void };

		toggle(): void {
			if (this.showDetails) {
				this.cardGridController.closeCard();
			} else {
				this.cardGridController.openCard(<any>this.behavior);
			}
		}

		triggerHoverIn(): void {
			this.cardGridController.hoverIn(<any>this.behavior);
		}

		triggerHoverOut(): void {
			this.cardGridController.hoverOut();
		}

		// behavior functions
		private autosave: { (): boolean } = (): boolean => {
			if (this.showDetails === false) {
				return true;
			}

			var behavior: behaviors.autosave.IAutosaveBehavior = this.parentChildBehavior.getChildBehavior(this.autosaveLink);
			return behavior.autosave();
		};

		private close: { (): void } = (): void => {
			this.showDetails = false;
		};

		private open: { (): void } = (): void => {
			this.showDetails = true;
		};

		private hoverIn: { (): void } = (): void => {
			this.isHovering = true;
		};

		private hoverOut: { (): void } = (): void => {
			this.isHovering = false;
		};

		private updateEndOfRowStatus: { (): void } = (): void => {
			this.isEndOfRow = this.cardGridController.cardIsEndOfRow(<any>this.behavior);
		};
	}

	responsiveCard.$inject = [__jqueryHelper.serviceName];
	export function responsiveCard(jqueryHelper: __jqueryHelper.IJQueryUtility): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			transclude: true,
			require: '^^rlResponsiveCardGrid',
			template: `
				<div class="smallCardsList col-lg-4 col-md-6 col-sm-12">
					<div class="small-card">
						<div class="small-card-header" ng-class="{ 'smallCardHeaderHover': card.isHovering }"
							ng-click="card.toggle()" ng-mouseover="card.triggerHoverIn()" ng-mouseleave="card.triggerHoverOut()">
							<div class="small-card-header-card-name">
								<span ng-bind-html="card.header.name"></span>
								<span ng-if="card.summary() | isEmpty:false"> - </span>
							</div>
							<div class="small-card-header-summary-text" ng-bind-html="card.summary()|truncate:card.summaryLength:true"></div>
							<span class="small-card-header-item-count" ng-if="card.header.count != null"><span class="badge">{{card.header.count()}}</span></span>
							<span class="small-card-header-item-count" ng-if="card.header.status != null"><span class="badge">{{card.header.status()}}</span></span>
							<span class="small-card-header-icon" ng-if="card.showIcon()"> <i class="small-card-indicator fa fa-2x fa-{{card.header.icon}}" title="{{card.header.iconTooltip}}" /></span>
						</div>
						<ng-form rl-autosave="card.autosaveLink" validate="card.validate()" save="card.save()">
							<div ng-if="card.showDetails">
								<div class="small-card-content">
									<div ng-transclude></div>
									<div class="clearfix"></div>
								</div>
							</div>
						</ng-form>
					</div>
				</div>
				<div class="clearfix" ng-if="card.isEndOfRow"></div>
			`,
			controller: controllerName,
			controllerAs: 'card',
			scope: {},
			bindToController: {
				header: '=',
				validate: '&',
				save: '&',
			},
		};
	}
}