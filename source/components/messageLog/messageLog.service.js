"use strict";
exports.factoryName = 'messageLog';
exports.defaultPageSize = 10;
var MessageLog = (function () {
    function MessageLog() {
        this.currentStartingMessage = 0;
        this._hasForwardMessages = false;
        this._hasBackwardMessages = false;
        this._pageSize = exports.defaultPageSize;
    }
    Object.defineProperty(MessageLog.prototype, "pageSize", {
        get: function () {
            return this._pageSize;
        },
        /* tslint:disable */
        set: function (value) {
            this._pageSize = value;
            this.updateCurrentPage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageLog.prototype, "hasForwardMessages", {
        /* tslint:enable */
        get: function () {
            return this._hasForwardMessages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageLog.prototype, "hasBackwardMessages", {
        get: function () {
            return this._hasBackwardMessages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessageLog.prototype, "dataService", {
        get: function () {
            return this._dataService;
        },
        /* tslint:disable */
        set: function (value) {
            this._dataService = value;
            if (value != null) {
                this.visibleMessages = null;
                this.updateCurrentPage();
            }
        },
        enumerable: true,
        configurable: true
    });
    /* tslint:enable */
    MessageLog.prototype.addMessage = function (message) {
        var _this = this;
        return this.dataService.saveMessage(message).then(function () {
            _this.getTopPage();
        });
    };
    MessageLog.prototype.updateMessage = function (message) {
        var _this = this;
        return this.dataService.updateMessage(message).then(function () {
            _this.getTopPage();
        });
    };
    MessageLog.prototype.deleteMessage = function (message) {
        var _this = this;
        return this.dataService.deleteMessage(message).then(function () {
            _this.refresh();
        });
    };
    MessageLog.prototype.getNextPage = function () {
        if (!this.hasForwardMessages) {
            return;
        }
        this.currentStartingMessage += this.pageSize;
        return this.updateCurrentPage();
    };
    MessageLog.prototype.getPreviousPage = function () {
        if (!this.hasBackwardMessages) {
            return;
        }
        this.currentStartingMessage -= this.pageSize;
        if (this.currentStartingMessage < 0) {
            this.currentStartingMessage = 0;
        }
        return this.updateCurrentPage();
    };
    MessageLog.prototype.getTopPage = function () {
        this.currentStartingMessage = 0;
        return this.updateCurrentPage();
    };
    MessageLog.prototype.refresh = function () {
        return this.updateCurrentPage();
    };
    MessageLog.prototype.updateCurrentPage = function () {
        var _this = this;
        if (this.dataService == null) {
            return null;
        }
        this.busy = true;
        return this.dataService.getMessages(this.currentStartingMessage, this.pageSize).then(function (result) {
            _this.visibleMessages = result.messages;
            _this._hasForwardMessages = result.hasMoreMessages;
            _this._hasBackwardMessages = (_this.currentStartingMessage > 0);
            _this.busy = false;
        });
    };
    return MessageLog;
}());
exports.MessageLog = MessageLog;
function messageLogFactory() {
    'use strict';
    return {
        getInstance: function () {
            return new MessageLog();
        },
    };
}
exports.messageLogFactory = messageLogFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZUxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVzc2FnZUxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHVyxtQkFBVyxHQUFXLFlBQVksQ0FBQztBQUVuQyx1QkFBZSxHQUFXLEVBQUUsQ0FBQztBQW1EeEM7SUFBQTtRQUNTLDJCQUFzQixHQUFXLENBQUMsQ0FBQztRQUNuQyx3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDckMseUJBQW9CLEdBQVksS0FBSyxDQUFDO1FBQ3RDLGNBQVMsR0FBVyx1QkFBZSxDQUFDO0lBdUc3QyxDQUFDO0lBbEdBLHNCQUFJLGdDQUFRO2FBQVo7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN2QixDQUFDO1FBRUQsb0JBQW9CO2FBQ3BCLFVBQWEsS0FBYTtZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixDQUFDOzs7T0FOQTtJQVNELHNCQUFJLDBDQUFrQjtRQUZ0QixtQkFBbUI7YUFFbkI7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ2pDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMkNBQW1CO2FBQXZCO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG1DQUFXO2FBQWY7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMxQixDQUFDO1FBRUQsb0JBQW9CO2FBQ3BCLFVBQWdCLEtBQTZCO1lBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBRTFCLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztnQkFDNUIsSUFBSSxDQUFD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