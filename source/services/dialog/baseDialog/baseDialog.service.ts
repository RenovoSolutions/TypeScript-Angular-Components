'use strict';

import * as ng from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __promise = services.promise;

import { IDialogCloseHandler, IDialogService, IDialogImplementation } from '../dialog.service';
import { controllerName, IBaseDialogScope } from './baseDialog.controller';

export var serviceName: string = 'baseDialog';

export interface IBaseDialogService extends IDialogService<IBaseDialogSettings> { }

export interface IBaseDialogSettings extends ng.ui.bootstrap.IModalSettings {
	resolveToDialog?: boolean;
	dialogAs?: string;
}

export class BaseDialogService implements IDialogImplementation<IBaseDialogSettings> {
	closeHandler: IDialogCloseHandler;

	static $inject: string[] = ['$modal', '$rootScope', __promise.serviceName];
	constructor(private $modal: ng.ui.bootstrap.IModalService
			, private $rootScope: ng.IRootScopeService
			, private promise: __promise.IPromiseUtility) { }

	open(options: IBaseDialogSettings, closeHandler?: IDialogCloseHandler): void {
		if (options == null) {
			options = <any>{};
		}

		this.promise.resolvePromises(options.resolve).then((results: any): void => {
			this.closeHandler = closeHandler;
			options = this.configureModalSettings(options, results);
			this.$modal.open(options);
		});
	}

	modalClosing: { (event: ng.IAngularEvent, reason: any, explicitlyClosed: boolean): void }
		= (event: ng.IAngularEvent, reason: any, explicitlyClosed: boolean): void => {
		let canClose: boolean = true;

		if (_.isFunction(this.closeHandler)) {
			canClose = this.closeHandler(explicitlyClosed);
		}

		if (!canClose) {
			event.preventDefault();
		}
	}

	private configureModalSettings(options: IBaseDialogSettings, resolveData: any): IBaseDialogSettings {
		let modalScope: IBaseDialogScope = <IBaseDialogScope>options.scope;

		if (modalScope == null) {
			modalScope = <IBaseDialogScope>this.$rootScope.$new();
		}

		if (options.resolveToDialog) {
			if (options.dialogAs != null) {
				modalScope[options.dialogAs] = resolveData;
			}
			else {
				modalScope = <IBaseDialogScope>_.extend(modalScope, resolveData);
			}
		} else {
			modalScope.resolveData = resolveData;
		}

		modalScope.modalController = options.controller;
		options.resolve = null;
		options.controller = controllerName;
		options.scope = modalScope;
		return options;
	}
}
