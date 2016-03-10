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
        transclude: {
            headerSlot: '?rlDialogHeader',
            contentSlot: '?rlDialogContent',
            footerSlot: '?rlDialogFooter',
        },
        template: require('./dialog.html'),
        controller: exports.controllerName,
        controllerAs: 'dialog',
        scope: {},
        bindToController: {
            autosave: '=',
        },
        link: function (scope, element, attrs, controller, transclude) {
            controller.close = scope.$parent.$close;
            controller.dismiss = scope.$parent.$dismiss;
            var footerArea = element.find('.footer-template');
            if (transclude.isSlotFilled('footerSlot')) {
                transclude(function (footer) {
                    controller.hasFooter = (footer.length > 0);
                    if (controller.hasFooter) {
                        footerArea.append(footer);
                    }
                }, null, 'footerSlot');
            }
            else if (controller.autosave) {
                var footer = $compile(require('./autosaveDialogFooter.html'))(scope);
                controller.hasFooter = true;
                footerArea.append(footer);
            }
        },
    };
}
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, dialog)
    .controller(exports.controllerName, DialogController);
//# sourceMappingURL=dialog.js.map