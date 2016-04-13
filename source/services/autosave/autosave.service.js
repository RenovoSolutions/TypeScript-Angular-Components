'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __notification = typescript_angular_utilities_1.services.notification;
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
autosaveServiceFactory.$inject = [__notification.serviceName, autosaveAction_service_1.serviceName, triggers.factoryName, form_service_1.serviceName];
function autosaveServiceFactory(notification, autosaveService, triggerServiceFactory, formService) {
    'use strict';
    return {
        getInstance: function (options) {
            return new AutosaveService(notification, autosaveService, options, triggerServiceFactory, formService);
        }
    };
}
angular.module(exports.moduleName, [__notification.moduleName, autosaveAction_service_1.moduleName, triggers.moduleName, form_service_1.moduleName])
    .factory(exports.factoryName, autosaveServiceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3NhdmUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dG9zYXZlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFDeEQsSUFBTyxjQUFjLEdBQUcsdUNBQVEsQ0FBQyxZQUFZLENBQUM7QUFFOUMsdUNBSU8sMENBQTBDLENBQUMsQ0FBQTtBQUNsRCxJQUFZLFFBQVEsV0FBTSw2QkFBNkIsQ0FBQyxDQUFBO0FBSS9DLGdCQUFRO0FBSGpCLDZCQUF1RixzQkFBc0IsQ0FBQyxDQUFBO0FBS25HLGtCQUFVLEdBQVcseUJBQXlCLENBQUM7QUFDL0MsbUJBQVcsR0FBVyxpQkFBaUIsQ0FBQztBQWlCbkQ7SUFNQyx5QkFBb0IsWUFBaUQsRUFDekQsZUFBdUMsRUFDL0MsT0FBZ0MsRUFDaEMscUJBQXNELEVBQzlDLFdBQXlCO1FBVnRDLGlCQXdFQztRQWxFb0IsaUJBQVksR0FBWixZQUFZLENBQXFDO1FBQ3pELG9CQUFlLEdBQWYsZUFBZSxDQUF3QjtRQUd2QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQVVyQyxhQUFRLEdBQWtDO1lBQUMsY0FBYztpQkFBZCxXQUFjLENBQWQsc0JBQWMsQ0FBZCxJQUFjO2dCQUFkLDZCQUFjOztZQUN4RCxJQUFJLE1BQU0sR0FBcUMsS0FBSSxDQUFDLGVBQWUsT0FBcEIsS0FBSSxFQUFvQixJQUFJLENBQUMsQ0FBQztZQUM3RSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNmLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDUCxLQUFJLENBQUMsZUFBZSxDQUFD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