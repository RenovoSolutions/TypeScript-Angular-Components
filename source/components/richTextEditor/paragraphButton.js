// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
exports.paragraphButtonDirectiveName = 'rlParagraphButton';
function paragraphButton() {
    'use strict';
    return {
        restrict: 'E',
        template: "\n\t\t\t<button type=\"button\" class=\"nw-button paragraph\" ng-click=\"trigger()\" ng-disabled=\"editMode || isDisabled\" title=\"paragraph\"></button>\n\t\t",
        link: function (scope) {
            scope.trigger = function () {
                scope.execCommand('formatblock', 'p');
            };
        },
    };
}
exports.paragraphButton = paragraphButton;
//# sourceMappingURL=paragraphButton.js.map