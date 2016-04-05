// /// <reference path='../../../typings/node/node.d.ts' />
// /// <reference path='../../../typings/jquery/jquery.d.ts' />

'use strict';

import * as angular from 'angular';

import { DialogService, serviceName as dialogServiceName, moduleName as dialogModule } from '../../services/dialog/dialog.service';
import { IFormValidator } from '../../types/formValidators';

export let moduleName: string = 'rl.ui.components.dialog';
export let componentName: string = 'rlDialog';
export let controllerName: string = 'DialogController';

export interface IDialogScope extends angular.IScope {
	dialogForm: IFormValidator;
	$parent: IParentScope;
}

export interface IParentScope extends angular.IScope {
	$close: { (): void };
	$dismiss: { (): void };
	$saveAndClose: {(): void};
}

export interface IDialogBindings {
	autosave: boolean;
}

export class DialogController implements IDialogBindings {
	autosave: boolean;
	hasFooter: boolean;
	close: { (): void };
	dismiss: { (): void };
	saveAndClose: { (): void };

	form: IFormValidator;

	static $inject: string[] = ['$scope', '$element', '$transclude', '$compile', dialogServiceName];
	constructor(private $scope: IDialogScope
			, private $element: angular.IAugmentedJQuery
			, private $transclude: angular.ITranscludeFunction
			, private $compile: angular.ICompileService
			, private dialogService: DialogService<any>) {}

	$onInit(): void {
		let unbind: Function = this.$scope.$watch((): IFormValidator => { return this.form; }, (form: IFormValidator): void => {
			if (form != null) {
				this.dialogService.setForm(form);
				unbind();
			}
		});
	}

	$postLink(): void {
		this.close = this.$scope.$parent.$close;
		this.dismiss = this.$scope.$parent.$dismiss;
		this.saveAndClose = this.$scope.$parent.$saveAndClose;
		let footerArea: JQuery = this.$element.find('.footer-template');

		if (this.$transclude.isSlotFilled('footerSlot')) {
			this.$transclude((footer: JQuery): void => {
				this.hasFooter = (footer.length > 0);
				if (this.hasFooter) {
					footerArea.append(footer);
				}
			}, null, 'footerSlot');
		} else if (this.autosave) {
			let footer: JQuery = this.$compile(require('./autosaveDialogFooter.html'))(this.$scope);
			this.hasFooter = true;
			footerArea.append(footer);
		}
	}
}

let dialog: angular.IComponentOptions = {
	transclude: <any>{
		headerSlot: '?rlDialogHeader',
		contentSlot: '?rlDialogContent',
		footerSlot: '?rlDialogFooter',
	},
	template: require('./dialog.html'),
	controller: controllerName,
	controllerAs: 'dialog',
	bindings: {
		autosave: '=',
	},
};

angular.module(moduleName, [dialogModule])
	.component(componentName, dialog)
	.controller(controllerName, DialogController);
