'use strict';

import * as angular from 'angular';

import 'angular-ui-bootstrap';
import 'angular-sanitize';
import 'rangy';
import 'textangular';

import '../libraries/angular-bootstrap-slider/index';

import 'signature_pad';

import * as behaviors from './behaviors/behaviors.module';
import * as components from './components/components.module';
import * as services from './services/services.module';

export { behaviors, components, services };

export var moduleName: string = 'rl.ui';

angular.module(moduleName, [
	'ui.bootstrap',
	'ui.bootstrap-slider',
	'ngSanitize',
	'textAngular',

	behaviors.moduleName,
	components.moduleName,
	services.moduleName,
]);
