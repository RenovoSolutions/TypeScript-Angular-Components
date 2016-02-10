// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
exports.paragraphButtonDirectiveName = 'rlParagraphButton';
function paragraphButton() {
    'use strict';
    return {
        restrict: 'E',
        template: "\n\t\t\t<button type=\"button\" class=\"nw-button\" ng-click=\"trigger()\" ng-disabled=\"editMode || isDisabled\" title=\"paragraph\">\n\t\t\t\t<i class=\"fa fa-paragraph\"></i> P\n\t\t\t</button>\n\t\t",
        link: function (scope) {
            scope.trigger = function () {
                scope.execCommand('formatblock', 'p');
            };
        },
    };
}
exports.paragraphButton = paragraphButton;
//# sourceMappingURL=paragraphButton.js.map