'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var _ = require('lodash');
var onChangeTrigger_1 = require('./onChangeTrigger');
var trigger_1 = require('./trigger');
__export(require('./onChangeTrigger'));
__export(require('./trigger'));
exports.defaultTriggers = 'onChange';
exports.moduleName = 'rl.ui.services.autosave.triggers';
exports.factoryName = 'autosaveTriggers';
var TriggerService = (function () {
    function TriggerService($rootScope, $timeout) {
        this.triggers = {
            onChange: new onChangeTrigger_1.OnChangeTrigger($rootScope, $timeout),
            none: new trigger_1.Trigger('none'),
        };
    }
    TriggerService.prototype.setTriggers = function (triggerString, autosave) {
        if (triggerString == null) {
            triggerString = exports.defaultTriggers;
        }
        _.each(this.triggers, function (trigger) {
            if (trigger.hasMatch(triggerString)) {
                trigger.setTrigger(autosave);
            }
        });
    };
    return TriggerService;
}());
triggerServiceFactory.$inject = ['$rootScope', '$timeout'];
function triggerServiceFactory($rootScope, $timeout) {
    return {
        getInstance: function () {
            return new TriggerService($rootScope, $timeout);
        },
    };
}
angular.module(exports.moduleName, [])
    .factory(exports.factoryName, triggerServiceFactory);
//# sourceMappingURL=triggers.service.js.map