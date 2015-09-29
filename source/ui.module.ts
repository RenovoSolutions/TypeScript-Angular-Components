'use strict';

import * as angular from 'angular';

import * as behaviors from './behaviors/behaviors.module';
import * as components from './components/components.module';
import * as services from './services/services.module';

export { behaviors, components, services };

export var moduleName: string = 'rl.ui';

angular.module(moduleName, [
	behaviors.moduleName,
	components.moduleName,
	services.moduleName,
]);
