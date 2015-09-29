'use strict';
var angular = require('angular');
var behaviors = require('./behaviors/behaviors.module');
exports.behaviors = behaviors;
var components = require('./components/components.module');
exports.components = components;
var services = require('./services/services.module');
exports.services = services;
exports.moduleName = 'rl.ui';
angular.module(exports.moduleName, [
    behaviors.moduleName,
    components.moduleName,
    services.moduleName,
]);
//# sourceMappingURL=ui.module.js.map