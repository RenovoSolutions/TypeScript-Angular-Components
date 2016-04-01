import * as angular from 'angular';

import * as alias from './alias/alias';
import * as autosave from './autosave/autosave';
import * as popover from './popover/popover';
import * as required from './required/required';
import * as preventDefault from './preventDefault/preventDefault'

export { alias, autosave, popover, required };

export var moduleName: string = 'rl.ui.behaviors';

angular.module(moduleName, [
	alias.moduleName,
	autosave.moduleName,
	popover.moduleName,
	required.moduleName,
	preventDefault.moduleName
]);
