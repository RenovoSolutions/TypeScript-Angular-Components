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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRyaWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFTNUI7SUFJQyxpQkFBWSxPQUFlLEVBQVUsYUFBNkM7UUFBN0Msa0JBQWEsR0FBYixhQUFhLENBQWdDO1FBQ2pGLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsNEJBQVUsR0FBVixVQUFXLFFBQXNCO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxDQUFDO0lBQ0YsQ0FBQztJQUVELDBCQUFRLEdBQVIsVUFBUyxRQUFnQjtRQUF6QixpQkFPQztRQU5BLElBQUksV0FBVyxHQUFhLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQUMsT0FBZTtZQUMxQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsS0FBYTtnQkFDekMsTUFBTSxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCwyQkFBUyxHQUFULFVBQVUsUUFBbUI7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDMUIsQ0FBQztJQUNGLGNBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDO0FBMUJZLGVBQU8sVUEwQm5CLENBQUEifQ==