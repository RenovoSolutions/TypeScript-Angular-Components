'use strict';

import * as ng from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';

import {
	IDialogService,
	IDialogCloseHandler,
	serviceName as dialogServiceName
} from '../dialog/dialog.service';

import { controllerName } from './autosaveDialog.controller';

export var serviceName: string = 'autosaveDialog';

import __autosave = services.autosave;

export interface IAutosaveDialogService {
	open(options: IAutosaveDialogSettings): void;
}

export interface IAutosaveDialogSettings {
	scope?: ng.IScope;
	template?: string;
	templateUrl?: string;
	size?: string;
	data?: any;
	resolve?: any;

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

	static $inject: string[] = ['$rootScope', '$q', '$injector', dialogServiceName, __autosave.factoryName];
	constructor(private $rootScope: ng.IRootScopeService
			, private $q: ng.IQService
			, private $injector: ng.auto.IInjectorService
			, private dialog: IDialogService<IAutosaveDialogSettings>
			, private autosaveFactory: __autosave.IAutosaveServiceFactory) { }

	open(options: IAutosaveDialogSettings): void {
		this.resolvePromises(options.resolve).then((resolveData: any): void => {
			var scope: IAutosaveDialogScope = <IAutosaveDialogScope>options.scope;

			if (scope == null) {
				scope = <IAutosaveDialogScope>this.$rootScope.$new();
				options.scope = scope;
			}

			this.autosave = this.autosaveFactory.getInstance(options.save, null, options.validate);

			scope.form = options.form;
			scope.formGetter = options.formGetter;
			scope.setForm = this.setForm;
			this.data = _.extend(options.data, resolveData);
			scope.dialog = this.data;

			var dialogOptions: IDialogSettings = <IDialogSettings>options;
			dialogOptions.controller = controllerName;
			dialogOptions.controllerAs = 'controller';

			this.dialog.open(options, this.autosaveCloseHandler);
		});
	}

	private resolvePromises(resolves: any): ng.IPromise<any> {
		let promises: any = {};
		_.each(resolves, (value: any, key: any): void => {
			if (_.isFunction(value) || _.isArray(value)) {
				promises[key] = (this.$q.when(this.$injector.invoke(value)));
			} else if (_.isString(value)) {
				promises[key] = (this.$q.when(this.$injector.get(value)));
			} else {
				promises[key] = (this.$q.when(value));
			}
		});

		return this.$q.all(promises);
	}

	private autosaveCloseHandler: IDialogCloseHandler = (explicit: boolean): boolean => {
		if (explicit) {
			return true;
		}

		return this.autosave.autosave(this.data);
	}

	private setForm: { (form: ng.IFormController): void } = (form: ng.IFormController): void => {
		this.autosave.contentForm = form;
	}
}
