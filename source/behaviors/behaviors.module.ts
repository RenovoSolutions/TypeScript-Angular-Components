import * as angular from 'angular';

import * as autosave from './autosave/autosave';

export { autosave };

export var moduleName: string = 'rl.ui.behaviors';

angular.module(moduleName, [
	autosave.moduleName,
]);
