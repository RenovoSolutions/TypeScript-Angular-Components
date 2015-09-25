import * as angular from 'angular';

import * as autosaveDialog from './autosaveDialog/autosaveDialog.module';
import * as breakpoints from './breakpoints/breakpoints.module';
import * as dialog from './dialog/dialog.service';
import * as windowWrapper from './windowWrapper/windowWrapper.service';

export {
	autosaveDialog,
	breakpoints,
	dialog,
	windowWrapper,
};

export var moduleName: string = 'rl.ui.services';

angular.module(moduleName, [
	autosaveDialog.moduleName,
	breakpoints.moduleName,
	dialog.moduleName,
	windowWrapper.moduleName,
]);
