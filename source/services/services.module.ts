import * as angular from 'angular';

import * as autosave from './autosave/autosave.service';
import * as autosaveAction from './autosaveAction/autosaveAction.service';
import * as breakpointsNg1 from './breakpoints/breakpoints.module';
import * as breakpoints from './breakpoints/index';
import * as componentValidator from './componentValidator/componentValidator.service.ng1';
import * as contentProvider from './contentProvider/contentProvider.service';
import * as dialog from './dialog/dialog.service.ng1';
import * as documentWrapper from './documentWrapper/documentWrapper.service';
import * as form from './form/form.service.ng1';
import * as jquery from './jquery/jquery.service';
import * as parentChild from './parentChild/parentChild.service';
import * as promise from './promise/promise.service';
import * as templateLoader from './templateLoader/templateLoader.service';
import * as windowWrapper from './windowWrapper/windowWrapper.service';


export {
	autosave,
	autosaveAction,
	breakpoints,
	breakpointsNg1,
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
	breakpointsNg1.moduleName,
	componentValidator.moduleName,
	contentProvider.moduleName,
	dialog.moduleName,
	form.moduleName,
	jquery.moduleName,
	parentChild.moduleName,
	promise.moduleName,
	templateLoader.moduleName
]);
