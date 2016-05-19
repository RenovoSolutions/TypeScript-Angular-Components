"use strict";
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
            pad: '=?',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlUGFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2lnbmF0dXJlUGFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyxJQUFZLFlBQVksV0FBTSxlQUFlLENBQUMsQ0FBQTtBQUVuQyxrQkFBVSxHQUFXLCtCQUErQixDQUFDO0FBQ3JELHFCQUFhLEdBQVcsZ0JBQWdCLENBQUM7QUFZcEQ7SUFDQyxZQUFZLENBQUM7SUFDYixNQUFNLENBQUM7UUFDTixRQUFRLEVBQUUsR0FBRztRQUNiLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFFBQVEsRUFBRSx3S0FHVDtRQUNELEtBQUssRUFBRTtZQUNOLEdBQUcsRUFBRSxJQUFJO1lBQ1QsTUFBTSxFQUFFLEdBQUc7WUFDWCxLQUFLLEVBQUUsR0FBRztZQUNWLFVBQVUsRUFBRSxHQUFHO1NBQ2Y7UUFDRCxJQUFJLFlBQUMsS0FBeUIsRUFDM0IsT0FBaUMsRUFDakMsS0FBVSxFQUNWLE9BQW1DO1lBQ3JDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLFVBQUMsUUFBaUI7Z0JBQzVDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN4QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNkLEtBQUssQ0FBQyxLQUFLLEdBQUc7d0JBQ2IsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRzt3QkFDakQsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRztxQkFDOUMsQ0FBQztnQkFDSCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNQLElBQUksTUFBTSxHQUF5QyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6RixJQUFJLE9BQU8sR0FBUTt3QkFDbEIsZUFBZSxFQUFFLG9CQUFvQjtxQkFDckMsQ0FBQztvQkFFRixLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFFOUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztvQkFDMUQsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztvQkFFdkQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxjQUFnQixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFDLEtBQWE7d0JBQ3hFLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNuQixLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDOUIsQ0FBQztvQkFDRixDQUFDLENBQUMsQ0FBQztvQkFFSCxLQUFLLENBQUMsTUFBTSxDQUFDLGNBQWdCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQUMsS0FBYTt3QkFDM0UsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ25CLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzlCLENBQUM7b0JBQ0YsQ0FBQyxDQUFDLENBQUM7Z0JBQ0osQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBcERlLG9CQUFZLGVBb0QzQixDQUFBO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQyJ9