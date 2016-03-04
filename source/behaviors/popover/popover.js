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
})();
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
//# sourceMappingURL=popover.js.map