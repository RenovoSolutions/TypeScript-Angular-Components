// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as ng from 'angular';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __transform = services.transform.transform;

import {
	moduleName as jqueryModuleName,
	serviceName as jqueryServiceName,
	IJQueryUtility,
} from '../../services/jquery/jquery.service';

import { IMessageLogDataService, IMessageLog, IMessage, factoryName, IMessageLogFactory, IUser } from './messageLog.service';
import * as componentServices from '../../services/services.module';
import __dialog = componentServices.dialog;

import { ITemplateLoader, serviceName as templateLoaderService } from '../../services/templateLoader/templateLoader.service';

export var directiveName: string = 'rlMessageLog';
export var controllerName: string = 'MessageLogController';

export enum DeletePermissions {
	deleteMine = 0,
	deleteAll = 1,
	deleteNone = 2
}

export enum EditPermissions {
	editMine = 0,
	editAll = 1,
	editNone = 2
}

export interface IMessageLogBindings {
	pageSize: number;
	service: IMessageLogDataService;
	messageLogBinding: IMessageLog;
	messageAs: string;
	currentUser?: IUser;
	canDelete?: DeletePermissions;
	canEdit?: EditPermissions;

	selector: { (IMessage: any): any } | string;
}

export class MessageLogController implements IMessageLogBindings {
	// bindings
	pageSize: number;
	service: IMessageLogDataService;
	messageLogBinding: IMessageLog;
	messageAs: string;
	selector: { (iMessage: IMessage): any } | string;
	currentUser: IUser;
	canDelete: DeletePermissions;
	canEdit: EditPermissions;

	messages: IMessage[];
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	messageLog: IMessageLog;

	templates: any;

	loading: boolean;
	loadingInitial: boolean;


	static $inject: string[] = [__dialog.serviceName, '$scope', factoryName];
	constructor(private dialog: __dialog.IDialogService<any>, $scope: ng.IScope, messageLogFactory: IMessageLogFactory) {
		this.messageLog = this.messageLogBinding || messageLogFactory.getInstance();

		$scope.$watch((): IMessage[] => { return this.messageLog.visibleMessages; }
			, (value: IMessage[]): void => {
				this.messages = value;
			});

		$scope.$watch((): boolean => { return this.messageLog.hasForwardMessages; }, (value: boolean): void => {
			this.hasNextPage = value;
		});

		$scope.$watch((): boolean => { return this.messageLog.hasBackwardMessages; }, (value: boolean): void => {
			this.hasPreviousPage = value;
		});

		$scope.$watch((): boolean => { return this.messageLog.busy; }, (value: boolean): void => {
			if (!value) {
				this.loading = false;
				this.loadingInitial = false;
			} else {
				this.loading = true;
			}
		});

		$scope.$watch((): IMessageLogDataService => { return this.service; }, (service: IMessageLogDataService): void => {
			this.messageLog.dataService = service;
			this.loadingInitial = true;
		});

		this.messageLog.pageSize = this.pageSize != null ? this.pageSize : 8;
	}

	getEntrySelector(entry: IMessage): any {
		if (_.isString(this.selector)) {
			return entry[<string>this.selector];
		} else if (_.isFunction(this.selector)) {
			return (<{ (IMessage): any }>this.selector)(entry);
		}
	}

	getOlder(): ng.IPromise<void> {
		return this.messageLog.getNextPage();
	}

	getTop(): ng.IPromise<void> {
		return this.messageLog.getTopPage();
	}

	canDeleteEntry(entry: IMessage): boolean {
		if (entry.isSystemNote) {
			return false;
		}

		switch (this.canDelete) {
			case DeletePermissions.deleteAll:
				return true;
			case DeletePermissions.deleteMine:
				return (this.currentUser == null || this.currentUser.id === entry.createdBy.id);
			default:
				return false;
		}
	}
	canEditEntry(entry: IMessage): boolean {
		if (entry.isSystemNote) {
			return false;
		}

		switch (this.canEdit) {
			case EditPermissions.editAll:
				return true;
			case EditPermissions.editMine:
				return (this.currentUser == null || this.currentUser.id === entry.createdBy.id);
			default:
				return false;
		}
	}

	editMessage(entry: IMessage): void {
		let editedEntry: IMessage = _.clone(entry);

		this.dialog.openForm({
			save: this.updateNote.bind(this),
			data: {
				entry: editedEntry,
				originalEntry: entry,
			},
			template: require('./messageLogEditDialog.html'),
		});
	}

	updateNote(data: any): ng.IPromise<void> {
		return this.messageLog.updateMessage(data.entry);
	}

	saveNote(data: any): ng.IPromise<void> {
		return this.messageLog.addMessage(data.entry);
	}
}

messageLog.$inject = [
	'$interpolate',
	jqueryServiceName,
	templateLoaderService,
	__object.serviceName,
];
export function messageLog($interpolate: angular.IInterpolateService,
	jquery: IJQueryUtility,
	templateLoader: ITemplateLoader,
	object: __object.IObjectUtility): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./messageLog.html'),
		transclude: true,
		controller: controllerName,
		controllerAs: 'log',
		scope: {
			messageData: "=",
		},
		bindToController: {
			service: '=',
			selector: '=',
			pageSize: '=',
			messageLogBinding: '=messageLog',
			messageAs: "@",
			currentUser: '=?',
			canDelete: '=?',
			canEdit: '=?',
		},
		link: (scope: angular.IScope,
			element: angular.IAugmentedJQuery,
			attributes: angular.IAttributes,
			controller: MessageLogController,
			transclude: angular.ITranscludeFunction): void => {
			controller.templates = templateLoader.loadTemplates(transclude).templates;
		}
	};
}
