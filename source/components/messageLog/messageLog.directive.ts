// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as ng from 'angular';

import { services } from 'typescript-angular-utilities';
import __object = services.object;

import {
	moduleName as jqueryModuleName,
	serviceName as jqueryServiceName,
	IJQueryUtility,
} from '../../services/jquery/jquery.service';

import { IMessageLogDataService, IMessageLog, IMessage, factoryName, IMessageLogFactory, IUser } from './messageLog.service';

import { ITemplateLoader, serviceName as templateLoaderService } from '../../services/templateLoader/templateLoader.service';

export var directiveName: string = 'rlMessageLog';
export var controllerName: string = 'MessageLogController';

export interface IMessageLogBindings {
	pageSize: number;
	service: IMessageLogDataService;
	messageLogBinding: IMessageLog;
	messageAs: string;
	currentUser?: IUser;
	canDelete?: boolean;

	selector: { (IMessage): any } | string;
}

export class MessageLogController implements IMessageLogBindings {
	// bindings
	pageSize: number;
	service: IMessageLogDataService;
	messageLogBinding: IMessageLog;
	messageAs: string;
	selector: { (IMessage): any } | string;
	currentUser: IUser;
	canDelete: boolean;

	messages: IMessage[];
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	messageLog: IMessageLog;

	templates: any;

	loading: boolean;
	loadingInitial: boolean;

	static $inject: string[] = ['$scope', factoryName];
	constructor($scope: ng.IScope, messageLogFactory: IMessageLogFactory) {
		this.messageLog = this.messageLogBinding || messageLogFactory.getInstance();

		$scope.$watch((): IMessage[]=> { return this.messageLog.visibleMessages; }
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
			return entry[<string> this.selector];
		} else if (_.isFunction(this.selector)) {
			return (<{ (IMessage): any }> this.selector)(entry);
		}
	}

	getOlder(): ng.IPromise<void> {
		return this.messageLog.getNextPage();
	}

	getTop(): ng.IPromise<void> {
		return this.messageLog.getTopPage();
	}

	canDeleteEntry(entry: IMessage): boolean {
		return this.canDelete && (this.currentUser == null || this.currentUser.id == entry.id);
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
