import { Component, Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
import * as angular from 'angular';
import * as moment from 'moment';

import { ITemplateObject } from '../../source/components/templateRenderer/templateRenderer.ng1';

export const moduleName: string = 'MiscTestModule';

interface ITemplateScope extends angular.IScope {
	text: string;
}

class MiscTestController {
	myNum: number;
	myValue: number;
	text: string;
	template: ITemplateObject;
	number: number;
	date: moment.Moment;
	initialized: boolean;

	static $inject: string[] = ['$scope', '$timeout'];
	constructor(private $scope: angular.IScope) { }

	$onInit(): void {
		this.myNum = 2;
		this.myValue = 1;

		let templateScope: ITemplateScope = <ITemplateScope>this.$scope.$new();
		templateScope.text = 'Some text';
		this.template = {
			template: '<div>{{text}}</div>',
			scope: templateScope,
		};

		this.number = 5;

		this.date = moment('2016-04-01T12:00:00.000-08:00').tz('US/Pacific');

		const unbind = this.$scope.$watch('misc.lazyLoad', (value: boolean): void => {
			if (value) {
				this.initialized = true;
				unbind();
			}
		});
	}
}

@Component({
	selector: 'tsMiscNg1Bootstrapper',
	template: '<tsMiscNg1></tsMiscNg1>'
})
export class MiscNg1BootstrapperComponent { }

@Component({
	selector: 'tsMiscNg2Bootstrapper',
	template: '<tsMiscNg2></tsMiscNg2>'
})
export class MiscNg2BootstrapperComponent {}

@Directive({
	selector: 'tsMiscNg1'
})
export class MiscNg1Directive extends UpgradeComponent {
	constructor(elementRef: ElementRef, injector: Injector) {
		super('tsMiscNg1', elementRef, injector);
	}
}

@Directive({
	selector: 'tsMiscNg2'
})
export class MiscNg2Directive extends UpgradeComponent {
	constructor(elementRef: ElementRef, injector: Injector) {
		super('tsMiscNg2', elementRef, injector);
	}
}

angular.module(moduleName, [])
	.component('tsMiscNg1', {
		template: require('./miscNg1.html'),
		controller: 'MiscTestController',
		controllerAs: 'misc',
	})
	.component('tsMiscNg2', {
		template: require('./miscNg2.html'),
		controller: 'MiscTestController',
		controllerAs: 'misc',
	})
	.controller('MiscTestController', MiscTestController);
