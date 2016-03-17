'use strict';
var angular = require('angular');
var autosave = require('./autosave/autosave.service');
exports.autosave = autosave;
var autosaveAction = require('./autosaveAction/autosaveAction.service');
exports.autosaveAction = autosaveAction;
var autosaveDialog = require('./autosaveDialog/autosaveDialog.module');
exports.autosaveDialog = autosaveDialog;
var breakpoints = require('./breakpoints/breakpoints.module');
exports.breakpoints = breakpoints;
var componentValidator = require('./componentValidator/componentValidator.service');
exports.componentValidator = componentValidator;
var contentProvider = require('./contentProvider/contentProvider.service');
exports.contentProvider = contentProvider;
var dialog = require('./dialog/dialog.service');
exports.dialog = dialog;
var documentWrapper = require('./documentWrapper/documentWrapper.service');
exports.documentWrapper = documentWrapper;
var form = require('./form/form.service');
exports.form = form;
var jquery = require('./jquery/jquery.service');
exports.jquery = jquery;
var templateLoader = require('./templateLoader/templateLoader.service');
exports.templateLoader = templateLoader;
var windowWrapper = require('./windowWrapper/windowWrapper.service');
exports.windowWrapper = windowWrapper;
exports.moduleName = 'rl.ui.services';
angular.module(exports.moduleName, [
    autosave.moduleName,
    autosaveAction.moduleName,
    autosaveDialog.moduleName,
    breakpoints.moduleName,
    componentValidator.moduleName,
    contentProvider.moduleName,
    dialog.moduleName,
    documentWrapper.moduleName,
    form.moduleName,
    jquery.moduleName,
    templateLoader.moduleName,
    windowWrapper.moduleName,
]);
//# sourceMappingURL=services.module.js.map