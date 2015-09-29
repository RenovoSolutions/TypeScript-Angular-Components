'use strict';
var _ = require('lodash');
var baseDialog_controller_1 = require('./baseDialog.controller');
exports.serviceName = 'baseDialog';
var BaseDialogService = (function () {
    function BaseDialogService($modal, $rootScope) {
        var _this = this;
        this.$modal = $modal;
        this.$rootScope = $rootScope;
        this.modalClosing = function (event, reason, explicitlyClosed) {
            var canClose = true;
            if (_.isFunction(_this.closeHandler)) {
                canClose = _this.closeHandler(explicitlyClosed);
            }
            if (!canClose) {
                event.preventDefault();
            }
        };
    }
    BaseDialogService.prototype.open = function (options, closeHandler) {
        this.closeHandler = closeHandler;
        options = this.configureModalSettings(options);
        this.$modal.open(options);
    };
    BaseDialogService.prototype.configureModalSettings = function (options) {
        if (options == null) {
            options = {};
        }
        var modalScope = options.scope;
        if (modalScope == null) {
            modalScope = this.$rootScope.$new();
        }
        modalScope.modalController = options.controller;
        options.controller = baseDialog_controller_1.controllerName;
        options.scope = modalScope;
        return options;
    };
    BaseDialogService.$inject = ['$modal', '$rootScope'];
    return BaseDialogService;
})();
exports.BaseDialogService = BaseDialogService;
//# sourceMappingURL=baseDialog.service.js.map