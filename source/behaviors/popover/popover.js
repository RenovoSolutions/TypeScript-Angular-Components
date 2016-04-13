'use strict';
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __guid = typescript_angular_utilities_1.services.guid;
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
        __guid.serviceName];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvcG92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFDeEQsSUFBTyxNQUFNLEdBQUcsdUNBQVEsQ0FBQyxJQUFJLENBQUM7QUFFbkIsa0JBQVUsR0FBVyx5QkFBeUIsQ0FBQztBQUMvQyxxQkFBYSxHQUFXLFdBQVcsQ0FBQztBQUNwQyxzQkFBYyxHQUFXLG1CQUFtQixDQUFDO0FBT3hEO0lBUUMsMkJBQW9CLE1BQTBCLEVBQ2xDLFFBQWtDLEVBQ2xDLFFBQWlDLEVBQ2pDLE1BQXNCLEVBQ3RCLE1BQTZCLEVBQzdCLGNBQTZDLEVBQzdDLElBQXlCO1FBTmpCLFdBQU0sR0FBTixNQUFNLENBQW9CO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2pDLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQXVCO1FBQzdCLG1CQUFjLEdBQWQsY0FBYyxDQUErQjtRQUM3QyxTQUFJLEdBQUosSUFBSSxDQUFxQjtJQUFJLENBQUM7SUFFMUMsbUNBQU8sR0FBUDtRQUNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNMLElBQUksWUFBWSxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDO1lBQ3hELElBQUksZUFBZSxHQUFXLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUVuRyxFQUFFLENBQUMsQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLEdBQUcsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3hFLENBQUM7UUFDRixDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUEvQk0seUJBQU8sR0FBYSxDQUFDLFFBQVE7UUFDNUIsVUFBVTtRQUNWLFVBQVU7UUFDVixRQUFRO1FBQ1IsUUFBUTtRQUNSLGdCQUFnQjtRQUNoQixNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUEwQjdCLHdCQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQztBQWpDWSx5QkFBaUIsb0JBaUM3QixDQUFBO0FBRUQ7SUFDQyxZQUFZLENBQUM7SUFDYixNQUFNLENBQUM7UUFDTixRQUFRLEVBQUUsR0FBRztRQUNiLFFBQVEsRUFBRSxHQUFHO1FBQ2IsVUFBVSxFQUFFLHNCQUFjO0tBQzFCLENBQUM7QUFDSCxDQUFDO0FBUGUsZUFBTyxVQU90QixDQUFBO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxPQUFPLENBQUM7S0FDakMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyJ9