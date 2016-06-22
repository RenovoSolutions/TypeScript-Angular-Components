import * as ng from 'angular';
import * as _ from 'lodash';

import { IPromiseUtility, serviceName as promiseServiceName } from '../../promise/promise.service';

import {
	IDialogCloseHandler,
	IDialogService,
	IDialogImplementation,
	IDialogInstance,
	IPromptSettings,
	IPromptInstance,
} from '../dialog.service.ng1';
import { controllerName, IBootstrapModalDialogScope } from './bootstrapModalDialog.controller';

export var serviceName: string = 'uiBootstrapModelDialog';

export interface IBootstrapModalDialogService extends IDialogService<IBootstrapModalDialogSettings> { }

export interface IBootstrapModalDialogSettings extends ng.ui.bootstrap.IModalSettings {
	resolveToDialog?: boolean;
	dialogAs?: string;
}

export interface IPromptScope extends ng.IScope {
	prompt: IPromptSettings;
	$accept(): void;
	$cancel(): void;
	$close(): void;
	$dismiss(): void;
}

export class BootstrapModalDialogService implements IDialogImplementation<IBootstrapModalDialogSettings> {
	closeHandler: IDialogCloseHandler;

	static $inject: string[] = ['$uibModal', '$rootScope', promiseServiceName];
	constructor(private $modal: ng.ui.bootstrap.IModalService
			, private $rootScope: ng.IRootScopeService
			, private promise: IPromiseUtility) { }

	open(options: IBootstrapModalDialogSettings, closeHandler?: IDialogCloseHandler): IDialogInstance {
		if (options == null) {
			options = <any>{};
		}

		let dialogInstance: IDialogInstance = <any>{
			close(): void {},
			dismiss(): void {},
		};

		this.promise.resolvePromises(options.resolve).then((results: any): void => {
			this.closeHandler = closeHandler;
			options = this.configureModalSettings(options, results);
			let modalInstance: ng.ui.bootstrap.IModalServiceInstance = this.$modal.open(options);
			dialogInstance.close = modalInstance.close;
			dialogInstance.dismiss = modalInstance.dismiss;
		});

		return dialogInstance;
	}

	prompt(options: IPromptSettings, template: string): IPromptInstance {
		let acceptHandler: { (): void } = options.acceptHandler || function(): void { };
		let cancelHandler: { (): void } = options.cancelHandler || function(): void { };
		options.acceptHandler = null;
		options.cancelHandler = null;

		let modalScope: IPromptScope = <IPromptScope>this.$rootScope.$new();
		modalScope.prompt = options;

		let settings: IBootstrapModalDialogSettings = {
			scope: modalScope,
			template: template,
			controller: controllerName,
		};

		let modalInstance: ng.ui.bootstrap.IModalServiceInstance = this.$modal.open(settings);

		let accept: { (): void } = (): void => {
			acceptHandler();
			modalInstance.close();
		};

		let cancel: { (): void } = (): void => {
			cancelHandler();
			modalInstance.close();
		};

		modalScope.$accept = accept;
		modalScope.$cancel = cancel;

		return <any>{
			accept: accept,
			cancel: cancel,
			close: modalInstance.close,
			dismiss: modalInstance.dismiss,
		};
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

	private configureModalSettings(options: IBootstrapModalDialogSettings, resolveData: any): IBootstrapModalDialogSettings {
		let modalScope: IBootstrapModalDialogScope = <IBootstrapModalDialogScope>options.scope;

		if (modalScope == null) {
			modalScope = <IBootstrapModalDialogScope>this.$rootScope.$new();
		}

		if (options.resolveToDialog) {
			if (options.dialogAs != null) {
				modalScope[options.dialogAs] = resolveData;
			}
			else {
				modalScope = <IBootstrapModalDialogScope>_.extend(modalScope, resolveData);
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
