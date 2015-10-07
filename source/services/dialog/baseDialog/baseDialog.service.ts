'use strict';

import * as ng from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __promise = services.promise;

import { IDialogCloseHandler, IDialogService, IDialogImplementation } from '../dialog.service';
import { controllerName, IBaseDialogScope } from './baseDialog.controller';

export var serviceName: string = 'baseDialog';

export interface IBaseDialogService extends IDialogService<ng.ui.bootstrap.IModalSettings> { }

export class BaseDialogService implements IDialogImplementation<ng.ui.bootstrap.IModalSettings> {
	closeHandler: IDialogCloseHandler;

	static $inject: string[] = ['$modal', '$rootScope', __promise.serviceName];
	constructor(private $modal: ng.ui.bootstrap.IModalService
			, private $rootScope: ng.IRootScopeService
			, private promise: __promise.IPromiseUtility) { }

	open(options: ng.ui.bootstrap.IModalSettings, closeHandler?: IDialogCloseHandler): void {
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

	private configureModalSettings(options: ng.ui.bootstrap.IModalSettings, resolveData: any): ng.ui.bootstrap.IModalSettings {
		let modalScope: IBaseDialogScope = <IBaseDialogScope>options.scope;

		if (modalScope == null) {
			modalScope = <IBaseDialogScope>this.$rootScope.$new();
		}

		modalScope.modalController = options.controller;
		modalScope.resolveData = resolveData;
		options.resolve = null;
		options.controller = controllerName;
		options.scope = modalScope;
		return options;
	}
}
