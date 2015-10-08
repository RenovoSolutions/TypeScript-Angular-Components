'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __observable = services.observable;

import { ISimpleCardBehavior } from './simpleCard';

export var directiveName: string = 'rlSimpleCardList';
export var controllerName: string = 'SimpleCardListController';

export interface ISimpleCardListController {
	registerCard(behavior: ISimpleCardBehavior): __observable.IUnregisterFunction;
	openCard(): boolean;
}

export interface ISimpleCardListAttributes extends angular.IAttributes {
	alwaysOpen: string;
}

export class SimpleCardListController implements ISimpleCardListController {
	private observable: __observable.IObservableService;
	private alwaysOpen: boolean;

	static $inject: string[] = ['$scope', '$attrs', '$parse', __observable.factoryName];
	constructor($scope: angular.IScope
		, $attrs: ISimpleCardListAttributes
		, $parse: angular.IParseService
		, observableFactory: __observable.IObservableServiceFactory) {
		this.observable = observableFactory.getInstance();

		$scope.$watch((): boolean => { return $parse($attrs.alwaysOpen)($scope); }, (value: boolean) => {
			this.alwaysOpen = value;
			this.observable.fire('alwaysOpen', value);
		});
	}

	registerCard(behavior: ISimpleCardBehavior): __observable.IUnregisterFunction {
		behavior.setAlwaysOpen(this.alwaysOpen);

		var unregisterFunctions: __observable.IUnregisterFunction[] = [];

		unregisterFunctions.push(this.observable.register(behavior.close, 'close'));
		unregisterFunctions.push(this.observable.register(behavior.setAlwaysOpen, 'alwaysOpen'));

		return (): void => {
			_.each(unregisterFunctions, (unregister: __observable.IUnregisterFunction): void => {
				unregister();
			});
		};
	}

	openCard(): boolean {
		return _.all(<boolean[]>this.observable.fire('close'));
	}
}

export function simpleCardList(): angular.IDirective {
	'use strict';
	return {
		restrict: 'AE',
		controller: controllerName,
	};
}
