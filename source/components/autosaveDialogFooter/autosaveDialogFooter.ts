'use strict';

import * as angular from 'angular';

export var moduleName: string = 'rl.ui.components.autosaveDialogFooter';
export var directiveName: string = 'rlAutosaveDialogFooter';

function autosaveDialogFooter(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./autosaveDialogFooter.html'),
	};
}

angular.module(moduleName, [])
	.directive(directiveName, autosaveDialogFooter);
