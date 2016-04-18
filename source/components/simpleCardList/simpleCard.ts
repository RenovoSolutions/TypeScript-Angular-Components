// /// <reference path='../../../typings/commonjs.d.ts' />
// /// <reference path='../../../typings/jquery/jquery.d.ts' />

'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __parentChild = services.parentChildBehavior;

import { IAutosaveBehavior } from '../../behaviors/autosave/autosave';

import { ISimpleCardListController } from './simpleCardList';

import { IChangeObject } from '../../types/changes';

export var componentName: string = 'rlSimpleCard';
export var controllerName: string = 'SimpleCardController';

export interface ISimpleCardBindings {
	onOpen(): void;
	canOpen: boolean;
	alwaysOpen: boolean;
	childLink: __parentChild.IChild<ISimpleCardBehavior>;
	save(): angular.IPromise<void>;
	saveWhenInvalid?: boolean;
}

export interface ISimpleCardScope extends angular.IScope {
	hasFooter: boolean;
}

export interface ISimpleCardBehavior {
	autosave(): boolean;
	close(): boolean;
	setAlwaysOpen(value: boolean): void;
}

export interface ISimpleCardChanges {
	alwaysOpen: IChangeObject<boolean>;
}

export class SimpleCardController implements ISimpleCardBindings {
	// bindings
	onOpen: { (): void };
	canOpen: boolean;
	alwaysOpen: boolean;
	childLink: __parentChild.IChild<ISimpleCardBehavior>;
	save: { (): angular.IPromise<void> };
	saveWhenInvalid: boolean;
	cardType: string;

	showContent: boolean = false;
	autosaveLink: __parentChild.IChild<IAutosaveBehavior> = <any>{};
	listController: ISimpleCardListController;

	static $inject: string[] = [__parentChild.serviceName];
	constructor(private parentChild: __parentChild.IParentChildBehaviorService) {}

	$onInit(): void {
		if (this.canOpen == null) {
			this.canOpen = true;
		}

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

		this.parentChild.registerChildBehavior(this.childLink, behavior);

		this.updateAlwaysOpen(this.alwaysOpen);
	}

	$onChanges(changes: ISimpleCardChanges): void {
		if (changes.alwaysOpen) {
			this.updateAlwaysOpen(changes.alwaysOpen.currentValue);
		}
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

	private updateAlwaysOpen(alwaysOpen: boolean): void {
		if (alwaysOpen) {
			this.showContent = true;
		} else {
			this.close();
		}
	}
}

export let simpleCard: angular.IComponentOptions = {
	transclude: <any>{
		'headerSlot': '?rlCardHeader',
		'contentSlot': '?rlCardContent',
		'footerSlot': '?rlCardFooter',
	},
	require: { listController: '?^^rlSimpleCardList' },
	template: require('./simpleCard.html'),
	controller: controllerName,
	controllerAs: 'card',
	bindings: {
		onOpen: '&',
		canOpen: '<?',
		alwaysOpen: '<?',
		childLink: '=?',
		save: '&',
		saveWhenInvalid: '<?',
		cardType: '@',
	},
};
