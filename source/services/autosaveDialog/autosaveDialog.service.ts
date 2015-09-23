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
		formGetter?: { (scope: ng.IScope): ng.IFormController };
	}

	export interface IAutosaveDialogScope extends ng.IScope {
		autosave: __autosave.IAutosaveService;
		formGetter?: { (scope: ng.IScope): ng.IFormController };
		data: any;
	}

	export class AutosaveDialogService implements IAutosaveDialogService {
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

			scope.autosave = this.autosaveFactory.getInstance(options.save, null, options.validate);
			scope.formGetter = options.formGetter;
			scope.data = options.data;

			var modalOptions: ng.ui.bootstrap.IModalSettings = <ng.ui.bootstrap.IModalSettings>options;
			modalOptions.controller = controllerName;
			modalOptions.controllerAs = 'dialog';

			return this.dialog.open(options);
		}
	}
}
