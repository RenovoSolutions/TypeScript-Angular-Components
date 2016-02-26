// /// <reference path='../../../typings/node/node.d.ts' />
// /// <reference path='../../../typings/jquery/jquery.d.ts' />
'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.dialog';
exports.directiveName = 'rlDialog';
exports.controllerName = 'DialogController';
var DialogController = (function () {
    function DialogController() {
    }
    return DialogController;
}());
exports.DialogController = DialogController;
dialog.$inject = ['$compile'];
function dialog($compile) {
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        template: require('./dialog.html'),
        controller: exports.controllerName,
        controllerAs: 'dialog',
        scope: {},
        bindToController: {
            autosave: '=',
        },
        link: function (scope, element, attrs, controller, transclude) {
            transclude(function (clone, dialogScope) {
                var header = clone.filter('rl-dialog-header');
                var content = clone.filter('rl-dialog-content');
                var footer = clone.filter('rl-dialog-footer');
                var headerArea = element.find('.header-template');
                headerArea.append(header);
                var contentArea = element.find('.content-template');
                contentArea.append(content);
                controller.hasFooter = (footer.length > 0);
                if (!controller.hasFooter && controller.autosave) {
                    footer = $compile(require('./autosaveDialogFooter.html'))(dialogScope);
                    controller.hasFooter = true;
                }
                if (controller.hasFooter) {
                    var footerArea = element.find('.footer-template');
                    footerArea.append(footer);
                }
            });
        },
    };
}
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, dialog)
    .controller(exports.controllerName, DialogController);
//# sourceMappingURL=dialog.js.map