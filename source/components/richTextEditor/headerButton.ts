// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as ng from 'angular';

export var headerButtonDirectiveName: string = 'rlHeaderButton';
export var headerButtonControllerName: string = 'HeaderButtonController';

export interface IHeaderButtonScope extends ng.IScope {
	execCommand(command: string, value: string): void;
}

export class HeaderButtonController {
	static $inject: string[] = ['$scope'];
	constructor(private $scope: IHeaderButtonScope) {}

	active: boolean;

	trigger(): void {
		let value: string = this.active ? 'p' : 'h1';
		this.active = !this.active;
		this.$scope.execCommand('formatblock', value);
	}
}

export function headerButton(): ng.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./headerButton.html'),
		controller: headerButtonControllerName,
		controllerAs: 'header',
	};
}
