// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as ng from 'angular';

export var headerButtonDirectiveName: string = 'rlHeaderButton';

export interface IHeaderButtonScope extends ng.IScope {
	trigger(): void;
	execCommand(command: string, value: string): void;
}

export function headerButton(): ng.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: `
			<button type="button" class="nw-button" ng-click="trigger()" ng-disabled="editMode" title="Header 1">
				<i class="fa fa-header"></i>
			</button>
		`,
		link(scope: IHeaderButtonScope): void {
			scope.trigger = (): void => {
				scope.execCommand('formatblock', 'h1');
			};
		},
	};
}
