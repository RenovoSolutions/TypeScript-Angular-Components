'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var trigger_1 = require('./trigger');
var OnSubmitTrigger = (function (_super) {
    __extends(OnSubmitTrigger, _super);
    function OnSubmitTrigger() {
        _super.call(this, 'onSubmit');
    }
    OnSubmitTrigger.prototype.setTrigger = function (autosave) {
        if (_.isUndefined(this.settings)) {
            return;
        }
        this.initListeners();
        this.setListener(function () {
            autosave();
        });
    };
    OnSubmitTrigger.prototype.initListeners = function () {
        this.setListener = this.settings.setSubmitListener || this.nullSetListener;
    };
    OnSubmitTrigger.prototype.nullSetListener = function () {
        console.log('No submit listener available');
        return null;
    };
    return OnSubmitTrigger;
}(trigger_1.Trigger));
exports.OnSubmitTrigger = OnSubmitTrigger;
//# sourceMappingURL=onSubmitTrigger.js.map