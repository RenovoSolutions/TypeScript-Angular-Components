"use strict";
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
exports.moduleName = 'rl.ui.behaviors.popover';
exports.directiveName = 'rlPopover';
exports.controllerName = 'PopoverController';
var PopoverController = (function () {
    function PopoverController($attrs, $element, $compile, $scope, $parse, $templateCache, guid) {
        this.$attrs = $attrs;
        this.$element = $element;
        this.$compile = $compile;
        this.$scope = $scope;
        this.$parse = $parse;
        this.$templateCache = $templateCache;
        this.guid = guid;
    }
    PopoverController.prototype.$onInit = function () {
        if (this.$parse(this.$attrs.textOnly)(this.$scope)) {
            this.$element.attr('uib-popover', this.$attrs.rlPopover);
        }
        else {
            var templatePath = this.guid.random() + '.html';
            var templateContent = '<div>' + this.$parse(this.$attrs.rlPopover)(this.$scope) + '</div>';
            if (templateContent != null) {
                this.$templateCache.put(templatePath, templateContent);
                this.$element.attr('uib-popover-template', '\'' + templatePath + '\'');
            }
        }
        this.$element.removeAttr('rl-popover');
        this.$compile(this.$element)(this.$scope);
    };
    PopoverController.$inject = ['$attrs',
        '$element',
        '$compile',
        '$scope',
        '$parse',
        '$templateCache',
        typescript_angular_utilities_1.downgrade.guidServiceName];
    return PopoverController;
}());
exports.PopoverController = PopoverController;
function popover() {
    'use strict';
    return {
        restrict: 'A',
        priority: 300,
        controller: exports.controllerName,
    };
}
exports.popover = popover;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, popover)
    .controller(exports.controllerName, PopoverController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcG92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLDZDQUFvQyw4QkFBOEIsQ0FBQyxDQUFBO0FBR3hELGtCQUFVLEdBQVcseUJBQXlCLENBQUM7QUFDL0MscUJBQWEsR0FBVyxXQUFXLENBQUM7QUFDcEMsc0JBQWMsR0FBVyxtQkFBbUIsQ0FBQztBQU94RDtJQVFDLDJCQUFvQixNQUEwQixFQUNsQyxRQUFrQyxFQUNsQyxRQUFpQyxFQUNqQyxNQUFzQixFQUN0QixNQUE2QixFQUM3QixjQUE2QyxFQUM3QyxJQUF5QjtRQU5qQixXQUFNLEdBQU4sTUFBTSxDQUFvQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUF1QjtRQUM3QixtQkFBYyxHQUFkLGNBQWMsQ0FBK0I7UUFDN0MsU0FBSSxHQUFKLElBQUksQ0FBcUI7SUFBSSxDQUFDO0lBRTFDLG1DQUFPLEdBQVA7UUFDQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDTCxJQUFJLFlBQVksR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQztZQUN4RCxJQUFJLGVBQWUsR0FBVyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUM7WUFFbkcsRUFBRSxDQUFDLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxHQUFHLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQztZQUN4RSxDQUFDO1FBQ0YsQ0FBQztRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBL0JNLHlCQUFPLEdBQWEsQ0FBQyxRQUFRO1FBQzVCLFVBQVU7UUFDVixVQUFVO1FBQ1YsUUFBUTtRQUNSLFFBQVE7UUFDUixnQkFBZ0I7UUFDaEIsd0NBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQTBCcEMsd0JBQUM7QUFBRCxDQUFDLEFBakNELElBaUNDO0FBakNZLHlCQUFpQixvQkFpQzdCLENBQUE7QUFFRDtJQUNDLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFFBQVEsRUFBRSxHQUFHO1FBQ2IsUUFBUSxFQUFFLEdBQUc7UUFDYixVQUFVLEVBQUUsc0JBQWM7S0FDMUIsQ0FBQztBQUNILENBQUM7QUFQZSxlQUFPLFVBT3RCLENBQUE7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLE9BQU8sQ0FBQztLQUNqQyxVQUFVLENBQUMsc0JBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDIn0=