"use strict";
var ng = require('angular');
exports.moduleName = 'rl.utilities.services.autosaveAction';
exports.serviceName = 'autosaveAction';
var AutosaveActionService = (function () {
    function AutosaveActionService($timeout) {
        var _this = this;
        this.$timeout = $timeout;
        this.completeMessageDuration = 1000;
        this.autosaveSuccessful = function (data) {
            return _this.resolveAutosave(data, true);
        };
        this.autosaveFailed = function (data) {
            return _this.resolveAutosave(data, false);
        };
        this.resolveAutosave = function (data, success) {
            _this._saving = false;
            _this._complete = true;
            _this._successful = success;
            _this.$timeout(function () {
                _this._complete = false;
            }, _this.completeMessageDuration);
            return data;
        };
    }
    Object.defineProperty(AutosaveActionService.prototype, "saving", {
        get: function () {
            return this._saving;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutosaveActionService.prototype, "complete", {
        get: function () {
            return this._complete;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutosaveActionService.prototype, "successful", {
        get: function () {
            return this._successful;
        },
        enumerable: true,
        configurable: true
    });
    AutosaveActionService.prototype.trigger = function (promise) {
        this._saving = true;
        return promise.then(this.autosaveSuccessful)
            .catch(this.autosaveFailed);
    };
    AutosaveActionService.$inject = ['$timeout'];
    return AutosaveActionService;
}());
ng.module(exports.moduleName, [])
    .service(exports.serviceName, AutosaveActionService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3NhdmVBY3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dG9zYXZlQWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksRUFBRSxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5CLGtCQUFVLEdBQVcsc0NBQXNDLENBQUM7QUFDNUQsbUJBQVcsR0FBVyxnQkFBZ0IsQ0FBQztBQVNsRDtJQUVDLCtCQUFvQixRQUE0QjtRQUZqRCxpQkErQ0M7UUE3Q29CLGFBQVEsR0FBUixRQUFRLENBQW9CO1FBRXhDLDRCQUF1QixHQUFXLElBQUksQ0FBQztRQXdCdkMsdUJBQWtCLEdBQXlCLFVBQUMsSUFBUztZQUM1RCxNQUFNLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFBO1FBRU8sbUJBQWMsR0FBeUIsVUFBQyxJQUFTO1lBQ3hELE1BQU0sQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUE7UUFFTyxvQkFBZSxHQUEyQyxVQUFDLElBQVMsRUFBRSxPQUFnQjtZQUM3RixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixLQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztZQUUzQixLQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNiLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUMsRUFBRSxLQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUVqQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQyxDQUFBO0lBNUNrRCxDQUFDO0lBUXBELHNCQUFJLHlDQUFNO2FBQVY7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDJDQUFRO2FBQVo7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDZDQUFVO2FBQWQ7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVELHVDQUFPLEdBQVAsVUFBUSxPQUF5QjtRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7YUFDeEMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBekJNLDZCQUFPLEdBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQThDekMsNEJBQUM7QUFBRCxDQUFDLEFBL0NELElBK0NDO0FBRUQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUN2QixPQUFPLENBQUMsbUJBQVcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDIn0=