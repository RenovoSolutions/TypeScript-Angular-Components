// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as ng from 'angular';

export var paragraphButtonDirectiveName: string = 'rlParagraphButton';

export interface IParagraphButtonScope extends ng.IScope {
	trigger(): void;
	execCommand(command: string, value: string): void;
}

export function paragraphButton(): ng.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: `
			<button type="button" class="nw-button" ng-click="trigger()" ng-disabled="editMode || isDisabled" title="paragraph">
				<i class="fa fa-paragraph"></i>
			</button>
		`,
		link(scope: IParagraphButtonScope): void {
			scope.trigger = (): void => {
				scope.execCommand('formatblock', 'p');
			};
		},
	};
}
