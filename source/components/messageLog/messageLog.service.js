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
})();
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
//# sourceMappingURL=messageLog.service.js.map