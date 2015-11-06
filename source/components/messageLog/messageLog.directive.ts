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

import { IMessageLogDataService, IMessageLog, IMessage, factoryName, IMessageLogFactory } from './messageLog.service';

import { IGenericTemplate } from '../genericContainer/genericContainer';

export var directiveName: string = 'rlMessageLog';
export var controllerName: string = 'MessageLogController';

export interface IMessageLogBindings {
	pageSize: number;
	service: IMessageLogDataService;
	messageLogBinding: IMessageLog;

	selector: { (IMessage): any } | string;
}

export class MessageLogController implements IMessageLogBindings {
	// bindings
	pageSize: number;
	service: IMessageLogDataService;
	messageLogBinding: IMessageLog;
	selector: { (IMessage): any } | string;

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
}

interface IMessageLogScope {
	defaultTemplate: IGenericTemplate | string;

}

messageLog.$inject = ['$interpolate', jqueryServiceName, __object.serviceName];
export function messageLog($interpolate: angular.IInterpolateService,
							jquery: IJQueryUtility,
							object: __object.IObjectUtility): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./messageLog.html'),
		transclude: true,
		controller: controllerName,
		controllerAs: 'log',
		scope: {},
		bindToController: {
			service: '=',
			selector: '=',
			pageSize: '=',
			messageLogBinding: '=messageLog',
		},
		link: (scope: angular.IScope,
			   element: angular.IAugmentedJQuery,
			   attributes: angular.IAttributes,
			   controller: MessageLogController,
			   transclude: angular.ITranscludeFunction): void => {
			controller.templates = {};

			// Load templates from the DOM
			transclude((clone: angular.IAugmentedJQuery,
						transclusionScope: angular.IScope): void => {
				var templates: JQuery = clone.filter('template');

				templates.each((index: number,
								template: Element): void => {
					var templateElement: angular.IAugmentedJQuery = angular.element(template);
					var templateHtml: string = templateElement.html();

					var triggerAttribute: string = templateElement.attr('when-selector');
					if (!object.isNullOrWhitespace(triggerAttribute)) {
						var trigger: string = $interpolate(triggerAttribute)(transclusionScope);
						controller.templates[trigger] = templateHtml;
					}
				});
			});
		}
	};
}
