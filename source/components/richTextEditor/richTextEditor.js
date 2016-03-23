// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
require('ng-wig/dist/css/ng-wig.css');
require('ng-wig/dist/ng-wig');
require('./editorButtons.css');
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var richTextEditor_config_1 = require('./richTextEditor.config');
var headerButton_1 = require('./headerButton');
var paragraphButton_1 = require('./paragraphButton');
var externalProviderName = richTextEditor_config_1.providerName + 'Provider';
exports.providerName = externalProviderName;
exports.moduleName = 'rl.ui.components.richTextEditor';
exports.directiveName = 'rlRichTextEditor';
exports.controllerName = 'RichTextEditorController';
var RichTextEditorController = (function () {
    function RichTextEditorController(object, provider) {
        this.toolbar = 'h1, paragraph, bold, italic, underline, list1, list2, indent, outdent';
        if (!object.isNullOrEmpty(this.customButtons)) {
            this.toolbar += ', ' + this.customButtons;
        }
    }
    RichTextEditorController.$inject = [__object.serviceName, richTextEditor_config_1.providerName];
    return RichTextEditorController;
}());
exports.RichTextEditorController = RichTextEditorController;
function richTextEditor() {
    'use strict';
    return {
        restrict: 'E',
        template: require('./richTextEditor.html'),
        controller: exports.controllerName,
        controllerAs: 'editor',
        scope: {},
        bindToController: {
            ngModel: '=',
            customButtons: '=',
            ngDisabled: '=',
        },
    };
}
exports.richTextEditor = richTextEditor;
angular.module(exports.moduleName, ['ngWig', __object.moduleName])
    .directive(exports.directiveName, richTextEditor)
    .controller(exports.controllerName, RichTextEditorController)
    .directive(headerButton_1.headerButtonDirectiveName, headerButton_1.headerButton)
    .directive(paragraphButton_1.paragraphButtonDirectiveName, paragraphButton_1.paragraphButton)
    .provider(richTextEditor_config_1.providerName, richTextEditor_config_1.richTextEditorProvider);
//# sourceMappingURL=richTextEditor.js.map