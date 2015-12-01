'use strict';
var _ = require('lodash');
var Trigger = (function () {
    function Trigger(aliases, triggerAction) {
        this.triggerAction = triggerAction;
        this.aliases = aliases.split(' ');
    }
    Trigger.prototype.setTrigger = function (autosave) {
        if (_.isFunction(this.triggerAction)) {
            this.triggerAction(this.settings);
        }
    };
    Trigger.prototype.hasMatch = function (triggers) {
        var _this = this;
        var triggerList = triggers.split(' ');
        return _.any(triggerList, function (trigger) {
            return _.any(_this.aliases, function (alias) {
                return trigger === alias;
            });
        });
    };
    Trigger.prototype.configure = function (settings) {
        this.settings = settings;
    };
    return Trigger;
})();
exports.Trigger = Trigger;
//# sourceMappingURL=trigger.js.map