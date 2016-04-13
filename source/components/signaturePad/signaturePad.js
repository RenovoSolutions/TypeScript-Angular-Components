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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlUGFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2lnbmF0dXJlUGFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLElBQVksWUFBWSxXQUFNLGVBQWUsQ0FBQyxDQUFBO0FBRW5DLGtCQUFVLEdBQVcsK0JBQStCLENBQUM7QUFDckQscUJBQWEsR0FBVyxnQkFBZ0IsQ0FBQztBQVlwRDtJQUNDLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFFBQVEsRUFBRSxHQUFHO1FBQ2IsT0FBTyxFQUFFLFNBQVM7UUFDbEIsUUFBUSxFQUFFLHdLQUdUO1FBQ0QsS0FBSyxFQUFFO1lBQ04sR0FBRyxFQUFFLElBQUk7WUFDVCxNQUFNLEVBQUUsR0FBRztZQUNYLEtBQUssRUFBRSxHQUFHO1lBQ1YsVUFBVSxFQUFFLEdBQUc7U0FDZjtRQUNELElBQUksWUFBQyxLQUF5QixFQUMzQixPQUFpQyxFQUNqQyxLQUFVLEVBQ1YsT0FBbUM7WUFDckMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsVUFBQyxRQUFpQjtnQkFDNUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2QsS0FBSyxDQUFDLEtBQUssR0FBRzt3QkFDYixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHO3dCQUNqRCxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHO3FCQUM5QyxDQUFDO2dCQUNILENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ1AsSUFBSSxNQUFNLEdBQXlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pGLElBQUksT0FBTyxHQUFRO3dCQUNsQixlQUFlLEVBQUUsb0JBQW9CO3FCQUNyQyxDQUFDO29CQUVGLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUU5QyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO29CQUMxRCxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO29CQUV2RCxLQUFLLENBQUMsTUFBTSxDQUFDLGNBQWdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQUMsS0FBYTt3QkFDeEUsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ25CLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUM5QixDQUFDO29CQUNGLENBQUMsQ0FBQyxDQUFDO29CQUVILEtBQUssQ0FBQyxNQUFNLENBQUMsY0FBZ0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBQyxLQUFhO3dCQUMzRSxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDbkIsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDOUIsQ0FBQztvQkFDRixDQUFDLENBQUMsQ0FBQztnQkFDSixDQUFDO1lBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO0tBQ0QsQ0FBQztBQUNILENBQUM7QUFwRGUsb0JBQVksZUFvRDNCLENBQUE7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDIn0=