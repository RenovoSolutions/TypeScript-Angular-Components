// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='messageLog.service.ts' />

module rl.ui.components.messageLog {
	'use strict';

	export var directiveName: string = 'rlMessageLog';
	export var controllerName: string = 'MessageLogController';

	export interface IMessageLogBindings {
		pageSize: number;
		dataService: IMessageLogDataService;
		messageLogBinding: IMessageLog;
	}

	export class MessageLogController {
		// bindings
		pageSize: number;
		dataService: IMessageLogDataService;
		messageLogBinding: IMessageLog;

		messages: IMessage[];
		hasNextPage: boolean;
		hasPreviousPage: boolean;
		messageLog: IMessageLog;

		loading: boolean;
		loadingInitial: boolean;

		static $inject: string[] = ['$scope', factoryName];
		constructor($scope: ng.IScope, messageLogFactory: IMessageLogFactory) {
			this.messageLog = this.messageLogBinding != null ? this.messageLogBinding : messageLogFactory.getInstance();

			this.loadingInitial = true;

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

			this.messageLog.pageSize = this.pageSize != null ? this.pageSize : 8;
			this.messageLog.dataService = this.dataService;
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
			template: `
				<div>
					<rl-busy loading="log.loadingInitial" size="2x"></rl-busy>
					<div class="content-group" ng-repeat="entry in log.messages">
						<div ng-bind-html="entry.message"></div>
						<div class="byline">{{entry.createdBy}}</div>
						<div class="byline">{{entry.createdDate}} {{entry.createdTime}} UTC</div>
					</div>
					<div class="row">
						<div class="col-xs-12">
							<div class="text-center">
								<rl-button type="default" action="log.getTopPage()" ng-disabled="log.loading" button-right-aligned="true">
									<span ng-show="log.hasPreviousPage">Top</span>
									<span ng-hide="log.hasPreviousPage">Refresh</span>
								</rl-button>
								<rl-button type="default" ng-disabled="log.hasNextPage == false || log.loading" action="log.getNextPage()">
									Older <i class="fa fa-chevron-right"></i>
								</rl-button>
							</div>
						</div>
					</div>
				</div>
			`,
			controller: controllerName,
			controllerAs: 'log',
			scope: {},
			bindToController: {
				dataService: '=',
				pageSize: '=',
				messageLogBinding: '=messageLog',
			},
		};
	}
}
