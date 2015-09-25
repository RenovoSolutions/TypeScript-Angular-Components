/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';

import {
	moduleName,
	controllerName,
	MessageLogController,
} from './messageLog.module';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

interface IMockMessageLogService {
	visibleMessages: number[];
	hasForwardMessages: boolean;
	hasBackwardMessages: boolean;
	busy: boolean;
	pageSize: number;
	getNextPage: Sinon.SinonSpy;
	getTopPage: Sinon.SinonSpy;
}

describe('MessageLogController', () => {
	var scope: angular.IScope;
	var log: MessageLogController;
	var messageLogService: IMockMessageLogService;

	beforeEach(() => {
		angular.mock.module(moduleName);

		messageLogService = {
			visibleMessages: [1, 2, 3, 4, 5],
			hasForwardMessages: true,
			hasBackwardMessages: false,
			busy: false,
			pageSize: 0,
			getNextPage: sinon.spy(),
			getTopPage: sinon.spy(),
		};

		var messageLogFactory: any = {
			getInstance(): any {
				return messageLogService;
			},
		};

		test.angularFixture.mock({
			messageLog: messageLogFactory,
		});
	});

	it('should set messages on the scope to the visible messages of the service', (): void => {
		buildController();
		scope.$digest();

		expect(log.messages).to.equal(messageLogService.visibleMessages);

		messageLogService.visibleMessages = [4, 5, 6, 7, 8];
		scope.$digest();

		expect(log.messages).to.equal(messageLogService.visibleMessages);
	});

	it('should set hasNextPage to the has forward messages flag on the service', (): void => {
		buildController();
		scope.$digest();

		expect(log.hasNextPage).to.be.true;

		messageLogService.hasForwardMessages = false;
		scope.$digest();

		expect(log.hasNextPage).to.be.false;
	});

	it('should set hasPreviousPage to the has backward messages flag on the service', (): void => {
		buildController();
		scope.$digest();

		expect(log.hasPreviousPage).to.be.false;

		messageLogService.hasBackwardMessages = true;
		scope.$digest();

		expect(log.hasPreviousPage).to.be.true;
	});

	it('should set the base loading flag when busy is set to true and clear all loading flags if busy is set to false on the service', (): void => {
		buildController();

		expect(log.loadingInitial).to.be.true;

		messageLogService.busy = true;
		scope.$digest();

		expect(log.loading).to.be.true;

		messageLogService.busy = false;
		scope.$digest();

		expect(log.loading).to.be.false;
		expect(log.loadingInitial).to.be.false;
	});

	it('should set the page size on initialization', (): void => {
		buildController();
		expect(messageLogService.pageSize).to.equal(8);
	});

	it('should set the page size to the value specified on the scope', (): void => {
		buildController(5);
		expect(messageLogService.pageSize).to.equal(5);
	});

	it('should set loading older to true and call getNextPage on the service', (): void => {
		buildController();
		log.getOlder();
		sinon.assert.calledOnce(messageLogService.getNextPage);
	});

	it('should set loading top to true and call getTopPage on the service', (): void => {
		buildController();
		log.getTop();
		sinon.assert.calledOnce(messageLogService.getTopPage);
	});

	function buildController(pageSize?: number): void {
		var bindings: any = {
			pageSize: pageSize,
		};

		var controllerResult: test.IControllerResult<MessageLogController>
			= test.angularFixture.controllerWithBindings<MessageLogController>(controllerName, bindings);

		scope = controllerResult.scope;
		log = controllerResult.controller;
	}
});
