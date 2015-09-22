/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/angularMocks.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='editableMessageLog.ts' />

module rl.ui.components.messageLog.editableMessageLog {
	import test = utilities.services.test;

	interface IMockMessageLogService {
		addMessage: Sinon.SinonSpy;
		busy: boolean;
	}

	describe('EditableMessageLogController', () => {
		var scope: ng.IScope;
		var log: EditableMessageLogController;
		var messageLogService: IMockMessageLogService;

		beforeEach(() => {
			angular.mock.module(moduleName);

			messageLogService = {
				addMessage: sinon.spy(),
				busy: false,
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

		it('should update busy when busy changes on the service and clear savingMessage if it gets cleared', (): void => {
			buildController();

			messageLogService.busy = true;
			scope.$digest();

			expect(log.busy).to.be.true;

			log.savingMessage = true;

			messageLogService.busy = false;
			scope.$digest();

			expect(log.busy).to.be.false;
			expect(log.savingMessage).to.be.false;
		});

		it('should call addMessage on the service', (): void => {
			buildController();

			log.newMessage = 'a message';

			log.add();

			expect(log.savingMessage).to.be.true;
			expect(log.newMessage).to.be.empty;
			sinon.assert.calledOnce(messageLogService.addMessage);
			sinon.assert.calledWith(messageLogService.addMessage, 'a message');
		});

		it('should do nothing if the message is empty or whitespace', (): void => {
			buildController();

			log.newMessage = '  ';
			log.add();

			expect(log.savingMessage).to.not.be.true;
			sinon.assert.notCalled(messageLogService.addMessage);
		});

		function buildController(): void {
			var controllerResult: test.IControllerResult<EditableMessageLogController>
				= test.angularFixture.controllerWithBindings<EditableMessageLogController>(controllerName);

			scope = controllerResult.scope;
			log = controllerResult.controller;
		}
	});
}
