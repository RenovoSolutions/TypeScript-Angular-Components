import * as angular from 'angular';

import { services, downgrade } from 'typescript-angular-utilities';
import __object = services.object;

import {
	IMessageLogDataService,
	IMessageLog,
	factoryName as messageLogFactoryName,
	IMessageLogFactory,
	IUser,
} from './messageLog.service';

export var directiveName: string = 'rlEditableMessageLog';
export var controllerName: string = 'EditableMessageLogController'


export interface IEditableMessageLogBindings {
	pageSize: number;
	service: IMessageLogDataService;
	currentUser?: IUser;
	canDelete?: boolean;
}

export class EditableMessageLogController {
	// bindings
	pageSize: number;
	service: IMessageLogDataService;
	currentUser: IUser;
	canDelete: boolean;

	messageLogService: IMessageLog;
	newMessage: string;
	busy: boolean;
	savingMessage: boolean;

	static $inject: string[] = ['$scope', messageLogFactoryName, downgrade.objectServiceName];
	constructor($scope: angular.IScope
		, messageLogFactory: IMessageLogFactory
		, private object: __object.IObjectUtility) {
		this.messageLogService = messageLogFactory.getInstance();

		$scope.$watch((): boolean => { return this.messageLogService.busy; }, (value: boolean): void => {
			if (value === false) {
				this.busy = false;
				this.savingMessage = false;
			} else {
				this.busy = true;
			}
		});
	}

	add(): angular.IPromise<void> {
		if (this.object.isNullOrWhitespace(this.newMessage)) {
			return null;
		}

		this.savingMessage = true;
		var message: string = this.newMessage;
		this.newMessage = '';
		return this.messageLogService.addMessage({ message: message });
	}
}

export function editableMessageLog(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: `
			<form ng-submit="log.add()">
				<div class="input-group">
					<input type="text" class="form-control" ng-model="log.newMessage" placeholder="Enter log message" />
					<span class="input-group-btn">
						<button class="btn btn-default" type="submit" ng-disabled="log.busy">
							<rl-busy loading="log.savingMessage"></rl-busy> Add
						</button>
					</span>
				</div>
				<div class="message-log">
					<rl-message-log service="log.service" page-size="log.pageSize" message-log="log.messageLogService"
									current-user="log.currentUser" can-delete="log.canDelete"></rl-message-log>
				</div>
			</form>
		`,
		controller: controllerName,
		controllerAs: 'log',
		scope: {},
		bindToController: {
			service: '=',
			pageSize: '=?',
			currentUser: '=?',
			canDelete: '=?',
		},
	};
}
