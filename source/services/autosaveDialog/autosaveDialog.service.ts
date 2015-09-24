// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../dialog/dialog.service.ts' />
/// <reference path='autosaveDialog.controller.ts' />

module rl.ui.services.autosaveDialog {
	'use strict';

	export var serviceName: string = 'autosaveDialog';

	import __autosave = rl.utilities.services.autosave;

	export interface IAutosaveDialogService {
		open(options: IAutosaveDialogSettings): void;
	}

	export interface IAutosaveDialogSettings {
		scope?: ng.IScope;
		template?: string;
		templateUrl?: string;
		size?: string;
		data?: any;

		save: { (...data: any[]): ng.IPromise<void> };
		validate?: { (): boolean };
		form?: string;

		// optional - instead of specifying a form name
		formGetter?: { (scope: ng.IScope): ng.IFormController };
	}

	interface IDialogSettings {
		scope?: ng.IScope;
		template?: string;
		templateUrl?: string;
		size?: string;
		data?: any;

		controller?: string;
		controllerAs?: string;
		bindToController?: boolean;
	}

	export interface IAutosaveDialogScope extends ng.IScope {
		form?: string;
		formGetter?: { (scope: ng.IScope): ng.IFormController };
		setForm(form: ng.IFormController): void;
		dialog: any;
	}

	export class AutosaveDialogService implements IAutosaveDialogService {
		private autosave: __autosave.IAutosaveService;
		private data: any;

		static $inject: string[] = ['$rootScope', dialog.serviceName, __autosave.factoryName];
		constructor(private $rootScope: ng.IRootScopeService
			, private dialog: dialog.IDialogService<IAutosaveDialogSettings>
			, private autosaveFactory: __autosave.IAutosaveServiceFactory) { }

		open(options: IAutosaveDialogSettings): void {
			var scope: IAutosaveDialogScope = <IAutosaveDialogScope>options.scope;

			if (scope == null) {
				scope = <IAutosaveDialogScope>this.$rootScope.$new();
				options.scope = scope;
			}

			this.autosave = this.autosaveFactory.getInstance(options.save, null, options.validate);

			scope.form = options.form;
			scope.formGetter = options.formGetter;
			scope.setForm = this.setForm;
			this.data = options.data;
			scope.dialog = options.data;

			var dialogOptions: IDialogSettings = <IDialogSettings>options;
			dialogOptions.controller = controllerName;
			dialogOptions.controllerAs = 'controller';

			return this.dialog.open(options, this.autosaveCloseHandler);
		}

		private autosaveCloseHandler: dialog.IDialogCloseHandler = (explicit: boolean): boolean => {
			if (explicit) {
				return true;
			}

			var canClose: boolean = this.autosave.autosave(this.data);
		}

		private setForm: { (form: ng.IFormController): void } = (form: ng.IFormController): void => {
			this.autosave.contentForm = form;
		}
	}
}
