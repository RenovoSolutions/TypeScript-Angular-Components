'use strict';

// /// <reference path='../../../typings/bootstrapDateTimePicker.d.ts' />

import * as angular from 'angular';
import * as moment from 'moment';


export let moduleName: string = 'rl.ui.components.dateTimeStatic';
export let componentName: string = 'rlDateTimeStatic';

export interface IDateTimeStaticBindings {
	dateValue: moment.Moment;
	includeTime: boolean;
}

let dateTimeStaticComponent: angular.IComponentOptions = {
	template: require('./dateTimeStatic.html'),
	controllerAs: 'view',
	bindings: {
		dateValue: '<',
		includeTime: '<?',
	},
};

angular.module(moduleName, [])
	.component(componentName, dateTimeStaticComponent);