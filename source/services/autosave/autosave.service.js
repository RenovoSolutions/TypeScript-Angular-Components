"use strict";
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var autosaveAction_service_1 = require('../autosaveAction/autosaveAction.service');
var triggers = require('./triggers/triggers.service');
exports.triggers = triggers;
var form_service_1 = require('../form/form.service');
exports.moduleName = 'rl.ui.services.autosave';
exports.factoryName = 'autosaveFactory';
var AutosaveService = (function () {
    function AutosaveService(notification, autosaveService, options, triggerServiceFactory, formService) {
        var _this = this;
        this.notification = notification;
        this.autosaveService = autosaveService;
        this.formService = formService;
        this.autosave = function () {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i - 0] = arguments[_i];
            }
            var result = _this.validateAndSave.apply(_this, data);
            if (_.isBoolean(result)) {
                return result;
            }
            else {
                _this.autosaveService.trigger(result);
                return true;
            }
        };
        this.contentForm = options.contentForm || this.nullForm();
        this.save = options.save;
        this.saveWhenInvalid = options.saveWhenInvalid;
        this.triggerService = triggerServiceFactory.getInstance();
        this.configureTriggers(options);
        this.triggerService.setTriggers(options.triggers, this.autosave);
    }
    AutosaveService.prototype.validateAndSave = function () {
        var _this = this;
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i - 0] = arguments[_i];
        }
        if (this.contentForm.$pristine) {
            return true;
        }
        if (this.contentForm.$valid || this.saveWhenInvalid) {
            var promise = this.save.apply(this, data);
            if (!_.isUndefined(promise)) {
                return promise.then(function () {
                    if (_this.contentForm != null) {
                        _this.contentForm.$setPristine();
                    }
                });
            }
            return true;
        }
        else {
            this.notification.warning(this.formService.getAggregateError(this.contentForm));
            return false;
        }
    };
    AutosaveService.prototype.configureTriggers = function (options) {
        this.triggerService.triggers.onChange.configure({
            form: options.contentForm,
            setChangeListener: options.setChangeListener,
            debounceDuration: options.debounceDuration,
            saveWhenInvalid: options.saveWhenInvalid,
        });
    };
    AutosaveService.prototype.nullForm = function () {
        return {
            $pristine: false,
            $dirty: true,
            $valid: true,
            $setPristine: function () {
                return;
            },
        };
    };
    return AutosaveService;
}());
autosaveServiceFactory.$inject = [typescript_angular_utilities_1.downgrade.notificationServiceName, autosaveAction_service_1.serviceName, triggers.factoryName, form_service_1.serviceName];
function autosaveServiceFactory(notification, autosaveService, triggerServiceFactory, formService) {
    'use strict';
    return {
        getInstance: function (options) {
            return new AutosaveService(notification, autosaveService, options, triggerServiceFactory, formService);
        }
    };
}
angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName, autosaveAction_service_1.moduleName, triggers.moduleName, form_service_1.moduleName])
    .factory(exports.factoryName, autosaveServiceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3NhdmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dG9zYXZlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUFvQyw4QkFBOEIsQ0FBQyxDQUFBO0FBR25FLHVDQUlPLDBDQUEwQyxDQUFDLENBQUE7QUFDbEQsSUFBWSxRQUFRLFdBQU0sNkJBQTZCLENBQUMsQ0FBQTtBQUkvQyxnQkFBUTtBQUhqQiw2QkFBdUYsc0JBQXNCLENBQUMsQ0FBQTtBQUtuRyxrQkFBVSxHQUFXLHlCQUF5QixDQUFDO0FBQy9DLG1CQUFXLEdBQVcsaUJBQWlCLENBQUM7QUFpQm5EO0lBTUMseUJBQW9CLFlBQWlELEVBQ3pELGVBQXVDLEVBQy9DLE9BQWdDLEVBQ2hDLHFCQUFzRCxFQUM5QyxXQUF5QjtRQVZ0QyxpQkF3RUM7UUFsRW9CLGlCQUFZLEdBQVosWUFBWSxDQUFxQztRQUN6RCxvQkFBZSxHQUFmLGVBQWUsQ0FBd0I7UUFHdkMsZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFVckMsYUFBUSxHQUFrQztZQUFDLGNBQWM7aUJBQWQsV0FBYyxDQUFkLHNCQUFjLENBQWQsSUFBYztnQkFBZCw2QkFBYzs7WUFDeEQsSUFBSSxNQUFNLEdBQXFDLEtBQUksQ0FBQyxlQUFlLE9BQXBCLEtBQUksRUFBb0IsSUFBSSxDQUFDLENBQUM7WUFDN0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDZixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsS0FBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDYixDQUFDO1FBQ0YsQ0FBQyxDQUFBO1FBakJBLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQztRQUUvQyxJQUFJLENBQUMsY0FBYyxHQUFHLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBWUQseUNBQWUsR0FBZjtRQUFBLGlCQXFCQztRQXJCZSxjQUFjO2FBQWQsV0FBYyxDQUFkLHNCQUFjLENBQWQsSUFBYztZQUFkLDZCQUFjOztRQUM3QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNyRCxJQUFJLE9BQU8sR0FBMkIsSUFBSSxDQUFDLElBQUksT0FBVCxJQUFJLEVBQVMsSUFBSSxDQUFDLENBQUM7WUFFekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ25CLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDakMsQ0FBQztnQkFDRixDQUFDLENBQUMsQ0FBQztZQUNKLENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoRixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNGLENBQUM7SUFFTywyQ0FBaUIsR0FBekIsVUFBMEIsT0FBZ0M7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztZQUMvQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDekIsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLGlCQUFpQjtZQUM1QyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsZ0JBQWdCO1lBQzFDLGVBQWUsRUFBRSxPQUFPLENBQUMsZUFBZTtTQUN4QyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU8sa0NBQVEsR0FBaEI7UUFDQyxNQUFNLENBQU07WUFDWCxTQUFTLEVBQUUsS0FBSztZQUNoQixNQUFNLEVBQUUsSUFBSTtZQUNaLE1BQU0sRUFBRSxJQUFJO1lBQ1osWUFBWTtnQkFDWCxNQUFNLENBQUM7WUFDUixDQUFDO1NBQ0QsQ0FBQztJQUNILENBQUM7SUFDRixzQkFBQztBQUFELENBQUMsQUF4RUQsSUF3RUM7QUFNRCxzQkFBc0IsQ0FBQyxPQUFPLEdBQUcsQ0FBQyx3Q0FBUyxDQUFDLHVCQUF1QixFQUFFLG9DQUF5QixFQUFFLFFBQVEsQ0FBQyxXQUFXLEVBQUUsMEJBQWUsQ0FBQyxDQUFDO0FBQ3ZJLGdDQUFnQyxZQUFpRCxFQUN4RSxlQUF1QyxFQUN2QyxxQkFBc0QsRUFDdEQsV0FBeUI7SUFDakMsWUFBWSxDQUFDO0lBQ2IsTUFBTSxDQUFDO1FBQ04sV0FBVyxZQUFDLE9BQWdDO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN4RyxDQUFDO0tBQ0QsQ0FBQztBQUNILENBQUM7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQyx3Q0FBUyxDQUFDLFVBQVUsRUFBRSxtQ0FBd0IsRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFFLHlCQUFVLENBQUMsQ0FBQztLQUMzRyxPQUFPLENBQUMsbUJBQVcsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDIn0=