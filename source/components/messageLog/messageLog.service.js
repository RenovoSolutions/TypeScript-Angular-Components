'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZUxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVzc2FnZUxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQU9GLG1CQUFXLEdBQVcsWUFBWSxDQUFDO0FBRW5DLHVCQUFlLEdBQVcsRUFBRSxDQUFDO0FBbUR4QztJQUFBO1FBQ1MsMkJBQXNCLEdBQVcsQ0FBQyxDQUFDO1FBQ25DLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyx5QkFBb0IsR0FBWSxLQUFLLENBQUM7UUFDdEMsY0FBUyxHQUFXLHVCQUFlLENBQUM7SUF1RzdDLENBQUM7SUFsR0Esc0JBQUksZ0NBQVE7YUFBWjtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3ZCLENBQUM7UUFFRCxvQkFBb0I7YUFDcEIsVUFBYSxLQUFhO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFCLENBQUM7OztPQU5BO0lBU0Qsc0JBQUksMENBQWtCO1FBRnRCLG1CQUFtQjthQUVuQjtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwyQ0FBbUI7YUFBdkI7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ2xDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksbUNBQVc7YUFBZjtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzFCLENBQUM7UUFFRCxvQkFBb0I7YUFDcEIsVUFBZ0IsS0FBNkI7WUFDNUMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFFMUIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO2dC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