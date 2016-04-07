'use strict';

import * as angular from 'angular';

import 'angular-ui-bootstrap';
import 'angular-sanitize';

import { name as utilitiesModule } from 'typescript-angular-utilities';

import '../libraries/angular-bootstrap-slider/slider';

import 'signature_pad';

import * as behaviors from './behaviors/behaviors.module';
import * as components from './components/components.module';
import * as filters from './filters/filters.module';
import * as services from './services/services.module';
import * as types from './types/types.module';

export { behaviors, components, filters, services, types };

export var moduleName: string = 'rl.ui';

angular.module(moduleName, [
	'ui.bootstrap',
	'ui.bootstrap-slider',
	'ngSanitize',
	utilitiesModule,

	behaviors.moduleName,
	components.moduleName,
	filters.moduleName,
	services.moduleName,
]);
