/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';

import {
	moduleName,
	serviceName,
	IJQueryUtility,
} from './jquery.service';

import * as angular from 'angular';
import 'angular-mocks';

import __test = services.test;

describe('jqueryUtility', () => {
	var jqueryUtility: IJQueryUtility;
	var emptySpy: Sinon.SinonSpy;
	var appendSpy: Sinon.SinonSpy;

	beforeEach(() => {
		angular.mock.module(moduleName);

		var services: any = __test.angularFixture.inject(serviceName);
		jqueryUtility = services.jqueryUtility;

		emptySpy = sinon.spy();
		appendSpy = sinon.spy();
	});

	it('should get the full html content of a jquery object', (): void => {
		const html: string = '<div>Test</div>';
		const element: JQuery = angular.element(html);
		expect(jqueryUtility.getHtml(element)).to.equal(html);
	});

	it('should empty the existing content and append the new content', (): void => {
		var existingElement: any = {
			empty: emptySpy,
			append: appendSpy,
		};

		var newContent: any = {};

		jqueryUtility.replaceContent(existingElement, newContent);

		sinon.assert.calledOnce(emptySpy);
		sinon.assert.calledOnce(appendSpy);
		sinon.assert.calledWith(appendSpy, newContent);
	});
});
