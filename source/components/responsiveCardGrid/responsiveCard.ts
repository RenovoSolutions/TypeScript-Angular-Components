'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';

import { IResponsiveCardGridController } from './responsiveCardGrid';

import { serviceName as jqueryServiceName, IJQueryUtility } from '../../services/jquery/jquery.service';

import { IAutosaveBehavior } from '../../behaviors/autosave/autosave';

export var directiveName: string = 'rlResponsiveCard';
export var controllerName: string = 'ResponsiveCardController';

import __parentChildBehavior = services.parentChildBehavior;
import __promiseUtility = services.promise;

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
	autosaveLink: __parentChildBehavior.IChild<IAutosaveBehavior>;
	showDetails: boolean;
	isHovering: boolean;
	cardGridController: IResponsiveCardGridController;

	toggle(): void;
	triggerHoverIn(): void;
	triggerHoverOut(): void;
}

export interface IResponsiveCardBindings {
	header: ICardHeader;
	validate(): boolean;
	save(): angular.IPromise<void>;
}

export class ResponsiveCardController implements IResponsiveCardController {
	// bindings
	header: ICardHeader;
	validate: { (): boolean };
	save: { (): angular.IPromise<void> };

	static $inject: string[] = ['$scope', '$q', '$element', __parentChildBehavior.serviceName, __promiseUtility.serviceName];
	constructor(private $scope: angular.IScope
		, private $q: angular.IQService
		, private $element: angular.IAugmentedJQuery
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

		this.summary = this.header.summary || function(): string { return ''; };
		this.summaryLength = _.isUndefined(this.header.summaryLength) ? 25 : this.header.summaryLength;
		this.showIcon = this.header.showIcon || function(): boolean { return false; };

		this.cardGridController = $element.controller('rlResponsiveCardGrid');

		this.unregister = this.cardGridController.registerCard(this.behavior, $element);
		this.isEndOfRow = this.cardGridController.cardIsEndOfRow(<any>this.behavior);

		$scope.$on('$destroy', (): void => {
			this.unregister();
		});
	}

	private behavior: ICardBehavior;
	cardGridController: IResponsiveCardGridController;
	autosaveLink: __parentChildBehavior.IChild<IAutosaveBehavior> = { viewData: null };
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

		var behavior: IAutosaveBehavior = this.parentChildBehavior.getChildBehavior(this.autosaveLink);
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

responsiveCard.$inject = [jqueryServiceName];
export function responsiveCard(jqueryHelper: IJQueryUtility): angular.IDirective {
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
