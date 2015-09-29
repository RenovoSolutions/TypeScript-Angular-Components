'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.ui.components.richTextEditor';
exports.directiveName = 'rlRichTextEditor';
exports.controllerName = 'RichTextEditorController';
var RichTextEditorController = (function () {
    function RichTextEditorController() {
        var _this = this;
        this.toolbar = [
            ['h1', 'bold', 'italics', 'underline', 'ul', 'ol', 'indent', 'outdent'],
            ['html'],
        ];
        _.each(this.customButtons, function (button) {
            _this.toolbar[1].push(button);
        });
    }
    return RichTextEditorController;
})();
exports.RichTextEditorController = RichTextEditorController;
function richTextEditor() {
    'use strict';
    return {
        restrict: 'E',
        template: "\n\t\t\t<div class=\"rich-text-editor\">\n\t\t\t\t<text-angular ng-model=\"editor.ngModel\" ta-toolbar=\"editor.toolbar\"></text-angular>\n\t\t\t</div>\n\t\t",
        controller: exports.controllerName,
        controllerAs: 'editor',
        scope: {},
        bindToController: {
            ngModel: '=',
            customButtons: '=',
        },
    };
}
exports.richTextEditor = richTextEditor;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, richTextEditor)
    .controller(exports.controllerName, RichTextEditorController);
//# sourceMappingURL=richTextEditor.js.map