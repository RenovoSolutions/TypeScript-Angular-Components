"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25DaGFuZ2VUcmlnZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib25DaGFuZ2VUcmlnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLHdCQUFrQyxXQUFXLENBQUMsQ0FBQTtBQVU5QztJQUFxQyxtQ0FBeUI7SUFNN0QseUJBQW9CLFVBQWdDLEVBQVUsUUFBNEI7UUFDekYsa0JBQU0sVUFBVSxDQUFDLENBQUM7UUFEQyxlQUFVLEdBQVYsVUFBVSxDQUFzQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQW9CO1FBTGxGLHFCQUFnQixHQUFXLElBQUksQ0FBQztJQU94QyxDQUFDO0lBRUQsb0NBQVUsR0FBVixVQUFXLFFBQXNCO1FBQWpDLGlCQWtCQztRQWpCQSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDO1FBQ1IsQ0FBQztRQUVELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztZQUN0QixNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSTtrQkFDOUIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTTtrQkFDekIsS0FBSyxDQUFDO1FBQ1YsQ0FBQyxFQUFFLGNBQVEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDdEIsTUFBTSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLElBQUk7a0JBQzlCLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU07a0JBQ3pCLEtBQUssQ0FBQztRQUNWLENBQUMsRUFBRSxjQUFRLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTywyQ0FBaUIsR0FBekIsVUFBMEIsUUFBb0I7UUFBOUMsaUJBUUM7UUFQQSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ3JDLEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO0lBQ0YsQ0FBQztJQUVPLGtDQUFRLEdBQWhCLFVBQWlCLFFBQXNCO1FBQXZDLGlCQVNDO1FBUkEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzFCLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixRQUFRLEVBQUUsQ0FBQztRQUNaLENBQUMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU8sdUNBQWEsR0FBckI7UUFDQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUMzRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUM3QyxDQUFDO0lBRU8seUNBQWUsR0FBdkI7UUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUMvQixDQUFDO0lBRU8sMkNBQWlCLEdBQXpCO1FBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDRixzQkFBQztBQUFELENBQUMsQUFoRUQsQ0FBcUMsaUJBQU8sR0FnRTNDO0FBaEVZLHVCQUFlLGtCQWdFM0IsQ0FBQSJ9