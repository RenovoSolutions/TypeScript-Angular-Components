// /// <reference path='../../../../typings/jquery/jquery.d.ts' />

import * as angular from 'angular';
import * as _ from 'lodash';
import * as Rx from 'rxjs';

import { services, downgrade } from 'typescript-angular-utilities';
import __object = services.object;

import { IChild, IParentChildBehaviorService, serviceName as parentChildServiceName, moduleName as parentChildModuleName } from '../../../services/parentChild/parentChild.service';

import { moduleName as headerColumnModuleName } from './headerColumn/headerColumn.module';
import { IAutosaveBehavior } from '../../../behaviors/autosave/autosave';
import { IDataSource } from '../dataSources/dataSource';
import { IColumn } from '../column';
import { CardContainerController } from '../cardContainer';

export let moduleName: string = 'rl.ui.components.cardContainer.card';
export let componentName: string = 'rlCard';
export let controllerName: string = 'CardController';

export interface ICardBindings {
	columns: IColumn<any>[];
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
	columns: IColumn<any>[];
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
	saveWhenInvalid: boolean;

	showContent: boolean = false;
	dirty: boolean = false;
	autosaveLink: IChild<IAutosaveBehavior> = <any>{};
	hasBody: boolean;
	hasFooter: boolean;
	cardContainer: CardContainerController;
	refresh: Rx.Subject<void>;

	static $inject: string[] = ['$scope', '$controller', '$q', '$element', parentChildServiceName, downgrade.objectServiceName];
	constructor(private $scope: ICardScope
			, $controller: angular.IControllerService
			, private $q: angular.IQService
			, private $element: angular.IAugmentedJQuery
			, private parentChild: IParentChildBehaviorService
			, object: __object.IObjectUtility) {
		if (this.cardAs) {
			$scope[this.cardAs] = this.item;
		}

		$scope.collapse = this.autosave;
		$scope.setSelected = this.setSelected.bind(this);
		this.refresh = new Rx.Subject<void>();
		$scope.refresh = (): void => {
			this.source.refresh();
			this.refresh.next(null);
		};
		$scope.remove = (): void => {
			this.source.remove(this.item);
		};
		$scope.containerData = this.containerData;

		if (object.isNullOrWhitespace(this.cardController) === false) {
			let controller: any = $controller(this.cardController, { $scope: $scope });

			if (object.isNullOrWhitespace(this.cardControllerAs) === false) {
				$scope[this.cardControllerAs] = controller;
			}
		}

		parentChild.registerChildBehavior<ICardBehavior>(this.item, {
			close: this.autosave,
		});
	}

	toggleContent(): void {
		if (!this.showContent) {
			this.open();
		} else {
			this.autosave();
		}
	}

	validateCard(): boolean {
		let behavior: ICardChildBehavior = this.parentChild.getChildBehavior<ICardChildBehavior>(this.item);
		if (_.isFunction(behavior.validateCard)) {
			return behavior.validateCard();
		} else {
			return true;
		}
	}

	saveCard(): angular.IPromise<void> {
		let behavior: ICardChildBehavior = this.parentChild.getChildBehavior<ICardChildBehavior>(this.item);
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

	$postLink(): void {
		this.cardContainer.makeCard(this.$scope, (content: JQuery): void => {
			let contentArea: JQuery = this.$element.find('.content-template');
			contentArea.append(content);
			this.hasBody = content.length > 0;
		}, null, 'contentSlot');
		this.cardContainer.makeCard(this.$scope, (footer: JQuery): void => {
			this.hasFooter = (footer.length > 0);
			if (this.hasFooter) {
				let footerArea: JQuery = this.$element.find('.footer-template');
				footerArea.append(footer);
			}
		}, null, 'footerSlot');
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

		if (this.cardContainer.openCard()) {
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

let card: angular.IComponentOptions = {
	template: require('./card.html'),
	require: { cardContainer: '^^rlCardContainer' },
	controller: controllerName,
	controllerAs: '__card',
	bindings: {
		columns: '<?',
		item: '=',
		clickable: '<?',
		source: '=',
		containerData: '<?',
		cardController: '<?',
		cardControllerAs: '<?',
		cardAs: '<?',
		permanentFooter: '<?',
		selectable: '<?',
		selectionChanged: '&',
		saveWhenInvalid: '<?',
	},
};

angular.module(moduleName, [
	parentChildModuleName,
	downgrade.moduleName,

	headerColumnModuleName,
])
	.component(componentName, card)
	.controller(controllerName, CardController);
