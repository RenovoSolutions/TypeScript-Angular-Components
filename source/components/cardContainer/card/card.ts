// /// <reference path='../../../../typings/jquery/jquery.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __parentChild = services.parentChildBehavior;
import __object = services.object;

import { moduleName as headerColumnModuleName } from './headerColumn/headerColumn.module';
import { IAutosaveBehavior } from '../../../behaviors/autosave/autosave';
import { IDataSource } from '../dataSources/dataSource';
import { IColumn } from '../column';
import { CardContainerController } from '../cardContainer';

export var moduleName: string = 'rl.ui.components.cardContainer.card';
export var directiveName: string = 'rlCard';
export var controllerName: string = 'CardController';

export interface ICardBindings {
	columns: IColumn[];
	item: any;
	clickable: boolean;
	source: IDataSource<any>;
	containerData: any;
	cardController: string;
	cardControllerAs: string;
	cardAs: string;
	permanentFooter: boolean;
	selectable: boolean;
	selectionChanged(): void;
}

export interface ICardScope extends angular.IScope {
	collapse(): void;
	setSelected(value: boolean): void;
	refresh(): void;
	remove(): void;
	containerData: any;

	__rlCardContainer: CardContainerController;
	__initContents(hasBody: boolean, hasFooter: boolean): void;
}

export interface ICardBehavior {
	close(): boolean;
}

export interface ICardChildBehavior {
	initCard?: {(): void};
	validateCard?: {(): boolean};
	saveCard?: {(): angular.IPromise<void>};
	clickCard?: {(): void};
}

export class CardController {
	// bindings
	columns: IColumn[];
	item: any;
	clickable: boolean;
	source: IDataSource<any>;
	containerData: any;
	cardController: string;
	cardControllerAs: string;
	cardAs: string;
	permanentFooter: boolean;
	selectable: boolean;
	selectionChanged: {(): void};

	showContent: boolean = false;
	dirty: boolean = false;
	autosaveLink: __parentChild.IChild<IAutosaveBehavior> = <any>{};
	hasBody: boolean;
	hasFooter: boolean;

	static $inject: string[] = ['$scope', '$controller', '$q', __parentChild.serviceName, __object.serviceName];
	constructor(private $scope: ICardScope
			, $controller: angular.IControllerService
			, private $q: angular.IQService
			, private parentChild: __parentChild.IParentChildBehaviorService
			, object: __object.IObjectUtility) {
		if (this.cardAs) {
			$scope[this.cardAs] = this.item;
		}

		$scope.collapse = this.autosave;
		$scope.setSelected = this.setSelected.bind(this);
		$scope.refresh = (): void => {
			this.source.refresh();
			$scope.$broadcast('card.refresh');
		};
		$scope.remove = (): void => {
			this.source.remove(this.item);
		};
		$scope.containerData = this.containerData;

		if (object.isNullOrWhitespace(this.cardController) === false) {
			var controller: any = $controller(this.cardController, { $scope: $scope });

			if (object.isNullOrWhitespace(this.cardControllerAs) === false) {
				$scope[this.cardControllerAs] = controller;
			}
		}

		parentChild.registerChildBehavior<ICardBehavior>(this.item, {
			close: this.autosave,
		});

		$scope.__initContents = (hasBody: boolean, hasFooter: boolean): void => {
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

	validateCard(): boolean {
		var behavior: ICardChildBehavior = this.parentChild.getChildBehavior<ICardChildBehavior>(this.item);
		if (_.isFunction(behavior.validateCard)) {
			return behavior.validateCard();
		} else {
			return true;
		}
	}

	saveCard(): angular.IPromise<void> {
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

		return this.parentChild.triggerChildBehavior(this.autosaveLink, (behavior: IAutosaveBehavior): boolean => {
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

		if (this.$scope.__rlCardContainer.openCard()) {
			this.showContent = true;
		}
	}

	private setSelected(value: boolean): void {
		if (_.isUndefined(this.item.viewData)) {
			this.item.viewData = {};
		}

		this.item.viewData.selected = value;

		this.selectionChanged();
	}
}

export function card(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./card.html'),
		require: '^^rlCardContainer',
		controller: controllerName,
		controllerAs: '__card',
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
		link(scope: ICardScope
			, element: angular.IAugmentedJQuery
			, attrs: angular.IAttributes
			, rlCardContainer: CardContainerController): void {
			scope.__rlCardContainer = rlCardContainer;
			rlCardContainer.makeCard(scope, (clone: JQuery): void => {
				let content: JQuery = clone.filter('rl-card-content');
				let footer: JQuery = clone.filter('rl-card-footer');

				let contentArea: JQuery = element.find('.content-template');
				contentArea.append(content);

				let hasBody: boolean = content.length > 0;
				let hasFooter: boolean = (footer.length > 0);
				if (hasFooter) {
					let footerArea: JQuery = element.find('.footer-template');
					footerArea.append(footer);
				}
				scope.__initContents(hasBody, hasFooter);
			});
		},
	};
}

angular.module(moduleName, [
	__parentChild.moduleName,
	__object.moduleName,

	headerColumnModuleName,
])
	.directive(directiveName, card)
	.controller(controllerName, CardController);
