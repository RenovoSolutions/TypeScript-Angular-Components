"use strict";
var angular = require('angular');
var _ = require('lodash');
var moment = require('moment');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __array = typescript_angular_utilities_1.services.array;
var __date = typescript_angular_utilities_1.services.date;
exports.moduleName = 'MessageLogTestModule';
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
MessageLogRoute.$inject = ['$stateProvider'];
function MessageLogRoute($stateProvider) {
    $stateProvider
        .state('messageLog', {
        url: '/messageLog',
        template: require('./messageLogTest.html'),
        controller: 'MessageLogTestController',
        controllerAs: 'messageLog',
    });
}
angular.module(exports.moduleName, [])
    .controller('MessageLogTestController', MessageLogTestController)
    .config(MessageLogRoute);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZUxvZ0Jvb3RzdHJhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lc3NhZ2VMb2dCb290c3RyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBQzVCLElBQVksTUFBTSxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRWpDLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sT0FBTyxHQUFHLHVDQUFRLENBQUMsS0FBSyxDQUFDO0FBQ2hDLElBQU8sTUFBTSxHQUFHLHVDQUFRLENBQUMsSUFBSSxDQUFDO0FBSWpCLGtCQUFVLEdBQVcsc0JBQXNCLENBQUM7QUFFekQ7SUFLQyxrQ0FBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7SUFBSSxDQUFDO0lBRTlDLDBDQUFPLEdBQVA7UUFBQSxpQkE0QkM7UUEzQkEsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxjQUFjLEdBQUc7WUFDckIsYUFBYSxFQUFFLFVBQUMsT0FBTztnQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QixDQUFDO1lBQ0QsV0FBVyxFQUFFLFVBQUMsT0FBTztnQkFDcEIsT0FBTyxDQUFDLFNBQVMsR0FBRyxLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQzFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbEQsT0FB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