/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services, filters } from 'typescript-angular-utilities';
import test = services.test;
import __isEmpty = filters.isEmpty;

import {
	moduleName,
	controllerName,
	MessageLogController,
} from './messageLog.module';

import * as angular from 'angular';
import 'angular-mocks';

interface IMockMessageLogService {
	visibleMessages: number[];
	hasForwardMessages: boolean;
	hasBackwardMessages: boolean;
	busy: boolean;
	pageSize: number;
	getNextPage: Sinon.SinonSpy;
	getTopPage: Sinon.SinonSpy;
}

describe('messageLog', () => {
	var scope: angular.IScope;
	var log: MessageLogController;
	var messageLogService: IMockMessageLogService;

	beforeEach(() => {
		angular.mock.module(moduleName);
		angular.mock.module(__isEmpty.moduleName);

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

	describe('MessageLogController', () => {
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
			scope.$digest();

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

	describe('rlMessageLog directive', (): void => {
		it('should add a message template and selector', (): void => {
			var directiveResult: test.IDirectiveResult<MessageLogController> =
				test.angularFixture.directive<MessageLogController>('rlMessageLog', `
				<rl-message-log service="logService" selector="selectorFunction">
					<template when-selector="true">
						<p>Message is greater than 3</p>
					</template>
				</rl-message-log>
				`, <any> {
					logService: messageLogService,
					selectorFunction: function(entry) {
						return entry > 3;
					},
				});

			expect(directiveResult.controller.getEntrySelector(<any> 4)).to.be.true;
			expect(directiveResult.controller.getEntrySelector(<any> 3)).to.be.false;

			expect(directiveResult.controller.templates['true'].html()).to.contain('Message is greater than 3');
		});

		it('should have neither a selector or templates', (): void => {
			var directiveResult: test.IDirectiveResult<MessageLogController> =
				test.angularFixture.directive<MessageLogController>('rlMessageLog',
					'<rl-message-log service="logService"></rl-message-log>',
					<any> { logService: messageLogService });

			expect(directiveResult.controller.getEntrySelector(<any> 1)).to.be.undefined;
		});
	});
});

