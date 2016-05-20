import * as angular from 'angular';

import * as autosave from './autosave/autosave.service';
import * as autosaveAction from './autosaveAction/autosaveAction.service';
import * as breakpoints from './breakpoints/breakpoints.module';
import * as componentValidator from './componentValidator/componentValidator.service';
import * as contentProvider from './contentProvider/contentProvider.service';
import * as dialog from './dialog/dialog.service';
import * as documentWrapper from './documentWrapper/documentWrapper.service';
import * as form from './form/form.service';
import * as jquery from './jquery/jquery.service';
import * as parentChild from './parentChild/parentChild.service';
import * as promise from './promise/promise.service';
import * as templateLoader from './templateLoader/templateLoader.service';
import * as windowWrapper from './windowWrapper/windowWrapper.service';


export {
	autosave,
	autosaveAction,
	breakpoints,
	componentValidator,
	contentProvider,
	dialog,
	documentWrapper,
	form,
	jquery,
	parentChild,
	promise,
	templateLoader,
	windowWrapper,
};

export var moduleName: string = 'rl.ui.services';

angular.module(moduleName, [
	autosave.moduleName,
	autosaveAction.moduleName,
	breakpoints.moduleName,
	componentValidator.moduleName,
	contentProvider.moduleName,
	dialog.moduleName,
	documentWrapper.moduleName,
	form.moduleName,
	jquery.moduleName,
	parentChild.moduleName,
	promise.moduleName,
	templateLoader.moduleName,
	windowWrapper.moduleName,
]);
