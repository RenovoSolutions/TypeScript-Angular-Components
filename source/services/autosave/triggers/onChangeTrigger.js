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
        this.initChangeListeners();
        this.$rootScope.$watch(function () {
            return _this.settings.form != null
                ? _this.settings.form.$dirty
                : false;
        }, function (value) {
            if (value) {
                _this.setTimer(autosave);
                _this.clearChangeListener = _this.setChangeListener(function () {
                    _this.$timeout.cancel(_this.timer);
                    _this.setTimer(autosave);
                });
            }
        });
    };
    OnChangeTrigger.prototype.setTimer = function (autosave) {
        var _this = this;
        this.timer = this.$timeout(function () {
            _this.clearChangeListener();
            autosave();
        }, this.debounceDuration);
    };
    OnChangeTrigger.prototype.initChangeListeners = function () {
        this.setChangeListener = this.settings.setChangeListener || this.nullSetListener;
        this.clearChangeListener = this.nullClearListener;
    };
    OnChangeTrigger.prototype.nullSetListener = function () {
        console.log('No change listener available');
        return this.nullClearListener;
    };
    OnChangeTrigger.prototype.nullClearListener = function () {
        console.log('No change listener register');
    };
    return OnChangeTrigger;
})(trigger_1.Trigger);
exports.OnChangeTrigger = OnChangeTrigger;
//# sourceMappingURL=onChangeTrigger.js.map