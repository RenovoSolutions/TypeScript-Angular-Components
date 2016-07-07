import * as angular from 'angular';

import * as alias from './alias/alias';
import * as alternatingClass from './alternatingClass/alternatingClass';
import * as autosave from './autosave/autosave.ng1';
import * as offClick from './offClick/offClick.ng1';
import * as popover from './popover/popover';
import * as required from './required/required';

export { alias, autosave, offClick, popover, required };

export var moduleName: string = 'rl.ui.behaviors';

angular.module(moduleName, [
	alias.moduleName,
	alternatingClass.moduleName,
	autosave.moduleName,
	offClick.moduleName,
	popover.moduleName,
	required.moduleName,
]);
