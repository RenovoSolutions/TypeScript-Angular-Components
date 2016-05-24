import * as angular from 'angular';
import * as moment from 'moment';

import { ITemplateObject } from '../../source/components/templateRenderer/templateRenderer';

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

	static $inject: string[] = ['$scope'];
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

MiscRoute.$inject = ['$stateProvider'];
function MiscRoute($stateProvider) {
	$stateProvider
		.state('misc', {
			url: '/misc',
			template: require('./misc.html'),
		})
		.state('misc.ng1', {
			url: '/ng1',
			template: require('./miscNg1.html'),
			controller: 'MiscTestController',
			controllerAs: 'misc',
		})
		.state('misc.ng2', {
			url: '/ng2',
			template: require('./miscNg2.html'),
			controller: 'MiscTestController',
			controllerAs: 'misc',
		});
}

angular.module(moduleName, [])
	.controller('MiscTestController', MiscTestController)
	.config(MiscRoute);
