'use strict';
var angular = require('angular');
require('angular-ui-bootstrap');
require('angular-sanitize');
require('rangy');
require('textangular');
require('../libraries/angular-bootstrap-slider/index');
require('signature_pad');
var behaviors = require('./behaviors/behaviors.module');
exports.behaviors = behaviors;
var components = require('./components/components.module');
exports.components = components;
var services = require('./services/services.module');
exports.services = services;
exports.moduleName = 'rl.ui';
angular.module(exports.moduleName, [
    'ui.bootstrap',
    'ngSanitize',
    'textAngular',
    behaviors.moduleName,
    components.moduleName,
    services.moduleName,
]);
//# sourceMappingURL=ui.module.js.map