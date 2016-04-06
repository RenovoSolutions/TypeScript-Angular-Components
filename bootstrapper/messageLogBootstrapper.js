(function() {
	var __array = rl_utilities.services.array;

	angular.module('app')
		.controller('MessageLogTestController', MessageLogTestController);

	MessageLogTestController.$inject = ['$q'];
	function MessageLogTestController($q) {
		var self = this;
		self.messages = _.times(20, generateMessage);
		var localMessages = self.messages;
		self.messageService = {
			updateMessage: function(message) {
				console.log('update ' + message.message);
				return $q.when();
			},
			saveMessage: function(message) {
				console.log('save ' + message.message);
				localMessages.unshift(message);
				return $q.when();
			},
			getMessages: function(startFrom, quantity) {
				var messageList = _.chain(localMessages).drop(startFrom).take(quantity).value();
				var result = {
					hasMoreMessages: startFrom + quantity < localMessages.length,
					messages: messageList,
				};
				return $q.when(result);
			},
			deleteMessage: function(message) {
				console.log('delete ' + message.message);
				__array.arrayUtility.remove(localMessages, message);
				return $q.when();
			},
		};

		function generateMessage(index) {
			var millisecondsAgo = index * 5000;
			var milliseconds = new Date().getTime() - millisecondsAgo;
			var timestamp = new Date(milliseconds);
			var message = {
				message: 'Message ' + index,
				createdBy: generateAuthor(),
				createdDate: timestamp,
				lastUpdatedBy: generateAuthor(),
				lastUpdatedDate: timestamp,
				edited: true,
			};

			return message;
		}

		function generateAuthor() {
			var authors = [
				{ id: 1, name: 'Josh Graber' },
				{ id: 2, name: 'Dude McKelly' },
				{ id: 3, name: 'Micky Matson' },
				{ id: 4, name: 'John Doe' },
				{ id: 5, name: 'Abraham Lincoln' },
				{ id: 6, name: 'Harrison Ford' },
				{ id: 7, name: 'Han Solo' },
			];

			var randomAuthor = Math.floor(Math.random() * authors.length);
			return authors[randomAuthor];
		}
	}
}());