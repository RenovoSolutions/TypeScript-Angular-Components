import * as angular from 'angular';
import { downgrade } from 'typescript-angular-utilities';

import * as filterOption from './filterOption/filterOption.ng1';
import * as modeFilterGroup from './modeFilterGroup/modeFilterGroup.service';
import * as rangeFilterGroup from './rangeFilterGroup/rangeFilterGroup.service';

export {
	filterOption,
	modeFilterGroup,
	rangeFilterGroup,
};

import { componentName, filterGroup, controllerName, FilterGroupController } from './filterGroup.directive.ng1';

export * from './filterGroup.directive.ng1';
export * from './filterGroup.service';

export const moduleName: string = 'rl.ui.components.cardContainer.filters.filterGroup';

angular.module(moduleName, [
	downgrade.moduleName,

	filterOption.moduleName,
])
	.component(componentName, filterGroup)
	.controller(controllerName, FilterGroupController);
