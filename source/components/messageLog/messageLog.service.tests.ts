/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../typings/lodashTypeExtensions.d.ts' />
/// <reference path='../../../typings/lodash/lodash.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import __array = services.array;

import {
	moduleName,
	factoryName,
	IMessageLog,
	IMessageLogFactory,
	IGetMessagesResult,
} from './messageLog.module';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

interface ITestDataService {
	saveMessage: Sinon.SinonSpy;
	getMessages: Sinon.SinonSpy;
	deleteMessage: Sinon.SinonSpy;
}

describe('messageLog', () => {
	let messageLog: IMessageLog;
	let dataService: ITestDataService;
	let allMessages: string[];

	beforeEach(() => {
		angular.mock.module(test.moduleName);
		angular.mock.module(moduleName);

		allMessages = defaultMessages();

		let services: any = test.angularFixture.inject(factoryName);
		let messageLogFactory: IMessageLogFactory = services[factoryName];
		messageLog = messageLogFactory.getInstance();
		messageLog.pageSize = 5;

		dataService = {
			saveMessage: test.mock.promise((message: any): void => { allMessages.unshift(message); }),
			deleteMessage: test.mock.promise((message: any): void => { __array.arrayUtility.remove(allMessages, message); }),
			getMessages: test.mock.promise((startFrom: number, quantity: number): IGetMessagesResult => {
				let hasMoreMessages: boolean = startFrom + quantity < allMessages.length;
				return {
					hasMoreMessages: hasMoreMessages,
					messages: <any>_(allMessages).drop(startFrom).take(quantity).value(),
				};
			}),
		};
	});

	function defaultMessages(): string[] {
		return ['1', '2', '3', '4', '5'
			, '6', '7', '8', '9', '10'
			, '11', '12', '13', '14', '15'
			, '16', '17', '18', '19', '20'];
	}

	it('should load an initial page of messages from the server', (): void => {
		messageLog.dataService = <any>dataService;

		sinon.assert.calledOnce(dataService.getMessages);
		test.mock.flushAll(dataService);

		expect(messageLog.visibleMessages).to.have.length(5);
	});

	describe('after initial request', (): void => {
		beforeEach((): void => {
			messageLog.dataService = <any>dataService;
			test.mock.flushAll(dataService);
			dataService.getMessages.reset();
		});

		it('should load the next page from the server if more messages are available', (): void => {
			messageLog.getNextPage();
			sinon.assert.calledOnce(dataService.getMessages);
			test.mock.flushAll(dataService);

			expect(messageLog.visibleMessages[0]).to.equal('6');
			expect(messageLog.visibleMessages[1]).to.equal('7');
			expect(messageLog.visibleMessages[2]).to.equal('8');
			expect(messageLog.visibleMessages[3]).to.equal('9');
			expect(messageLog.visibleMessages[4]).to.equal('10');
		});

		it('should not load a full page if not enough messages are available', (): void => {
			messageLog.pageSize = 15;
			test.mock.flushAll(dataService);
			expect(messageLog.visibleMessages).to.have.length(15);

			messageLog.getNextPage();

			test.mock.flushAll(dataService);

			expect(messageLog.visibleMessages).to.have.length(5);
			expect(messageLog.visibleMessages[0]).to.equal('16');
			expect(messageLog.visibleMessages[1]).to.equal('17');
			expect(messageLog.visibleMessages[2]).to.equal('18');
			expect(messageLog.visibleMessages[3]).to.equal('19');
			expect(messageLog.visibleMessages[4]).to.equal('20');
		});

		it('should refresh the current page when the page size changes', (): void => {
			messageLog.pageSize = 10;
			sinon.assert.calledOnce(dataService.getMessages);
			test.mock.flushAll(dataService);

			expect(messageLog.visibleMessages).to.have.length(10);
		});

		it('should load a full page when paging back to the beginning even if less than a full page of messages were paged back'
			, (): void => {
				messageLog.getNextPage();
				(<any>dataService.getMessages).flush();

				expect(messageLog.visibleMessages[0]).to.equal('6');
				expect(messageLog.visibleMessages[1]).to.equal('7');
				expect(messageLog.visibleMessages[2]).to.equal('8');
				expect(messageLog.visibleMessages[3]).to.equal('9');
				expect(messageLog.visibleMessages[4]).to.equal('10');

				messageLog.pageSize = 10;
				messageLog.getPreviousPage();
				test.mock.flushAll(dataService);

				expect(messageLog.visibleMessages.length).to.equal(10);
				expect(messageLog.visibleMessages[0]).to.equal('1');
				expect(messageLog.visibleMessages[1]).to.equal('2');
				expect(messageLog.visibleMessages[2]).to.equal('3');
				expect(messageLog.visibleMessages[3]).to.equal('4');
				expect(messageLog.visibleMessages[4]).to.equal('5');
				expect(messageLog.visibleMessages[5]).to.equal('6');
				expect(messageLog.visibleMessages[6]).to.equal('7');
				expect(messageLog.visibleMessages[7]).to.equal('8');
				expect(messageLog.visibleMessages[8]).to.equal('9');
				expect(messageLog.visibleMessages[9]).to.equal('10');
			});

		it('should disable paging forward if no more messages are available', (): void => {
			messageLog.pageSize = 20;
			test.mock.flushAll(dataService);
			dataService.getMessages.reset();

			expect(messageLog.hasForwardMessages).to.be.false;

			messageLog.getNextPage();
			sinon.assert.notCalled(dataService.getMessages);
			expect(messageLog.hasForwardMessages).to.be.false;
		});

		it('should disable paging backward if at the beginning of the log', (): void => {
			expect(messageLog.hasBackwardMessages).to.be.false;

			messageLog.getPreviousPage();
			sinon.assert.notCalled(dataService.getMessages);
			expect(messageLog.hasBackwardMessages).to.be.false;
		});

		it('should load first page when getTopPage is called', (): void => {
			messageLog.getNextPage();
			messageLog.getNextPage();
			sinon.assert.calledTwice(dataService.getMessages);
			test.mock.flushAll(dataService);

			expect(messageLog.visibleMessages).to.have.length(5);
			expect(messageLog.visibleMessages[0]).to.equal('11');
			expect(messageLog.visibleMessages[1]).to.equal('12');
			expect(messageLog.visibleMessages[2]).to.equal('13');
			expect(messageLog.visibleMessages[3]).to.equal('14');
			expect(messageLog.visibleMessages[4]).to.equal('15');

			messageLog.getTopPage();
			sinon.assert.calledThrice(dataService.getMessages);
			test.mock.flushAll(dataService);

			expect(messageLog.visibleMessages).to.have.length(5);
			expect(messageLog.visibleMessages[0]).to.equal('1');
			expect(messageLog.visibleMessages[1]).to.equal('2');
			expect(messageLog.visibleMessages[2]).to.equal('3');
			expect(messageLog.visibleMessages[3]).to.equal('4');
			expect(messageLog.visibleMessages[4]).to.equal('5');
		});

		it('should save a new message, add it to the beginning of the log, and display it if on the first page', (): void => {
			messageLog.addMessage(<any>'new message');
			sinon.assert.calledOnce(dataService.saveMessage);
			test.mock.flushAll(dataService);
			test.mock.flushAll(dataService);
			expect(messageLog.visibleMessages[0]).to.equal('new message');
		});

		it('should delete the message and refresh the current page', (): void => {
			messageLog.getNextPage();
			test.mock.flushAll(dataService);

			expect(messageLog.visibleMessages[0]).to.equal('6');

			messageLog.deleteMessage(messageLog.visibleMessages[0]);

			sinon.assert.calledOnce(dataService.deleteMessage);
			test.mock.flushAll(dataService);
			test.mock.flushAll(dataService);

			expect(messageLog.visibleMessages).to.have.length(5);
			expect(messageLog.visibleMessages[0]).to.equal('7');
			expect(messageLog.visibleMessages[1]).to.equal('8');
			expect(messageLog.visibleMessages[2]).to.equal('9');
			expect(messageLog.visibleMessages[3]).to.equal('10');
			expect(messageLog.visibleMessages[4]).to.equal('11');
		});

		it('should take the user back to the first page if the user adds a new message', (): void => {
			messageLog.getNextPage();
			test.mock.flushAll(dataService);
			dataService.getMessages.reset();

			messageLog.addMessage(<any>'new message');
			sinon.assert.calledOnce(dataService.saveMessage);
			test.mock.flushAll(dataService);
			test.mock.flushAll(dataService);

			expect(messageLog.visibleMessages).to.have.length(5);
			expect(messageLog.visibleMessages[0]).to.equal('new message');
			expect(messageLog.visibleMessages[1]).to.equal('1');
			expect(messageLog.visibleMessages[2]).to.equal('2');
			expect(messageLog.visibleMessages[3]).to.equal('3');
			expect(messageLog.visibleMessages[4]).to.equal('4');
		});
	});
});
