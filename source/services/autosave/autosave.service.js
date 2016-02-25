'use strict';
var angular = require('angular');
var _ = require('lodash');
var autosaveAction_service_1 = require('../autosaveAction/autosaveAction.service');
var triggers = require('./triggers/triggers.service');
exports.triggers = triggers;
exports.moduleName = 'rl.utilities.services.autosave';
exports.factoryName = 'autosaveFactory';
var AutosaveService = (function () {
    function AutosaveService(autosaveService, options, triggerServiceFactory) {
        var _this = this;
        this.autosaveService = autosaveService;
        this.autosave = function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i - 0] = arguments[_i];
            }
            if (_this.contentForm.$pristine) {
                return true;
            }
            var valid = true;
            if (_this.hasValidator) {
                valid = _this.validate();
                if (valid === undefined) {
                    valid = true;
                }
            }
            if (valid) {
                var promise = _this.save.apply(_this, data);
                if (!_.isUndefined(promise)) {
                    _this.autosaveService.trigger(promise.then(function () {
                        if (_this.contentForm != null) {
                            _this.contentForm.$setPristine();
                        }
                    }));
                }
                return true;
            }
            else {
                return false;
            }
        };
        this.hasValidator = options.validate != null;
        this.contentForm = options.contentForm || this.nullForm();
        this.save = options.save;
        this.validate = options.validate;
        this.triggerService = triggerServiceFactory.getInstance();
        this.configureTriggers(options);
        this.triggerService.setTriggers(options.triggers, this.autosave);
    }
    AutosaveService.prototype.configureTriggers = function (options) {
        this.triggerService.triggers.onChange.configure({
            form: options.contentForm,
            setChangeListener: options.setChangeListener,
            debounceDuration: options.debounceDuration,
        });
    };
    AutosaveService.prototype.nullForm = function () {
        return {
            $pristine: false,
            $dirty: true,
            $setPristine: function () {
                return;
            },
        };
    };
    return AutosaveService;
}());
autosaveServiceFactory.$inject = [autosaveAction_service_1.serviceName, triggers.factoryName];
function autosaveServiceFactory(autosaveService, triggerServiceFactory) {
    'use strict';
    return {
        getInstance: function (options) {
            return new AutosaveService(autosaveService, options, triggerServiceFactory);
        }
    };
}
angular.module(exports.moduleName, [autosaveAction_service_1.moduleName, triggers.moduleName])
    .factory(exports.factoryName, autosaveServiceFactory);
//# sourceMappingURL=autosave.service.js.map