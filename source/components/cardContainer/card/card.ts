// uses typings/angularjs
// uses typings/lodash
// uses typings/jquery
// uses typescript-angular-utilities

// /// <reference path='../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../typings/lodash/lodash.d.ts' />
// /// <reference path='../../typings/jquery/jquery.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../dataSources/dataSource.ts' />
/// <reference path='../column.ts' />
/// <reference path='../cardContainer.ts' />
/// <reference path='../../../behaviors/autosave/autosave.ts' />

module rl.ui.components.cardContainer.card {
	'use strict';
	
	export var moduleName: string = 'rl.ui.components.cardContainer.card';
	export var directiveName: string = 'rlCard';
	export var controllerName: string = 'CardController';
	
	import __parentChild = rl.utilities.services.parentChildBehavior;
	import __object = rl.utilities.services.object;
	
	export interface ICardBindings {
		columns: IColumn[];
		item: any;
		clickable: boolean;
		source: dataSources.IDataSource<any>;
		containerData: any;
		cardController: string;
		cardControllerAs: string;
		cardAs: string;
		permanentFooter: boolean;
		selectable: boolean;
		selectionChanged(): void;
	}
	
	export interface ICardScope extends ng.IScope {
		rlCardContainer: CardContainerController;
		initContents(hasBody: boolean, hasFooter: boolean): void;
	}
	
	export interface ICardBehavior {
		close(): boolean;
	}
	
	export interface ICardChildBehavior {
		initCard?: {(): void};
		validateCard?: {(): boolean};
		saveCard?: {(): ng.IPromise<void>};
		clickCard?: {(): void};
	}
	
	export class CardController {
		// bindings
		columns: IColumn[];
		item: any;
		clickable: boolean;
		source: dataSources.IDataSource<any>;
		containerData: any;
		cardController: string;
		cardControllerAs: string;
		cardAs: string;
		permanentFooter: boolean;
		selectable: boolean;
		selectionChanged: {(): void};
		
		showContent: boolean = false;
		dirty: boolean = false;
		autosaveLink: __parentChild.IChild<behaviors.autosave.IAutosaveBehavior> = <any>{};
		hasBody: boolean;
		hasFooter: boolean;
	
		static $inject: string[] = ['$scope', '$controller', '$q', __parentChild.serviceName, __object.serviceName];
		constructor(private $scope: ICardScope
				, $controller: ng.IControllerService
				, private $q: ng.IQService
				, private parentChild: __parentChild.IParentChildBehaviorService
				, object: __object.IObjectUtility) {
			if (this.cardAs) {
				$scope[this.cardAs] = this.item;
			}
	
			if (object.isNullOrWhitespace(this.cardController) === false) {
				var controller: any = $controller(this.cardController, { $scope: $scope });
	
				if (object.isNullOrWhitespace(this.cardControllerAs) === false) {
					$scope[this.cardControllerAs] = controller;
				}
			}
	
			parentChild.registerChildBehavior<ICardBehavior>(this.item, {
				close: this.autosave,
			});
			
			$scope.initContents = (hasBody: boolean, hasFooter: boolean): void => {
				this.hasBody = hasBody;
				this.hasFooter = hasFooter;
			};
		}
	
		toggleContent(): void {
			if (!this.showContent) {
				this.open();
			} else {
				this.autosave();
			}
		}
	
		setSelected(value: boolean): void {
			if (_.isUndefined(this.item.viewData)) {
				this.item.viewData = {};
			}
	
			this.item.viewData.selected = value;
	
			this.selectionChanged();
		}
	
		validateCard(): boolean {
			var behavior: ICardChildBehavior = this.parentChild.getChildBehavior<ICardChildBehavior>(this.item);
			if (_.isFunction(behavior.validateCard)) {
				return behavior.validateCard();
			} else {
				return true;
			}
		}
	
		saveCard(): ng.IPromise<void> {
			var behavior: ICardChildBehavior = this.parentChild.getChildBehavior<ICardChildBehavior>(this.item);
			if (_.isFunction(behavior.saveCard)) {
				return behavior.saveCard();
			} else {
				return this.$q.when();
			}
		}
	
		clickCard(): void {
			this.parentChild.triggerChildBehavior(this.item, (behavior: ICardChildBehavior): void => {
				if (_.isFunction(behavior.clickCard)) {
					return behavior.clickCard();
				}
			});
		}
	
		private autosave: { (): boolean } = (): boolean => {
			if (this.showContent === false) {
				return true;
			}
	
			return this.parentChild.triggerChildBehavior(this.autosaveLink, (behavior: behaviors.autosave.IAutosaveBehavior): boolean => {
				if (behavior.autosave()) {
					this.showContent = false;
					return true;
				} else {
					return false;
				}
			});
		};
	
		private open(): void {
			this.parentChild.triggerChildBehavior(this.item, (behavior: ICardChildBehavior): void => {
				if (_.isFunction(behavior.initCard)) {
					behavior.initCard();
				}
			});
	
			if (this.$scope.rlCardContainer.openCard()) {
				this.showContent = true;
			}
		}
	}
	
	export function card(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			templateUrl: 'components/cardContainer/card/card.html',
			require: '^^rlCardContainer',
			controller: controllerName,
			controllerAs: 'card',
			scope: {},
			bindToController: {
				columns: '=',
				item: '=',
				clickable: '=',
				source: '=',
				containerData: '=',
				cardController: '=',
				cardControllerAs: '=',
				cardAs: '=',
				permanentFooter: '=',
				selectable: '=',
				selectionChanged: '&',
			},
			compile(): ng.IDirectivePrePost {
				var content: JQuery;
				var footer: JQuery;
	
				return {
					pre(scope: ICardScope
						, element: ng.IAugmentedJQuery
						, attrs: ng.IAttributes
						, rlCardContainer: CardContainerController): void {
						scope.rlCardContainer = rlCardContainer;
						rlCardContainer.makeCard(scope, (clone: JQuery): void => {
							content = clone.filter('rl-card-content');
							footer = clone.filter('rl-card-footer');
						});
					},
					post(scope: ICardScope
						, element: ng.IAugmentedJQuery): void {
						var contentArea: JQuery = element.find('.content-template');
						contentArea.append(content);
	
						var hasBody: boolean = content.length > 0;
						var hasFooter: boolean = (footer.length > 0);
						if (hasFooter) {
							var footerArea: JQuery = element.find('.footer-template');
							footerArea.append(footer);
						}
						scope.initContents(hasBody, hasFooter);
					},
				};
			},
		};
	}
	
	angular.module(moduleName, [__parentChild.moduleName, __object.moduleName])
		.directive(directiveName, card)
		.controller(controllerName, CardController);
}
