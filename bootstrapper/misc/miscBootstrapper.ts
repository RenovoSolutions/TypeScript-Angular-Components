import * as angular from 'angular';
import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;

import { ITemplateObject } from '../../source/components/templateRenderer/templateRenderer';

export const moduleName: string = 'MiscTestModule';

interface ITemplateScope extends angular.IScope {
	text: string;
}

class MiscTestController {
	myNum: number;
	myValue: number;
	text: string;
	validator: __validation.IValidationHandler;
	template: ITemplateObject;
	number: number;
	date: moment.Moment;
	initialized: boolean;

	static $inject: string[] = ['$scope'];
	constructor(private $scope: angular.IScope) { }

	$onInit(): void {
		this.myNum = 2;
		this.myValue = 1;

		this.validator = {
			validate: () => this.text === 'valid',
			errorMessage: 'String must be valid',
		};

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

angular.module(moduleName, [])
	.controller('MiscTestController', MiscTestController);
