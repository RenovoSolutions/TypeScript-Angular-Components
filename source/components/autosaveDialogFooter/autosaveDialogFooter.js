'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.autosaveDialogFooter';
exports.directiveName = 'rlAutosaveDialogFooter';
function autosaveDialogFooter() {
    'use strict';
    return {
        restrict: 'E',
        template: require('./autosaveDialogFooter.html'),
    };
}
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, autosaveDialogFooter);
//# sourceMappingURL=autosaveDialogFooter.js.map