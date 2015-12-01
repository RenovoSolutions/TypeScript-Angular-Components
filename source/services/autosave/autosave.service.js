'use strict';
var angular = require('angular');
var _ = require('lodash');
var autosaveAction_service_1 = require('../autosaveAction/autosaveAction.service');
var triggers = require('./triggers/triggers.service');
exports.triggers = triggers;
exports.moduleName = 'rl.utilities.services.autosave';
exports.factoryName = 'autosaveFactory';
var AutosaveService = (function () {
    function AutosaveService($rootScope, $timeout, autosaveService, options, triggerService) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.autosaveService = autosaveService;
        this.triggerService = triggerService;
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
        this.configureTriggers(options);
        triggerService.setTriggers(options.triggers, this.autosave);
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
})();
autosaveServiceFactory.$inject = ['$rootScope', '$timeout', autosaveAction_service_1.serviceName, triggers.serviceName];
function autosaveServiceFactory($rootScope, $timeout, autosaveService, triggerService) {
    'use strict';
    return {
        getInstance: function (options) {
            return new AutosaveService($rootScope, $timeout, autosaveService, options, triggerService);
        }
    };
}
angular.module(exports.moduleName, [autosaveAction_service_1.moduleName, triggers.moduleName])
    .factory(exports.factoryName, autosaveServiceFactory);
//# sourceMappingURL=autosave.service.js.map