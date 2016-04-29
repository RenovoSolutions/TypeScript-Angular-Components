import * as angular from 'angular';
import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __array = services.array;
import __date = services.date;

import { IMessage, IMessageLogDataService, IUser } from '../../source/components/messageLog/messageLog.module';

export const moduleName: string = 'MessageLogTestModule';

class MessageLogTestController {
	messages: IMessage[];
	messageService: IMessageLogDataService;

	static $inject: string[] = ['$q'];
	constructor(private $q: angular.IQService) { }

	$onInit(): void {
		this.messages = _.times<IMessage>(20, this.generateMessage.bind(this));
		this.messageService = {
			updateMessage: (message): angular.IPromise<void> => {
				console.log('update ' + message.message);
				return this.$q.when();
			},
			saveMessage: (message): angular.IPromise<void> => {
				message.createdBy = this.generateAuthor();
				message.createdDate = __date.dateUtility.getNow();
				console.log('save ' + message.message);
				this.messages.unshift(message);
				return this.$q.when();
			},
			getMessages: (startFrom, quantity): angular.IPromise<any> => {
				var messageList = _.chain(this.messages).drop(startFrom).take(quantity).value();
				var result = {
					hasMoreMessages: startFrom + quantity < this.messages.length,
					messages: messageList,
				};
				return this.$q.when(result);
			},
			deleteMessage: (message): angular.IPromise<void> => {
				console.log('delete ' + message.message);
				__array.arrayUtility.remove(this.messages, message);
				return this.$q.when();
			},
		};
	}

	private generateMessage(index: number): IMessage {
		const millisecondsAgo = index * 5000;
		const milliseconds = moment().milliseconds() - millisecondsAgo;
		const timestamp = moment(milliseconds).tz('US/Eastern');
		const message = {
			message: 'Message ' + index,
			createdBy: this.generateAuthor(),
			createdDate: timestamp,
			lastUpdatedBy: this.generateAuthor(),
			lastUpdatedDate: timestamp,
			edited: true,
		};

		return message;
	}

	private generateAuthor() {
		const authors: IUser[] = [
			{ id: 1, name: 'Josh Graber' },
			{ id: 2, name: 'Dude McKelly' },
			{ id: 3, name: 'Micky Matson' },
			{ id: 4, name: 'John Doe' },
			{ id: 5, name: 'Abraham Lincoln' },
			{ id: 6, name: 'Harrison Ford' },
			{ id: 7, name: 'Han Solo' },
		];

		const randomAuthor: number = Math.floor(Math.random() * authors.length);
		return authors[randomAuthor];
	}
}

angular.module(moduleName, [])
	.controller('MessageLogTestController', MessageLogTestController);