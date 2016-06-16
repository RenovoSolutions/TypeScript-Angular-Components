import * as angular from 'angular';

import * as mergeSort from './mergeSort/mergeSort.service';
import * as sorter from './sorter/sorter.service';

export * from './sort';
export * from './sortDirection';

export {
	mergeSort,
	sorter,
};

export var moduleName: string = 'rl.ui.components.cardContainer.sorts';

angular.module(moduleName, []);
