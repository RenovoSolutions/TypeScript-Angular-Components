"use strict";
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
        return _.some(triggerList, function (trigger) {
            return _.some(_this.aliases, function (alias) {
                return trigger === alias;
            });
        });
    };
    Trigger.prototype.configure = function (settings) {
        this.settings = settings;
    };
    return Trigger;
}());
exports.Trigger = Trigger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRyaWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBUzVCO0lBSUMsaUJBQVksT0FBZSxFQUFVLGFBQTZDO1FBQTdDLGtCQUFhLEdBQWIsYUFBYSxDQUFnQztRQUNqRixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELDRCQUFVLEdBQVYsVUFBVyxRQUFzQjtRQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsQ0FBQztJQUNGLENBQUM7SUFFRCwwQkFBUSxHQUFSLFVBQVMsUUFBZ0I7UUFBekIsaUJBT0M7UUFOQSxJQUFJLFdBQVcsR0FBYSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFDLE9BQWU7WUFDMUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRSxVQUFDLEtBQWE7Z0JBQ3pDLE1BQU0sQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsMkJBQVMsR0FBVCxVQUFVLFFBQW1CO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzFCLENBQUM7SUFDRixjQUFDO0FBQUQsQ0FBQyxBQTFCRCxJQTBCQztBQTFCWSxlQUFPLFVBMEJuQixDQUFBIn0=