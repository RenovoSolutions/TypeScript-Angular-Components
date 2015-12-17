'use strict';

import * as angular from 'angular';

import * as columnSearchFilter from './columnSearchFilter/columnSearchFilter.service';
import * as filterGroup from './filterGroup/filterGroup.module';
import * as selectFilter from './selectFilter/selectFilter.module';

export { columnSearchFilter, filterGroup, selectFilter };

export var moduleName: string = 'rl.ui.components.cardContainer.filters';

angular.module(moduleName, [
	columnSearchFilter.moduleName,
	filterGroup.moduleName,
	selectFilter.moduleName
]);
