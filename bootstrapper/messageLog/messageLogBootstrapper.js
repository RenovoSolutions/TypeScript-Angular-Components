"use strict";
var angular = require('angular');
var moment = require('moment');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __array = typescript_angular_utilities_1.services.array;
var MessageLogTestController = (function () {
    function MessageLogTestController($q) {
        this.$q = $q;
    }
    MessageLogTestController.prototype.$onInit = function () {
        this.messages = _.times(20, this.generateMessage);
        this.messageService = {
            updateMessage: function (message) {
                console.log('update ' + message.message);
                return this.$q.when();
            },
            saveMessage: function (message) {
                console.log('save ' + message.message);
                this.messages.unshift(message);
                return this.$q.when();
            },
            getMessages: function (startFrom, quantity) {
                var messageList = _.chain(this.messages).drop(startFrom).take(quantity).value();
                var result = {
                    hasMoreMessages: startFrom + quantity < this.messages.length,
                    messages: messageList,
                };
                return this.$q.when(result);
            },
            deleteMessage: function (message) {
                console.log('delete ' + message.message);
                __array.arrayUtility.remove(this.messages, message);
                return this.$q.when();
            },
        };
    };
    MessageLogTestController.prototype.generateMessage = function (index) {
        var millisecondsAgo = index * 5000;
        var milliseconds = moment().milliseconds() - millisecondsAgo;
        var timestamp = moment(milliseconds).tz('US/Eastern');
        var message = {
            message: 'Message ' + index,
            createdBy: this.generateAuthor(),
            createdDate: timestamp,
            lastUpdatedBy: this.generateAuthor(),
            lastUpdatedDate: timestamp,
            edited: true,
        };
        return message;
    };
    MessageLogTestController.prototype.generateAuthor = function () {
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
    };
    MessageLogTestController.$inject = ['$q'];
    return MessageLogTestController;
}());
angular.module('app')
    .controller('MessageLogTestController', MessageLogTestController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZUxvZ0Jvb3RzdHJhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lc3NhZ2VMb2dCb290c3RyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksTUFBTSxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRWpDLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sT0FBTyxHQUFHLHVDQUFRLENBQUMsS0FBSyxDQUFDO0FBSWhDO0lBS0Msa0NBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO0lBQUksQ0FBQztJQUU5QywwQ0FBTyxHQUFQO1FBQ0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLGNBQWMsR0FBRztZQUNyQixhQUFhLEVBQUUsVUFBUyxPQUFPO2dCQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZCLENBQUM7WUFDRCxXQUFXLEVBQUUsVUFBUyxPQUFPO2dCQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QixDQUFDO1lBQ0QsV0FBVyxFQUFFLFVBQVMsU0FBUyxFQUFFLFFBQVE7Z0JBQ3hDLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEs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