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

export class SimpleCardListController implements ISimpleCardListController {
	private observable: __observable.IObservableService;

	static $inject: string[] = [__observable.factoryName];
	constructor(observableFactory: __observable.IObservableServiceFactory) {
		this.observable = observableFactory.getInstance();
	}

	registerCard(behavior: ISimpleCardBehavior): __observable.IUnregisterFunction {
		return this.observable.register(behavior.close, 'close');
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
