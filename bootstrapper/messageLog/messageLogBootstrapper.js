"use strict";
var angular = require('angular');
var moment = require('moment');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __array = typescript_angular_utilities_1.services.array;
var __date = typescript_angular_utilities_1.services.date;
var MessageLogTestController = (function () {
    function MessageLogTestController($q) {
        this.$q = $q;
    }
    MessageLogTestController.prototype.$onInit = function () {
        var _this = this;
        this.messages = _.times(20, this.generateMessage.bind(this));
        this.messageService = {
            updateMessage: function (message) {
                console.log('update ' + message.message);
                return _this.$q.when();
            },
            saveMessage: function (message) {
                message.createdBy = _this.generateAuthor();
                message.createdDate = __date.dateUtility.getNow();
                console.log('save ' + message.message);
                _this.messages.unshift(message);
                return _this.$q.when();
            },
            getMessages: function (startFrom, quantity) {
                var messageList = _.chain(_this.messages).drop(startFrom).take(quantity).value();
                var result = {
                    hasMoreMessages: startFrom + quantity < _this.messages.length,
                    messages: messageList,
                };
                return _this.$q.when(result);
            },
            deleteMessage: function (message) {
                console.log('delete ' + message.message);
                __array.arrayUtility.remove(_this.messages, message);
                return _this.$q.when();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZUxvZ0Jvb3RzdHJhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lc3NhZ2VMb2dCb290c3RyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksTUFBTSxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRWpDLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sT0FBTyxHQUFHLHVDQUFRLENBQUMsS0FBSyxDQUFDO0FBQ2hDLElBQU8sTUFBTSxHQUFHLHVDQUFRLENBQUMsSUFBSSxDQUFDO0FBSTlCO0lBS0Msa0NBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO0lBQUksQ0FBQztJQUU5QywwQ0FBTyxHQUFQO1FBQUEsaUJBNEJDO1FBM0JBLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsY0FBYyxHQUFHO1lBQ3JCLGFBQWEsRUFBRSxVQUFDLE9BQU87Z0JBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDekMsTUFBTSxDQUFDLEtBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkIsQ0FBQztZQUNELFdBQVcsRUFBRSxVQUFDLE9BQU87Z0JBQ3BCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUMxQyxPQUFPLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdkMsS0FBSSxD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