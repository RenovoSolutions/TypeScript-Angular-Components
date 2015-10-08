// /// <reference path='../../../typings/jquery/jquery.d.ts' />

'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __parentChild = services.parentChildBehavior;

import { IAutosaveBehavior } from '../../behaviors/autosave/autosave';

import { ISimpleCardListController } from './simpleCardList';

export var directiveName: string = 'rlSimpleCard';
export var controllerName: string = 'SimpleCardController';

export interface ISimpleCardBindings {
	onOpen(): void;
	canOpen: boolean;
	alwaysOpen: boolean;
	childLink: __parentChild.IChild<ISimpleCardBehavior>;
	validate(): boolean;
	save(): angular.IPromise<void>;
}

export interface ISimpleCardScope extends angular.IScope {
	hasFooter: boolean;
}

export interface ISimpleCardBehavior {
	close(): boolean;
}

export class SimpleCardController implements ISimpleCardBindings {
	// bindings
	onOpen: { (): void };
	canOpen: boolean;
	alwaysOpen: boolean;
	childLink: __parentChild.IChild<ISimpleCardBehavior>;
	validate: { (): boolean };
	save: { (): angular.IPromise<void> };

	showContent: boolean = false;
	autosaveLink: __parentChild.IChild<IAutosaveBehavior> = <any>{};
	private listController: ISimpleCardListController;

	static $inject: string[] = ['$scope', '$element', __parentChild.serviceName];
	constructor(private $scope: angular.IScope
		, $element: angular.IAugmentedJQuery
		, private parentChild: __parentChild.IParentChildBehaviorService) {
		if (this.canOpen == null) {
			this.canOpen = true;
		}
		this.listController = $element.controller('rlSimpleCardList');

		if (this.listController == null) {
			this.listController = this.noList();
		}

		var behavior: ISimpleCardBehavior = {
			close: this.close,
		};

		this.listController.registerCard(behavior);

		parentChild.registerChildBehavior(this.childLink, behavior);

		$scope.$watch((): boolean => { return this.alwaysOpen; }, (value: boolean) => {
			if (value) {
				this.showContent = true;
			} else {
				this.close();
			}
		});
	}

	toggleContent(): void {
		if (this.showContent) {
			this.close();
		} else {
			this.open();
		}
	}

	open(): void {
		if (this.canOpen && this.listController.openCard()) {
			this.showContent = true;
			this.onOpen();
		}
	}

	close: { (): boolean } = (): boolean => {
		if (this.showContent === false || this.alwaysOpen) {
			return true;
		}

		return this.parentChild.triggerChildBehavior(this.autosaveLink, (behavior: IAutosaveBehavior): boolean => {
			var canClose: boolean = behavior.autosave();

			if (canClose) {
				this.showContent = false;
			}

			return canClose;
		});
	}

	private noList(): ISimpleCardListController {
		return {
			openCard(): boolean {
				return true;
			},
			registerCard(behavior: any): any {
				return null;
			},
		};
	}
}

export function simpleCard(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		transclude: true,
		require: '?^^rlSimpleCardList',
		template: `
			<div class="card col-xs-12">
				<div class="header row" ng-class="{ 'active': card.canOpen && !card.alwaysOpen }" ng-click="card.toggleContent()">
					<div class="header-template"></div>
					<div class="clearfix"></div>
				</div>

				<ng-form rl-autosave="card.autosaveLink" validate="card.validate()" save="card.save()">
					<div ng-show="card.showContent || card.alwaysOpen">
						<div class="body row">
							<div class="content-template"></div>
							<div class="clearfix"></div>
						</div>
					</div>
				</ng-form>
				<div ng-show="hasFooter && card.showContent">
					<div class="footer row">
						<div class="footer-template"></div>
						<div class="clearfix"></div>
					</div>
				</div>
			</div>
		`,
		controller: controllerName,
		controllerAs: 'card',
		scope: {},
		bindToController: {
			onOpen: '&',
			canOpen: '=',
			alwaysOpen: '=',
			childLink: '=',
			validate: '&',
			save: '&',
		},
		compile(): angular.IDirectivePrePost {
			var header: JQuery;
			var content: JQuery;
			var footer: JQuery;

			return {
				pre(scope: ISimpleCardScope
					, element: angular.IAugmentedJQuery
					, attrs: angular.IAttributes
					, controller: any
					, transclude: angular.ITranscludeFunction): void {
					transclude((clone: JQuery): void => {
						header = clone.filter('rl-card-header');
						content = clone.filter('rl-card-content');
						footer = clone.filter('rl-card-footer');
					});
				},
				post(scope: ISimpleCardScope
					, element: angular.IAugmentedJQuery): void {
					var headerArea: JQuery = element.find('.header-template');
					headerArea.append(header);

					var contentArea: JQuery = element.find('.content-template');
					contentArea.append(content);

					scope.hasFooter = (footer.length > 0);
					if (scope.hasFooter) {
						var footerArea: JQuery = element.find('.footer-template');
						footerArea.append(footer);
					}
				},
			};
		},
	};
}
