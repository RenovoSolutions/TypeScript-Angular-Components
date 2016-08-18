import * as angular from 'angular';

import * as alias from './alias/alias';
import * as alternatingClass from './alternatingClass/alternatingClass';
import * as autosave from './autosave/autosave.ng1';
import * as offClick from './offClick/offClick.ng1';
import * as popover from './popover/popover';
import * as required from './required/required';
import * as focusOn from './focusOn/focusOn.ng1';

export { alias, autosave, offClick, popover, required, focusOn };

export var moduleName: string = 'rl.ui.behaviors';

angular.module(moduleName, [
	alias.moduleName,
	alternatingClass.moduleName,
	autosave.moduleName,
	offClick.moduleName,
	popover.moduleName,
	required.moduleName,
	focusOn.moduleName
]);
