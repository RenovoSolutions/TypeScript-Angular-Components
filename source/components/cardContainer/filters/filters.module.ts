import * as angular from 'angular';

import * as columnSearchFilter from './columnSearchFilter/columnSearchFilter.service';
import * as dateFilter from './dateFilter/dateFilter.module';
import * as filterGroup from './filterGroup/filterGroup.module';
import * as selectFilter from './selectFilter/selectFilter.module';

import * as cardContainerFilters from './cardContainerFilters';

export * from './cardContainerFilters';

export { columnSearchFilter, filterGroup, selectFilter };

export var moduleName: string = 'rl.ui.components.cardContainer.filters';

angular.module(moduleName, [
	columnSearchFilter.moduleName,
	dateFilter.moduleName,
	filterGroup.moduleName,
	selectFilter.moduleName,

	cardContainerFilters.moduleName
]);
