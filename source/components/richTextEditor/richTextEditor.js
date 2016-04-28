// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
require('ng-wig/dist/css/ng-wig.css');
require('ng-wig/dist/ng-wig');
require('./editorButtons.css');
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var richTextEditor_config_1 = require('./richTextEditor.config');
var headerButton_1 = require('./headerButton');
var paragraphButton_1 = require('./paragraphButton');
var externalProviderName = richTextEditor_config_1.providerName + 'Provider';
exports.providerName = externalProviderName;
exports.moduleName = 'rl.ui.components.richTextEditor';
exports.componentName = 'rlRichTextEditor';
exports.controllerName = 'RichTextEditorController';
var RichTextEditorController = (function () {
    function RichTextEditorController(object, provider) {
        this.toolbar = 'h1, paragraph, bold, italic, underline, list1, list2, indent, outdent';
        if (!object.isNullOrEmpty(this.customButtons)) {
            this.toolbar += ', ' + this.customButtons;
        }
    }
    RichTextEditorController.$inject = [typescript_angular_utilities_1.downgrade.objectServiceName, richTextEditor_config_1.providerName];
    return RichTextEditorController;
}());
exports.RichTextEditorController = RichTextEditorController;
var richTextEditor = {
    template: require('./richTextEditor.html'),
    controller: exports.controllerName,
    controllerAs: 'editor',
    bindings: {
        ngModel: '=',
        customButtons: '=',
        ngDisabled: '=',
    },
};
angular.module(exports.moduleName, ['ngWig', typescript_angular_utilities_1.downgrade.moduleName])
    .component(exports.componentName, richTextEditor)
    .controller(exports.controllerName, RichTextEditorController)
    .directive(headerButton_1.headerButtonDirectiveName, headerButton_1.headerButton)
    .directive(paragraphButton_1.paragraphButtonDirectiveName, paragraphButton_1.paragraphButton)
    .provider(richTextEditor_config_1.providerName, richTextEditor_config_1.richTextEditorProvider);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmljaFRleHRFZGl0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyaWNoVGV4dEVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwREFBMEQ7QUFFMUQsWUFBWSxDQUFDO0FBRWIsUUFBTyw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3BDLFFBQU8sb0JBQW9CLENBQUMsQ0FBQTtBQUM1QixRQUFPLHFCQUFxQixDQUFDLENBQUE7QUFFN0IsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFHbkMsNkNBQW9DLDhCQUE4QixDQUFDLENBQUE7QUFHbkUsc0NBQThFLHlCQUF5QixDQUFDLENBQUE7QUFDeEcsNkJBQXlELGdCQUFnQixDQUFDLENBQUE7QUFDMUUsZ0NBQStELG1CQUFtQixDQUFDLENBQUE7QUFFbkYsSUFBSSxvQkFBb0IsR0FBVyxvQ0FBWSxHQUFHLFVBQVU7QUFDM0Isb0JBQVksd0JBRGdCO0FBR2xELGtCQUFVLEdBQVcsaUNBQWlDLENBQUM7QUFDdkQscUJBQWEsR0FBVyxrQkFBa0IsQ0FBQztBQUMzQyxzQkFBYyxHQUFXLDBCQUEwQixDQUFDO0FBUS9EO0lBU0Msa0NBQVksTUFBK0IsRUFBRSxRQUFjO1FBQzFELElBQUksQ0FBQyxPQUFPLEdBQUcsdUVBQXVFLENBQUM7UUFFdkYsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUMzQyxDQUFDO0lBQ0YsQ0FBQztJQVBNLGdDQUFPLEdBQWEsQ0FBQyx3Q0FBUyxDQUFDLGlCQUFpQixFQUFFLG9DQUFZLENBQUMsQ0FBQztJQVF4RSwrQkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFoQlksZ0NBQXdCLDJCQWdCcEMsQ0FBQTtBQUVELElBQUksY0FBYyxHQUE4QjtJQUMvQyxRQUFRLEVBQUUsT0FBTyxDQUFDLHVCQUF1QixDQUFDO0lBQzFDLFVBQVUsRUFBRSxzQkFBYztJQUMxQixZQUFZLEVBQUUsUUFBUTtJQUN0QixRQUFRLEVBQUU7UUFDVCxPQUFPLEVBQUUsR0FBRztRQUNaLGFBQWEsRUFBRSxHQUFHO1FBQ2xCLFVBQVUsRUFBRSxHQUFHO0tBQ2Y7Q0FDRCxDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsT0FBTyxFQUFFLHdDQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDekQsU0FBUyxDQUFDLHFCQUFhLEVBQUUsY0FBYyxDQUFDO0tBQ3hDLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLHdCQUF3QixDQUFDO0tBQ3BELFNBQVMsQ0FBQyx3Q0FBeUIsRUFBRSwyQkFBWSxDQUFDO0tBQ2xELFNBQVMsQ0FBQyw4Q0FBNEIsRUFBRSxpQ0FBZSxDQUFDO0tBQ3hELFFBQVEsQ0FBQyxvQ0FBWSxFQUFFLDhDQUFzQixDQUFDLENBQUMifQ==