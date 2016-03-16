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
DeletePermissions,
EditPermissions,
IUser
} from './messageLog.module';

import * as angular from 'angular';
import 'angular-mocks';

import { IAutosaveDialogSettings } from '../../services/autosaveDialog/autosaveDialog.servivce';

interface IMockMessageLogService {
	visibleMessages: number[];
	hasForwardMessages: boolean;
	hasBackwardMessages: boolean;
	busy: boolean;
	pageSize: number;
	getNextPage: Sinon.SinonSpy;
	getTopPage: Sinon.SinonSpy;
	updateMessage: Sinon.SinonSpy;
	addMessage: Sinon.SinonSpy;
}


interface IAutosaveDialogMock {
	open: Sinon.SinonSpy;
}

describe('messageLog', () => {
	let scope: angular.IScope;
	let log: MessageLogController;
	let messageLogService: IMockMessageLogService;
	let autosaveDialog: IAutosaveDialogMock;

	beforeEach(() => {
		angular.mock.module(moduleName);
		angular.mock.module(__isEmpty.moduleName);

		autosaveDialog = {
			open: sinon.spy(),
		};

		messageLogService = {
			visibleMessages: [1, 2, 3, 4, 5],
			hasForwardMessages: true,
			hasBackwardMessages: false,
			busy: false,
			pageSize: 0,
			getNextPage: sinon.spy(),
			getTopPage: sinon.spy(),
			updateMessage:sinon.spy(),
			addMessage:sinon.spy(),
		};

		let messageLogFactory: any = {
			getInstance(): any {
				return messageLogService;
			},
		};

		test.angularFixture.mock({
			messageLog: messageLogFactory,
			autosaveDialog: autosaveDialog,
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

		it('should return true for edit permissions', (): void => {
			buildController();
			let message: any = {
				message: '',
				createdBy: {
					id: 1,
					name: 'Test User'
				}
			};
			let message2: any = {
				message: '',
				createdBy: {
					id: 2,
					name: 'Test User'
				}
			};

			let messageSysNote: any = {
				message: '',
				createdBy: {
					id: 2,
					name: 'Test User'
				},
				isSystemNote: true,
			};

			log.canEdit = EditPermissions.editAll;
			log.currentUser = {
				id: 1,
				name: 'Test User'
			};
			expect(log.canEditEntry(message)).to.be.true;
			expect(log.canEditEntry(message2)).to.be.true;
			expect(log.canEditEntry(messageSysNote)).to.be.false;

			log.canEdit = EditPermissions.editMine;
			expect(log.canEditEntry(message)).to.be.true;
			expect(log.canEditEntry(message2)).to.be.false;
			expect(log.canEditEntry(messageSysNote)).to.be.false;

			log.canEdit = EditPermissions.editNone;
			expect(log.canEditEntry(message)).to.be.false;
			expect(log.canEditEntry(message2)).to.be.false;
			expect(log.canEditEntry(messageSysNote)).to.be.false;
		});

		it('should return true for Delete permissions', (): void => {
			buildController();
			let message: any = {
				message: '',
				createdBy: {
					id: 1,
					name: 'Test User'
				}
			};
			let message2: any = {
				message: '',
				createdBy: {
					id: 2,
					name: 'Test User'
				}
			};

			let message2: any = {
				message: '',
				createdBy: {
					id: 2,
					name: 'Test User'
				}
			};

			let messageSysNote: any = {
				message: '',
				createdBy: {
					id: 2,
					name: 'Test User'
				},
				isSystemNote: true,
			};

			log.canDelete = DeletePermissions.deleteAll;
			log.currentUser = {
				id: 1,
				name: 'Test User'
			};
			expect(log.canDeleteEntry(message)).to.be.true;
			expect(log.canDeleteEntry(message2)).to.be.true;
			expect(log.canDeleteEntry(messageSysNote)).to.be.false;

			log.canDelete = DeletePermissions.deleteMine;
			expect(log.canDeleteEntry(message)).to.be.true;
			expect(log.canDeleteEntry(message2)).to.be.false;
			expect(log.canDeleteEntry(messageSysNote)).to.be.false;

			log.canDelete = DeletePermissions.deleteNone;
			expect(log.canDeleteEntry(message)).to.be.false;
			expect(log.canDeleteEntry(message2)).to.be.false;
			expect(log.canDeleteEntry(messageSysNote)).to.be.false;
		});

		it('should open a dialog for editing', (): void => {
			buildController();

			let message: any = {
				message: '',
				createdBy: {
					id: 1,
					name: 'Test User'
				}
			};

			log.editMessage(message);

			sinon.assert.calledOnce(autosaveDialog.open);
			let dialogSettings: IAutosaveDialogSettings = autosaveDialog.open.firstCall.args[0];
			expect(dialogSettings.save).to.not.be.null;
			expect(dialogSettings.form).to.equal('noteForm');
			expect(dialogSettings.data.entry).to.deep.equal(message);
			expect(dialogSettings.data.originalEntry).to.equal(message);
			expect(dialogSettings.template).to.not.be.null;
		});

		it('should fire updateNote function',():void=>{
			let data: any = {
				entry: 'test entry',
			};

			buildController();

			log.updateNote(data);

			sinon.assert.calledOnce(messageLogService.updateMessage);
			expect(messageLogService.updateMessage.firstCall.args[0]).to.equal(data.entry);
		});

		it('should fire saveNote function', (): void => {
			let data: any = {
				entry: 'test entry',
			};

			buildController();

			log.saveNote(data);

			sinon.assert.calledOnce(messageLogService.addMessage);
			expect(messageLogService.addMessage.firstCall.args[0]).to.equal(data.entry);
		});

		function buildController(pageSize?: number): void {
			let bindings: any = {
				pageSize: pageSize,
				hasNextPage: true,
				hasPreviousPage: false,
			};

			let controllerResult: test.IControllerResult<MessageLogController>
				= test.angularFixture.controllerWithBindings<MessageLogController>(controllerName, bindings);

			scope = controllerResult.scope;
			log = controllerResult.controller;
		}
	});

	describe('rlMessageLog directive', (): void => {
		it('should add a message template and selector', (): void => {
			let directiveResult: test.IDirectiveResult<MessageLogController> =
				test.angularFixture.directive<MessageLogController>('rlMessageLog', `
				<rl-message-log service="logService" selector="selectorFunction">
					<template when-selector="true">
						<p>Message is greater than 3</p>
					</template>
				</rl-message-log>
				`, <any>{
						logService: messageLogService,
						selectorFunction: function(entry) {
							return entry > 3;
						},
					});

			expect(directiveResult.controller.getEntrySelector(<any>4)).to.be.true;
			expect(directiveResult.controller.getEntrySelector(<any>3)).to.be.false;

			expect(directiveResult.controller.templates['true']).to.contain('<p>Message is greater than 3</p>');
		});

		it('should have neither a selector or templates', (): void => {
			let directiveResult: test.IDirectiveResult<MessageLogController> =
				test.angularFixture.directive<MessageLogController>('rlMessageLog',
					'<rl-message-log service="logService"></rl-message-log>',
					<any>{ logService: messageLogService });

			expect(directiveResult.controller.getEntrySelector(<any>1)).to.be.undefined;
		});
	});
});

