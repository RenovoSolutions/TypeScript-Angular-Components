'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var trigger_1 = require('./trigger');
var OnChangeTrigger = (function (_super) {
    __extends(OnChangeTrigger, _super);
    function OnChangeTrigger($rootScope, $timeout) {
        _super.call(this, 'onChange');
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.debounceDuration = 1000;
    }
    OnChangeTrigger.prototype.setTrigger = function (autosave) {
        var _this = this;
        if (_.isUndefined(this.settings)) {
            return;
        }
        this.initListeners();
        this.$rootScope.$watch(function () {
            return _this.settings.form != null
                ? _this.settings.form.$dirty
                : false;
        }, function () { _this.triggerSaveAction(autosave); });
        this.$rootScope.$watch(function () {
            return _this.settings.form != null
                ? _this.settings.form.$valid
                : false;
        }, function () { _this.triggerSaveAction(autosave); });
    };
    OnChangeTrigger.prototype.triggerSaveAction = function (autosave) {
        var _this = this;
        if (this.settings.form.$dirty && (this.settings.form.$valid || this.settings.saveWhenInvalid)) {
            this.setTimer(autosave);
            this.clearListener = this.setListener(function () {
                _this.setTimer(autosave);
            });
        }
    };
    OnChangeTrigger.prototype.setTimer = function (autosave) {
        var _this = this;
        if (this.timer != null) {
            this.$timeout.cancel(this.timer);
        }
        this.timer = this.$timeout(function () {
            _this.clearListener();
            autosave();
        }, this.debounceDuration);
    };
    OnChangeTrigger.prototype.initListeners = function () {
        this.setListener = this.settings.setChangeListener || this.nullSetListener;
        this.clearListener = this.nullClearListener;
    };
    OnChangeTrigger.prototype.nullSetListener = function () {
        console.log('No change listener available');
        return this.nullClearListener;
    };
    OnChangeTrigger.prototype.nullClearListener = function () {
        console.log('No change listener register');
    };
    return OnChangeTrigger;
}(trigger_1.Trigger));
exports.OnChangeTrigger = OnChangeTrigger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25DaGFuZ2VUcmlnZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib25DaGFuZ2VUcmlnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7O0FBR2IsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsd0JBQWtDLFdBQVcsQ0FBQyxDQUFBO0FBVTlDO0lBQXFDLG1DQUF5QjtJQU03RCx5QkFBb0IsVUFBZ0MsRUFBVSxRQUE0QjtRQUN6RixrQkFBTSxVQUFVLENBQUMsQ0FBQztRQURDLGVBQVUsR0FBVixVQUFVLENBQXNCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFMbEYscUJBQWdCLEdBQVcsSUFBSSxDQUFDO0lBT3hDLENBQUM7SUFFRCxvQ0FBVSxHQUFWLFVBQVcsUUFBc0I7UUFBakMsaUJBa0JDO1FBakJBLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUM7UUFDUixDQUFDO1FBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJO2tCQUM5QixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNO2tCQUN6QixLQUFLLENBQUM7UUFDVixDQUFDLEVBQUUsY0FBUSxLQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVoRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztZQUN0QixNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSTtrQkFDOUIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTTtrQkFDekIsS0FBSyxDQUFDO1FBQ1YsQ0FBQyxFQUFFLGNBQVEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVPLDJDQUFpQixHQUF6QixVQUEwQixRQUFvQjtRQUE5QyxpQkFRQztRQVBBLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXhCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDckMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7SUFDRixDQUFDO0lBRU8sa0NBQVEsR0FBaEIsVUFBaUIsUUFBc0I7UUFBdkMsaUJBU0M7UUFSQSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDMUIsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLFFBQVEsRUFBRSxDQUFDO1FBQ1osQ0FBQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTyx1Q0FBYSxHQUFyQjtRQUNDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzNFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQzdDLENBQUM7SUFFTyx5Q0FBZSxHQUF2QjtRQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQy9CLENBQUM7SUFFTywyQ0FBaUIsR0FBekI7UUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNGLHNCQUFDO0FBQUQsQ0FBQyxBQWhFRCxDQUFxQyxpQkFBTyxHQWdFM0M7QUFoRVksdUJBQWUsa0JBZ0UzQixDQUFBIn0=