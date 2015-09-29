// /// <reference path='../../../typings/signature_pad/signature_pad.d.ts' />
'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.signaturePad';
exports.directiveName = 'rlSignaturePad';
function signaturePad() {
    'use strict';
    return {
        restrict: 'E',
        template: "\n\t\t\t<canvas class=\"signature-pad\"></canvas>\n\t\t",
        scope: {
            signature: '=',
            initial: '=',
            height: '=',
            width: '=',
        },
        link: function (scope, element) {
            var canvas = element.find('.signature-pad').get(0);
            var options = {
                backgroundColor: 'rgb(255, 255, 255)',
            };
            scope.signature = new SignaturePad(canvas, options);
            canvas.height = scope.height != null ? scope.height : 100;
            canvas.width = scope.width != null ? scope.width : 200;
            if (scope.initial != null) {
                scope.signature.fromDataURL(scope.initial);
            }
        },
    };
}
exports.signaturePad = signaturePad;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, signaturePad);
//# sourceMappingURL=signaturePad.js.map