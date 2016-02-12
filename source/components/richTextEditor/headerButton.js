// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
exports.headerButtonDirectiveName = 'rlHeaderButton';
function headerButton() {
    'use strict';
    return {
        restrict: 'E',
        template: "\n\t\t\t<button type=\"button\" class=\"nw-button header\" ng-click=\"trigger()\" ng-disabled=\"editMode || isDisabled\" title=\"Header 1\"></button>\n\t\t",
        link: function (scope) {
            scope.trigger = function () {
                scope.execCommand('formatblock', 'h1');
            };
        },
    };
}
exports.headerButton = headerButton;
//# sourceMappingURL=headerButton.js.map