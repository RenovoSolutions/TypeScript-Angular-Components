// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as ng from 'angular';

import { services } from 'typescript-angular-utilities';

import { IMessageLogDataService, IMessageLog, IMessage, factoryName, IMessageLogFactory } from './messageLog.service';

export var directiveName: string = 'rlMessageLog';
export var controllerName: string = 'MessageLogController';

export interface IMessageLogBindings {
	pageSize: number;
	service: IMessageLogDataService;
	messageLogBinding: IMessageLog;
}

export class MessageLogController {
	// bindings
	pageSize: number;
	service: IMessageLogDataService;
	messageLogBinding: IMessageLog;

	messages: IMessage[];
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	messageLog: IMessageLog;

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

	getOlder(): ng.IPromise<void> {
		return this.messageLog.getNextPage();
	}

	getTop(): ng.IPromise<void> {
		return this.messageLog.getTopPage();
	}
}

export function messageLog(): ng.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./messageLog.html'),
		controller: controllerName,
		controllerAs: 'log',
		scope: {},
		bindToController: {
			service: '=',
			pageSize: '=',
			messageLogBinding: '=messageLog',
		},
	};
}
