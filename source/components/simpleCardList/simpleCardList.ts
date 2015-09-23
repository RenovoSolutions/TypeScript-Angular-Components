// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/lodash/lodash.d.ts' />
// /// <reference path="../../../libraries/typescript-angular-utilities/typings/utility.d.ts" />

/// <reference path="simpleCard.ts" />

module rl.ui.components.simpleCardList {
	'use strict';

	export var directiveName: string = 'rlSimpleCardList';
	export var controllerName: string = 'SimpleCardListController';

	import __observable = rl.utilities.services.observable;

	export interface ISimpleCardListController {
		registerCard(behavior: simpleCard.ISimpleCardBehavior): __observable.IUnregisterFunction;
		openCard(): boolean;
	}

	export class SimpleCardListController implements ISimpleCardListController {
		private observable: __observable.IObservableService;

		static $inject: string[] = [__observable.factoryName];
		constructor(observableFactory: __observable.IObservableServiceFactory) {
			this.observable = observableFactory.getInstance();
		}

		registerCard(behavior: simpleCard.ISimpleCardBehavior): __observable.IUnregisterFunction {
			return this.observable.register(behavior.close, 'close');
		}

		openCard(): boolean {
			return _.all(<boolean[]>this.observable.fire('close'));
		}
	}

	export function simpleCardList(): ng.IDirective {
		'use strict';
		return {
			restrict: 'AE',
			controller: controllerName,
		};
	}
}
