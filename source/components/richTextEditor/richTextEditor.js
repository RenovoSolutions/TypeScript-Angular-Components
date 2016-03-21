// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('ng-wig/dist/css/ng-wig.css');
require('ng-wig/dist/ng-wig');
require('./editorButtons.css');
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var input_1 = require('../input/input');
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
var richTextEditor_config_1 = require('./richTextEditor.config');
var headerButton_1 = require('./headerButton');
var paragraphButton_1 = require('./paragraphButton');
var externalProviderName = richTextEditor_config_1.providerName + 'Provider';
exports.providerName = externalProviderName;
exports.moduleName = 'rl.ui.components.richTextEditor';
exports.componentName = 'rlRichTextEditor';
exports.controllerName = 'RichTextEditorController';
var RichTextEditorController = (function (_super) {
    __extends(RichTextEditorController, _super);
    function RichTextEditorController($scope, $attrs, componentValidatorFactory, object, provider) {
        _super.call(this, $scope, $attrs, componentValidatorFactory);
        this.inputType = 'rich-text-editor';
        this.toolbar = 'h1, paragraph, bold, italic, underline, list1, list2, indent, outdent';
        if (!object.isNullOrEmpty(this.customButtons)) {
            this.toolbar += ', ' + this.customButtons;
        }
    }
    RichTextEditorController.$inject = ['$scope', '$attrs', componentValidator_service_1.factoryName, __object.serviceName, richTextEditor_config_1.providerName];
    return RichTextEditorController;
}(input_1.InputController));
exports.RichTextEditorController = RichTextEditorController;
var richTextEditor = _.clone(input_1.input);
richTextEditor.template = require('./richTextEditor.html');
richTextEditor.controller = exports.controllerName;
richTextEditor.controllerAs = 'editor';
var richTextEditorBindings = richTextEditor.bindings;
richTextEditorBindings.customButtons = '<?';
richTextEditorBindings.ngDisabled = '<?';
angular.module(exports.moduleName, ['ngWig', __object.moduleName, input_1.moduleName])
    .component(exports.componentName, richTextEditor)
    .controller(exports.controllerName, RichTextEditorController)
    .directive(headerButton_1.headerButtonDirectiveName, headerButton_1.headerButton)
    .directive(paragraphButton_1.paragraphButtonDirectiveName, paragraphButton_1.paragraphButton)
    .provider(richTextEditor_config_1.providerName, richTextEditor_config_1.richTextEditorProvider);
//# sourceMappingURL=richTextEditor.js.map