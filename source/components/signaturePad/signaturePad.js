'use strict';
var angular = require('angular');
var SignaturePad = require('signature_pad');
exports.moduleName = 'rl.ui.components.signaturePad';
exports.directiveName = 'rlSignaturePad';
function signaturePad() {
    'use strict';
    return {
        restrict: 'E',
        require: 'ngModel',
        template: "\n\t\t\t<canvas class=\"signature-pad\" ng-if=\"!ngDisabled\"></canvas>\n\t\t\t<img ng-src=\"{{ngModel.$viewValue}}\" ng-style=\"style\" ng-if=\"ngDisabled\" />\n\t\t",
        scope: {
            pad: '=',
            height: '=',
            width: '=',
            ngDisabled: '=',
        },
        link: function (scope, element, attrs, ngModel) {
            scope.$watch('ngDisabled', function (disabled) {
                scope.ngModel = ngModel;
                if (disabled) {
                    scope.style = {
                        height: scope.height != null ? scope.height : 100,
                        width: scope.width != null ? scope.width : 200,
                    };
                }
                else {
                    var canvas = element.find('.signature-pad').get(0);
                    var options = {
                        backgroundColor: 'rgb(255, 255, 255)',
                    };
                    scope.pad = new SignaturePad(canvas, options);
                    canvas.height = scope.height != null ? scope.height : 100;
                    canvas.width = scope.width != null ? scope.width : 200;
                    scope.$watch(function () { return ngModel.$viewValue; }, function (value) {
                        if (value != null) {
                            scope.pad.fromDataURL(value);
                        }
                    });
                    scope.$watch(function () { return scope.pad.toDataURL(); }, function (value) {
                        if (value != null) {
                            ngModel.$setViewValue(value);
                        }
                    });
                }
            });
        },
    };
}
exports.signaturePad = signaturePad;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, signaturePad);
//# sourceMappingURL=signaturePad.js.map