import * as angular from 'angular';

import * as alias from './alias/alias';
import * as autosave from './autosave/autosave';

export { alias, autosave };

export var moduleName: string = 'rl.ui.behaviors';

angular.module(moduleName, [
	alias.moduleName,
	autosave.moduleName,
]);
