'use strict';
var angular = require('angular');
require('angular-ui-bootstrap');
require('angular-sanitize');
require('../libraries/angular-bootstrap-slider/slider');
require('signature_pad');
var behaviors = require('./behaviors/behaviors.module');
exports.behaviors = behaviors;
var components = require('./components/components.module');
exports.components = components;
var services = require('./services/services.module');
exports.services = services;
var types = require('./types/types.module');
exports.types = types;
exports.moduleName = 'rl.ui';
angular.module(exports.moduleName, [
    'ui.bootstrap',
    'ui.bootstrap-slider',
    'ngSanitize',
    behaviors.moduleName,
    components.moduleName,
    services.moduleName,
]);
//# sourceMappingURL=ui.module.js.map