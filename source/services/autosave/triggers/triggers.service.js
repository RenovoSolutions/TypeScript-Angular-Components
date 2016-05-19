"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRyaWdnZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLGdDQUFrRCxtQkFBbUIsQ0FBQyxDQUFBO0FBQ3RFLHdCQUFrQyxXQUFXLENBQUMsQ0FBQTtBQUU5QyxpQkFBYyxtQkFBbUIsQ0FBQyxFQUFBO0FBQ2xDLGlCQUFjLFdBQVcsQ0FBQyxFQUFBO0FBRWYsdUJBQWUsR0FBVyxVQUFVLENBQUM7QUFFckMsa0JBQVUsR0FBVyxrQ0FBa0MsQ0FBQztBQUN4RCxtQkFBVyxHQUFXLGtCQUFrQixDQUFDO0FBb0JwRDtJQUdDLHdCQUFZLFVBQXFDLEVBQUUsUUFBaUM7UUFDbkYsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNmLFFBQVEsRUFBRSxJQUFJLGlDQUFlLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQztZQUNuRCxJQUFJLEVBQUUsSUFBSSxpQkFBTyxDQUFPLE1BQU0sQ0FBQztTQUMvQixDQUFDO0lBQ0gsQ0FBQztJQUVELG9DQUFXLEdBQVgsVUFBWSxhQUFxQixFQUFFLFFBQW9CO1FBQ3RELEVBQUUsQ0FBQyxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNCLGFBQWEsR0FBRyx1QkFBZSxDQUFDO1FBQ2pDLENBQUM7UUFFRCxDQUFDLENBQUMsSUFBSSxDQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBQyxPQUFzQjtZQUNqRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM5QixDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0YscUJBQUM7QUFBRCxDQUFDLEFBckJELElBcUJDO0FBTUQscUJBQXFCLENBQUMsT0FBTyxHQUFHLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzNELCtCQUErQixVQUFxQyxFQUFFLFFBQWlDO0lBQ3RHLE1BQU0sQ0FBQztRQUNOLFdBQVc7WUFDVixNQUFNLENBQUMsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELENBQUM7S0FDRCxDQUFDO0FBQ0gsQ0FBQztBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsT0FBTyxDQUFDLG1CQUFXLEVBQUUscUJBQXFCLENBQUMsQ0FBQyJ9