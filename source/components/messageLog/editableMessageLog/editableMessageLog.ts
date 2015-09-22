// /// <reference path='../../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../messageLog.service.ts' />

module rl.ui.components.messageLog.editableMessageLog {
	'use strict';

	export var moduleName: string = 'rl.ui.components.messageLog.editableMessageLog';
	export var directiveName: string = 'rlEditableMessageLog';
	export var controllerName: string = 'EditableMessageLogController'

	import __object = rl.utilities.services.object;;

	export interface IEditableMessageLogBindings {
		pageSize: number;
		dataService: IMessageLogDataService;
	}

	export class EditableMessageLogController {
		// bindings
		pageSize: number;
		dataService: IMessageLogDataService;

		messageLogService: IMessageLog;
		newMessage: string;
		busy: boolean;
		savingMessage: boolean;

		static $inject: string[] = ['$scope', components.messageLog.factoryName, __object.serviceName];
		constructor($scope: ng.IScope
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

		add(): ng.IPromise<void> {
			if (this.object.isNullOrWhitespace(this.newMessage)) {
				return null;
			}

			this.savingMessage = true;
			var message: string = this.newMessage;
			this.newMessage = '';
			return this.messageLogService.addMessage(message);
		}
	}

	export function editableMessageLog(): ng.IDirective {
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
					<div class="shallow well">
						<rl-message-log data-service="log.dataService" page-size="log.pageSize" message-log="log.messageLogService"></rl-message-log>
					</div>
				</form>
			`,
			controller: controllerName,
			controllerAs: 'log',
			scope: {},
			bindToController: {
				dataService: '=',
				pageSize: '=',
			},
		};
	}

	angular.module(moduleName, [__object.moduleName])
		.directive(directiveName, editableMessageLog)
		.controller(controllerName, EditableMessageLogController);
}
