var angular = require('angular');
var autosave = require('./autosave/autosave');
exports.autosave = autosave;
exports.moduleName = 'rl.ui.behaviors';
angular.module(exports.moduleName, [
    autosave.moduleName,
]);
//# sourceMappingURL=behaviors.module.js.map