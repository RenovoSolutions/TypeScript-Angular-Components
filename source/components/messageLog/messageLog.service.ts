'use strict';

import * as ng from 'angular';
import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';

export var factoryName: string = 'messageLog';

export var defaultPageSize: number = 10;

export interface IUser {
	id: number;
	name: string;
}

export interface IMessage {
	id?: number;
	message: string;
	createdBy?: IUser;
	createdDate?: moment.Moment;

	isSystemNote?: boolean;
	lastUpdatedDate?: moment.Moment;
	lastUpdatedBy?: IUser;

	edited?: boolean;
}

export interface IGetMessagesResult {
	messages: IMessage[];
	hasMoreMessages: boolean;
}

export interface IMessageLogDataService {
	saveMessage(message: IMessage): ng.IPromise<void>;
	getMessages(startFrom: number, quantity: number): ng.IPromise<IGetMessagesResult>;
	deleteMessage(message: IMessage): ng.IPromise<void>;
	updateMessage(message: IMessage): ng.IPromise<void>;
}

export interface IMessageLog {
	addMessage(message: IMessage): ng.IPromise<void>;
	deleteMessage(message: IMessage): ng.IPromise<void>;
	updateMessage(message: IMessage): ng.IPromise<void>;
	visibleMessages: IMessage[];

	getNextPage(): ng.IPromise<void>;
	getPreviousPage(): ng.IPromise<void>;
	getTopPage(): ng.IPromise<void>;
	refresh(): ng.IPromise<void>;

	hasForwardMessages: boolean;
	hasBackwardMessages: boolean;

	pageSize: number;
	dataService: IMessageLogDataService;
	busy: boolean;
}

export class MessageLog {
	private currentStartingMessage: number = 0;
	private _hasForwardMessages: boolean = false;
	private _hasBackwardMessages: boolean = false;
	private _pageSize: number = defaultPageSize;
	private _dataService: IMessageLogDataService;
	busy: boolean;
	visibleMessages: IMessage[];

	get pageSize(): number {
		return this._pageSize;
	}

	/* tslint:disable */
	set pageSize(value: number) {
		this._pageSize = value;
		this.updateCurrentPage();
	}
	/* tslint:enable */

	get hasForwardMessages(): boolean {
		return this._hasForwardMessages;
	}

	get hasBackwardMessages(): boolean {
		return this._hasBackwardMessages;
	}

	get dataService(): IMessageLogDataService {
		return this._dataService;
	}

	/* tslint:disable */
	set dataService(value: IMessageLogDataService) {
		this._dataService = value;

		if (value != null) {
			this.visibleMessages = null;
			this.updateCurrentPage();
		}
	}
	/* tslint:enable */

	addMessage(message: IMessage): ng.IPromise<void> {
		return this.dataService.saveMessage(message).then((): void => {
			this.getTopPage();
		});
	}

	updateMessage(message: IMessage): ng.IPromise<void> {
		return this.dataService.updateMessage(message).then((): void => {
			this.getTopPage();
		});
	}

	deleteMessage(message: IMessage): ng.IPromise<void> {
		return this.dataService.deleteMessage(message).then((): void => {
			this.refresh();
		});
	}

	getNextPage(): ng.IPromise<void> {
		if (!this.hasForwardMessages) {
			return;
		}

		this.currentStartingMessage += this.pageSize;
		return this.updateCurrentPage();
	}

	getPreviousPage(): ng.IPromise<void> {
		if (!this.hasBackwardMessages) {
			return;
		}

		this.currentStartingMessage -= this.pageSize;

		if (this.currentStartingMessage < 0) {
			this.currentStartingMessage = 0;
		}

		return this.updateCurrentPage();
	}

	getTopPage(): ng.IPromise<void> {
		this.currentStartingMessage = 0;
		return this.updateCurrentPage();
	}

	refresh(): ng.IPromise<void> {
		return this.updateCurrentPage();
	}

	private updateCurrentPage(): ng.IPromise<void> {
		if (this.dataService == null) {
			return null;
		}

		this.busy = true;

		return this.dataService.getMessages(this.currentStartingMessage, this.pageSize).then((result: IGetMessagesResult): void => {
			this.visibleMessages = result.messages;
			this._hasForwardMessages = result.hasMoreMessages;
			this._hasBackwardMessages = (this.currentStartingMessage > 0);
			this.busy = false;
		});
	}
}

export interface IMessageLogFactory {
	getInstance(): IMessageLog;
}

export function messageLogFactory(): IMessageLogFactory {
	'use strict';
	return {
		getInstance(): IMessageLog {
			return new MessageLog();
		},
	};
}
