import * as angular from 'angular';

import * as alias from './alias/alias';
import * as autosave from './autosave/autosave';
import * as popover from './popover/popover';

export { alias, autosave, popover };

export var moduleName: string = 'rl.ui.behaviors';

angular.module(moduleName, [
	alias.moduleName,
	autosave.moduleName,
	popover.moduleName,
]);
