import * as angular from 'angular';
import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __array = services.array;

import { IMessage, IMessageLogDataService, IUser } from '../../source/components/messageLog/messageLog.module';

class MessageLogTestController {
	messages: IMessage[];
	messageService: IMessageLogDataService;

	static $inject: string[] = ['$q'];
	constructor(private $q: angular.IQService) { }

	$onInit(): void {
		this.messages = _.times(20, this.generateMessage);
		this.messageService = {
			updateMessage: function(message) {
				console.log('update ' + message.message);
				return this.$q.when();
			},
			saveMessage: function(message) {
				console.log('save ' + message.message);
				this.messages.unshift(message);
				return this.$q.when();
			},
			getMessages: function(startFrom, quantity) {
				var messageList = _.chain(this.messages).drop(startFrom).take(quantity).value();
				var result = {
					hasMoreMessages: startFrom + quantity < this.messages.length,
					messages: messageList,
				};
				return this.$q.when(result);
			},
			deleteMessage: function(message) {
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

angular.module('app')
	.controller('MessageLogTestController', MessageLogTestController);