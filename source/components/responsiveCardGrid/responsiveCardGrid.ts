// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/lodash/lodash.d.ts' />
// /// <reference path="../../../libraries/typescript-angular-utilities/typings/utility.d.ts" />

/// <reference path="../../services/breakpoints/breakpoints.service.ts" />
/// <reference path="../../services/breakpoints/breakpoint.ts" />

module rl.ui.components.responsiveCardGrid {
	'use strict';

	export var directiveName: string = 'rlResponsiveCardGrid';
	export var controllerName: string = 'ResponsiveCardGridController';

	import __observable = rl.utilities.services.observable;
	import __numberUtility = rl.utilities.services.number;

	export interface IResponsiveCardGridController {
		registerCard(behavior: responsiveCard.ICardBehavior, element: ng.IAugmentedJQuery): __observable.IUnregisterFunction;
		openCard(openingCard: IIndexedCardBehavior): void;
		closeCard(): void;
		hoverIn(currentCard: IIndexedCardBehavior): void;
		hoverOut(): void;
		cardIsEndOfRow(currentCard: IIndexedCardBehavior): boolean;
	}

	export interface IResponsiveCardGridBindings {
		startingIndex: number;
		fillEmptySpace: boolean;
	}

	export interface IIndexedCardBehavior extends responsiveCard.ICardBehavior {
		index: number;
	}

	export class ResponsiveCardGridController implements IResponsiveCardGridController {
		startingIndex: number;
		findPosition: { (element: ng.IAugmentedJQuery): number };

		static $inject: string[] = [__observable.factoryName, '$q', services.breakpoints.breakpointServiceName, __numberUtility.serviceName];
		constructor(observableFactory: __observable.IObservableServiceFactory
			, private $q: ng.IQService
			, private breakpoints: services.breakpoints.IBreakpointService
			, private numberUtility: __numberUtility.INumberUtility) {
			this.observable = observableFactory.getInstance();

			if (this.startingIndex != null) {
				this.emptyCards = _.range(this.startingIndex);
			}

			breakpoints.register(this.updateCardEndOfRowStatus);
		}

		private observable: __observable.IObservableService;
		emptyCards: number[] = [];
		behaviors: IIndexedCardBehavior[] = [];

		registerCard(behavior: responsiveCard.ICardBehavior, element: ng.IAugmentedJQuery): __observable.IUnregisterFunction {
			var index: number = this.findPosition(element);
			index = this.startingIndex != null ? index + this.startingIndex : index;

			var unregisterFunctions: __observable.IUnregisterFunction[] = [];

			unregisterFunctions.push(this.observable.register(behavior.autosave, 'autosave'));
			unregisterFunctions.push(this.observable.register(behavior.close, 'close'));
			unregisterFunctions.push(this.observable.register(behavior.hoverOut, 'hoverOut'));
			unregisterFunctions.push(this.observable.register(behavior.updateEndOfRowStatus, 'updateEndOfRowStatus'));

			var indexedBehavior: IIndexedCardBehavior = <IIndexedCardBehavior>behavior;
			indexedBehavior.index = index;
			this.behaviors.push(indexedBehavior);

			return (): void => {
				_.each(unregisterFunctions, (unregister: __observable.IUnregisterFunction): void => {
					unregister();
				});
			};
		}

		openCard(openingCard: IIndexedCardBehavior): void {
			if (this.autosaveCard()) {
				_.each(this.getCurrentRow(openingCard.index), (card: IIndexedCardBehavior): void => {
					card.open();
				});
			}
		}

		closeCard(): void {
			this.autosaveCard();
		}

		private autosaveCard(): boolean {
			var results: boolean[] = this.observable.fire<boolean>('autosave');
			if (_.all(results)) {
				this.observable.fire('close');
				return true;
			}
			return false;
		}

		hoverIn(currentCard: IIndexedCardBehavior): void {
			_.each(this.getCurrentRow(currentCard.index), (card: IIndexedCardBehavior): void => {
				card.hoverIn();
			});
		}

		hoverOut(): void {
			this.observable.fire('hoverOut');
		}

		cardIsEndOfRow(currentCard: IIndexedCardBehavior): boolean {
			return (currentCard.index + 1) % this.cardsPerRow === 0;
		}

		private updateCardEndOfRowStatus: { (): void } = (): void => {
			this.observable.fire('updateEndOfRowStatus');
		}

		private getCurrentRow(index: number): IIndexedCardBehavior[] {
			// cache the value of cardsPerRow to avoid cases where the breakpoint updates in the middle of this function
			var cardsPerRow: number = this.cardsPerRow;
			var currentRow: number = this.numberUtility.integerDivide(index, cardsPerRow);
			return _.filter(this.behaviors, (behavior: IIndexedCardBehavior): boolean => {
				return currentRow === this.numberUtility.integerDivide(behavior.index, cardsPerRow);
			});
		}

		private get cardsPerRow(): number {
			var currentBreakpoint: string = this.breakpoints.currentBreakpoint;
			return this.breakpointRowDictionary[<string>currentBreakpoint];
		}

		private get breakpointRowDictionary(): number[] {
			var list: number[] = [];
			list[services.breakpoints.xs] = 1;
			list[services.breakpoints.sm] = 1;
			list[services.breakpoints.md] = 2;
			list[services.breakpoints.lg] = 3;
			return list;
		}
	}

	responsiveCardGrid.$inject = [services.breakpoints.breakpointServiceName];
	export function responsiveCardGrid(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			transclude: true,
			template: `
				<div>
					<div class="col-lg-4 col-md-6 col-sm-12 smallCardsList" ng-repeat="emptyCard in grid.emptyCards" ng-if="grid.fillEmptySpace"></div>
					<div ng-transclude></div>
				</div>
			`,
			controller: controllerName,
			controllerAs: 'grid',
			scope: {},
			bindToController: {
				startingIndex: '=',
				fillEmptySpace: '=',
			},
			link: {
				post(scope: ng.IScope
					, element: ng.IAugmentedJQuery
					, attrs: ng.IAttributes
					, grid: ResponsiveCardGridController): void {
					grid.findPosition = (cardElement: ng.IAugmentedJQuery): number => {
						// find the position of the specified element by iterating over the cards and finding a matching element
						var cards: ng.IAugmentedJQuery = element.find('rl-responsive-card');
						var num: number;
						cards.each((index: number, elem: Element): boolean => {
							if (cardElement[0] === elem) {
								num = index;
								return false;
							}
						});
						return num;
					};
				},
			},
		};
	}
}