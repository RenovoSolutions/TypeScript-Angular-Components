'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3NhdmVBY3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dG9zYXZlQWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxFQUFFLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkIsa0JBQVUsR0FBVyxzQ0FBc0MsQ0FBQztBQUM1RCxtQkFBVyxHQUFXLGdCQUFnQixDQUFDO0FBU2xEO0lBRUMsK0JBQW9CLFFBQTRCO1FBRmpELGlCQStDQztRQTdDb0IsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFFeEMsNEJBQXVCLEdBQVcsSUFBSSxDQUFDO1FBd0J2Qyx1QkFBa0IsR0FBeUIsVUFBQyxJQUFTO1lBQzVELE1BQU0sQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUE7UUFFTyxtQkFBYyxHQUF5QixVQUFDLElBQVM7WUFDeEQsTUFBTSxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQTtRQUVPLG9CQUFlLEdBQTJDLFVBQUMsSUFBUyxFQUFFLE9BQWdCO1lBQzdGLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1lBRTNCLEtBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ2IsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDeEIsQ0FBQyxFQUFFLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBRWpDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDYixDQUFDLENBQUE7SUE1Q2tELENBQUM7SUFRcEQsc0JBQUkseUNBQU07YUFBVjtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMkNBQVE7YUFBWjtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNkNBQVU7YUFBZDtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsdUNBQU8sR0FBUCxVQUFRLE9BQXlCO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzthQUN4QyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUF6Qk0sNkJBQU8sR0FBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBOEN6Qyw0QkFBQztBQUFELENBQUMsQUEvQ0QsSUErQ0M7QUFFRCxFQUFFLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQ3ZCLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLHFCQUFxQixDQUFDLENBQUMifQ==