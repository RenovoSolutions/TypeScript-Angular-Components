import * as angular from 'angular';
import * as _ from 'lodash';
import { Subject, Subscription } from 'rxjs';

import { ISimpleCardBehavior } from './simpleCard';

export var directiveName: string = 'rlSimpleCardList';
export var controllerName: string = 'SimpleCardListController';

export interface ISimpleCardListController {
	alwaysOpenChanges: Subject<boolean>;
	registerCard(behavior: ISimpleCardBehavior): void;
	openCard(): boolean;
}

export interface ISimpleCardListAttributes extends angular.IAttributes {
	alwaysOpen: string;
}

export class SimpleCardListController implements ISimpleCardListController {
	// public
	alwaysOpenChanges: Subject<boolean>;

	alwaysOpen: boolean;
	cards: ISimpleCardBehavior[] = [];

	static $inject: string[] = ['$scope', '$attrs', '$parse'];
	constructor($scope: angular.IScope
		, $attrs: ISimpleCardListAttributes
		, $parse: angular.IParseService) {
		this.alwaysOpenChanges = new Subject<boolean>();
		$scope.$watch((): boolean => { return $parse($attrs.alwaysOpen)($scope); }, this.alwaysOpenChange.bind(this));

		$attrs.$addClass('card-list');
	}

	registerCard(behavior: ISimpleCardBehavior): void {
		this.cards.push(behavior);
	}

	openCard(): boolean {
		return _.every(this.cards, (card: ISimpleCardBehavior): boolean => card.close());
	}

	alwaysOpenChange(value: boolean): void {
		this.alwaysOpen = value;
		this.alwaysOpenChanges.next(value);
	}
}

export function simpleCardList(): angular.IDirective {
	'use strict';
	return {
		restrict: 'AE',
		controller: controllerName,
	};
}
