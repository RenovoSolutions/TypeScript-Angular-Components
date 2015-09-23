// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/jquery/jquery.d.ts' />
// /// <reference path="../../../libraries/typescript-angular-utilities/typings/utility.d.ts" />

/// <reference path='../../behaviors/autosave/autosave.ts' />
/// <reference path='simpleCardList.ts' />

module rl.ui.components.simpleCard {
	'use strict';

	export var directiveName: string = 'rlSimpleCard';
	export var controllerName: string = 'SimpleCardController';

	import __parentChild = rl.utilities.services.parentChildBehavior;

	export interface ISimpleCardBindings {
		onOpen(): void;
		canOpen: boolean;
		childLink: __parentChild.IChild<ISimpleCardBehavior>;
		validate(): boolean;
		save(): ng.IPromise<void>;
	}

	export interface ISimpleCardScope extends ng.IScope {
		hasFooter: boolean;
	}

	export interface ISimpleCardBehavior {
		close(): boolean;
	}

	export class SimpleCardController implements ISimpleCardBindings {
		// bindings
		onOpen: { (): void };
		canOpen: boolean;
		childLink: __parentChild.IChild<ISimpleCardBehavior>;
		validate: { (): boolean };
		save: { (): ng.IPromise<void> };

		showContent: boolean = false;
		autosaveLink: __parentChild.IChild<behaviors.autosave.IAutosaveBehavior> = <any>{};
		private listController: simpleCardList.ISimpleCardListController;

		static $inject: string[] = ['$scope', '$element', __parentChild.serviceName];
		constructor(private $scope: ng.IScope
			, $element: ng.IAugmentedJQuery
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
			if (this.showContent === false) {
				return true;
			}

			return this.parentChild.triggerChildBehavior(this.autosaveLink, (behavior: behaviors.autosave.IAutosaveBehavior): boolean => {
				var canClose: boolean = behavior.autosave();

				if (canClose) {
					this.showContent = false;
				}

				return canClose;
			});
		}

		private noList(): simpleCardList.ISimpleCardListController {
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

	export function simpleCard(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			transclude: true,
			require: '?^^rlSimpleCardList',
			templateUrl: `
				<div class="card col-xs-12">
					<div class="header row" ng-class="{ 'active': card.canOpen }" ng-click="card.toggleContent()">
						<div class="header-template"></div>
						<div class="clearfix"></div>
					</div>

					<ng-form rl-autosave="card.autosaveLink" validate="card.validate()" save="card.save()">
						<div ng-show="card.showContent">
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
				childLink: '=',
				validate: '&',
				save: '&',
			},
			compile(): ng.IDirectivePrePost {
				var header: JQuery;
				var content: JQuery;
				var footer: JQuery;

				return {
					pre(scope: ISimpleCardScope
						, element: ng.IAugmentedJQuery
						, attrs: ng.IAttributes
						, controller: any
						, transclude: ng.ITranscludeFunction): void {
						transclude((clone: JQuery): void => {
							header = clone.filter('rl-card-header');
							content = clone.filter('rl-card-content');
							footer = clone.filter('rl-card-footer');
						});
					},
					post(scope: ISimpleCardScope
						, element: ng.IAugmentedJQuery): void {
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
}
