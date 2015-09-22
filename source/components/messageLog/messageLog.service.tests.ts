/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../typings/lodashTypeExtensions.d.ts' />
/// <reference path='../../../typings/lodash/lodash.d.ts' />
/// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='messageLog.module.ts' />
/// <reference path='messageLog.service.ts' />


module rl.ui.components.messageLog {
	import test = utilities.services.test;

	interface ITestDataService {
		saveMessage: Sinon.SinonSpy;
		getMessages: Sinon.SinonSpy;
	}

	describe('messageLog', () => {
		var messageLog: IMessageLog;
		var dataService: ITestDataService;
		var allMessages: string[];

		beforeEach(() => {
			angular.mock.module(moduleName);

			allMessages = defaultMessages();

			dataService = test.mock.service();
			test.mock.promiseWithCallback(dataService, 'saveMessage', (message: any): void => { allMessages.unshift(message); });
			test.mock.promiseWithCallback(dataService, 'getMessages', (startFrom: number, quantity: number): __messageLog.IGetMessagesResult => {
				var hasMoreMessages: boolean = startFrom + quantity < allMessages.length;
				return {
					hasMoreMessages: hasMoreMessages,
					messages: <any>_(allMessages).drop(startFrom).take(quantity).value(),
				};
			});

			var services: any = test.angularFixture.inject(factoryName);
			var messageLogFactory: IMessageLogFactory = services[factoryName];
			messageLog = messageLogFactory.getInstance();
			messageLog.pageSize = 5;
		});

		function defaultMessages(): string[] {
			return ['1', '2', '3', '4', '5'
				, '6', '7', '8', '9', '10'
				, '11', '12', '13', '14', '15'
				, '16', '17', '18', '19', '20'];
		}

		it('should load an initial page of messages from the server', (): void => {
			messageLog.dataService = dataService;

			sinon.assert.calledOnce(dataService.getMessages);
			test.mock.flush(dataService);

			expect(messageLog.visibleMessages).to.have.length(5);
		});

		describe('after initial request', (): void => {
			beforeEach((): void => {
				messageLog.dataService = dataService;
				test.mock.flush(dataService);
				dataService.getMessages.reset();
			});

			it('should load the next page from the server if more messages are available', (): void => {
				messageLog.getNextPage();
				sinon.assert.calledOnce(dataService.getMessages);
				test.mock.flush(dataService);

				expect(messageLog.visibleMessages[0]).to.equal('6');
				expect(messageLog.visibleMessages[1]).to.equal('7');
				expect(messageLog.visibleMessages[2]).to.equal('8');
				expect(messageLog.visibleMessages[3]).to.equal('9');
				expect(messageLog.visibleMessages[4]).to.equal('10');
			});

			it('should not load a full page if not enough messages are available', (): void => {
				messageLog.pageSize = 15;
				test.mock.flush(dataService);
				expect(messageLog.visibleMessages).to.have.length(15);

				messageLog.getNextPage();

				test.mock.flush(dataService);

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
				test.mock.flush(dataService);

				expect(messageLog.visibleMessages).to.have.length(10);
			});

			it('should load a full page when paging back to the beginning even if less than a full page of messages were paged back'
				, (): void => {
					messageLog.getNextPage();
					test.mock.flush(dataService);

					expect(messageLog.visibleMessages[0]).to.equal('6');
					expect(messageLog.visibleMessages[1]).to.equal('7');
					expect(messageLog.visibleMessages[2]).to.equal('8');
					expect(messageLog.visibleMessages[3]).to.equal('9');
					expect(messageLog.visibleMessages[4]).to.equal('10');

					messageLog.pageSize = 10;
					messageLog.getPreviousPage();
					test.mock.flush(dataService);

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
				test.mock.flush(dataService);
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
				test.mock.flush(dataService);

				expect(messageLog.visibleMessages).to.have.length(5);
				expect(messageLog.visibleMessages[0]).to.equal('11');
				expect(messageLog.visibleMessages[1]).to.equal('12');
				expect(messageLog.visibleMessages[2]).to.equal('13');
				expect(messageLog.visibleMessages[3]).to.equal('14');
				expect(messageLog.visibleMessages[4]).to.equal('15');

				messageLog.getTopPage();
				sinon.assert.calledThrice(dataService.getMessages);
				test.mock.flush(dataService);

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
				test.mock.flush(dataService);
				test.mock.flush(dataService);
				expect(messageLog.visibleMessages[0]).to.equal('new message');
			});

			it('should take the user back to the first page if the user adds a new message', (): void => {
				messageLog.getNextPage();
				test.mock.flush(dataService);
				dataService.getMessages.reset();

				messageLog.addMessage(<any>'new message');
				sinon.assert.calledOnce(dataService.saveMessage);
				test.mock.flush(dataService);
				test.mock.flush(dataService);

				expect(messageLog.visibleMessages).to.have.length(5);
				expect(messageLog.visibleMessages[0]).to.equal('new message');
				expect(messageLog.visibleMessages[1]).to.equal('1');
				expect(messageLog.visibleMessages[2]).to.equal('2');
				expect(messageLog.visibleMessages[3]).to.equal('3');
				expect(messageLog.visibleMessages[4]).to.equal('4');
			});
		});
	});
}
