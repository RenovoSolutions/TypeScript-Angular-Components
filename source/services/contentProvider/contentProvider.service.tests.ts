/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';

import { IContentProviderService, IContentProviderServiceFactory, moduleName, serviceName } from './contentProvider.service';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

describe('contentProvider', () => {
	var contentProvider: IContentProviderService;
	var transcludeSpy: Sinon.SinonSpy;
	var filterSpy: Sinon.SinonSpy;
	var jqueryClone: any;

	beforeEach(() => {
		angular.mock.module(moduleName);

		var services: any = test.angularFixture.inject(serviceName);
		var contentProviderFactory: IContentProviderServiceFactory
			= services[serviceName];
		contentProvider = contentProviderFactory.getInstance();

		jqueryClone = {};
		filterSpy = sinon.spy((object: any): any => { return object; });
		jqueryClone.filter = filterSpy;

		transcludeSpy = sinon.spy((func: Function) => func(jqueryClone));
	});

	it('should get the content that was set by setContent', (): void => {
		contentProvider.setContent(jqueryClone);
		expect(contentProvider.getContent()).to.equal(jqueryClone);
	});

	it('should set the content to the content provided by the transclude function', (): void => {
		contentProvider.setTranscludeContent(<any> transcludeSpy);

		sinon.assert.calledOnce(transcludeSpy);

		expect(contentProvider.getContent()).to.equal(jqueryClone);
	});

	it('should filter the jquery object with the specified selector', (): void => {
		contentProvider.setContent(jqueryClone);

		contentProvider.getContent('selector');

		sinon.assert.calledOnce(filterSpy);
		sinon.assert.calledWith(filterSpy, 'selector');
	});

	it('should call the action with the new content when the content changes', (): void => {
		var actionSpy: Sinon.SinonSpy = sinon.spy();

		contentProvider.contentChanges.subscribe(actionSpy);
		actionSpy.reset();

		contentProvider.setContent(jqueryClone);

		sinon.assert.calledOnce(actionSpy);
		expect(actionSpy.firstCall.args[0].newContent).to.equal(jqueryClone);
	});

	it('should call the action immediately if there is already content', (): void => {
		var actionSpy: Sinon.SinonSpy = sinon.spy();

		contentProvider.setContent(jqueryClone);

		contentProvider.contentChanges.subscribe(actionSpy);

		sinon.assert.calledOnce(actionSpy);
		expect(actionSpy.firstCall.args[0].newContent).to.equal(jqueryClone);
	});
});
