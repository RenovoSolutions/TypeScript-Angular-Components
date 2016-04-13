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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRyaWdnZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7O0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsZ0NBQWtELG1CQUFtQixDQUFDLENBQUE7QUFDdEUsd0JBQWtDLFdBQVcsQ0FBQyxDQUFBO0FBRTlDLGlCQUFjLG1CQUFtQixDQUFDLEVBQUE7QUFDbEMsaUJBQWMsV0FBVyxDQUFDLEVBQUE7QUFFZix1QkFBZSxHQUFXLFVBQVUsQ0FBQztBQUVyQyxrQkFBVSxHQUFXLGtDQUFrQyxDQUFDO0FBQ3hELG1CQUFXLEdBQVcsa0JBQWtCLENBQUM7QUFvQnBEO0lBR0Msd0JBQVksVUFBcUMsRUFBRSxRQUFpQztRQUNuRixJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ2YsUUFBUSxFQUFFLElBQUksaUNBQWUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDO1lBQ25ELElBQUksRUFBRSxJQUFJLGlCQUFPLENBQU8sTUFBTSxDQUFDO1NBQy9CLENBQUM7SUFDSCxDQUFDO0lBRUQsb0NBQVcsR0FBWCxVQUFZLGFBQXFCLEVBQUUsUUFBb0I7UUFDdEQsRUFBRSxDQUFDLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0IsYUFBYSxHQUFHLHVCQUFlLENBQUM7UUFDakMsQ0FBQztRQUVELENBQUMsQ0FBQyxJQUFJLENBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFDLE9BQXNCO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlCLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRixxQkFBQztBQUFELENBQUMsQUFyQkQsSUFxQkM7QUFNRCxxQkFBcUIsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDM0QsK0JBQStCLFVBQXFDLEVBQUUsUUFBaUM7SUFDdEcsTUFBTSxDQUFDO1FBQ04sV0FBVztZQUNWLE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakQsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixPQUFPLENBQUMsbUJBQVcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDIn0=