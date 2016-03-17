// /// <reference path='../../../typings/commonjs.d.ts' />
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
	autosave(): boolean;
	close(): boolean;
	setAlwaysOpen(value: boolean): void;
}

export class SimpleCardController implements ISimpleCardBindings {
	// bindings
	onOpen: { (): void };
	canOpen: boolean;
	alwaysOpen: boolean;
	childLink: __parentChild.IChild<ISimpleCardBehavior>;
	validate: { (): boolean };
	save: { (): angular.IPromise<void> };
	cardType: string;

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

		let behavior: ISimpleCardBehavior = {
			autosave: this.autosave.bind(this),
			close: this.close,
			setAlwaysOpen: (value: boolean): void => {
				this.alwaysOpen = value;
			},
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

		return this.autosave();
	}

	private autosave(): boolean {
		return this.parentChild.triggerChildBehavior(this.autosaveLink, (behavior: IAutosaveBehavior): boolean => {
			let canClose: boolean = behavior.autosave();

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
		transclude: {
			'headerSlot': '?rlCardHeader',
			'contentSlot': '?rlCardContent',
			'footerSlot': '?rlCardFooter',
		},
		require: '?^^rlSimpleCardList',
		template: require('./simpleCard.html'),
		controller: controllerName,
		controllerAs: 'card',
		scope: {},
		bindToController: {
			onOpen: '&',
			canOpen: '=?',
			alwaysOpen: '=?',
			childLink: '=?',
			validate: '&',
			save: '&',
			cardType: '@',
		},
	};
}
