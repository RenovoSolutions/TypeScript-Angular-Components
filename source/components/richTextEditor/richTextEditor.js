"use strict";
require('ng-wig/dist/ng-wig');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmljaFRleHRFZGl0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyaWNoVGV4dEVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsUUFBTyxvQkFBb0IsQ0FBQyxDQUFBO0FBRTVCLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBR25DLDZDQUFvQyw4QkFBOEIsQ0FBQyxDQUFBO0FBR25FLHNDQUE4RSx5QkFBeUIsQ0FBQyxDQUFBO0FBQ3hHLDZCQUF5RCxnQkFBZ0IsQ0FBQyxDQUFBO0FBQzFFLGdDQUErRCxtQkFBbUIsQ0FBQyxDQUFBO0FBRW5GLElBQUksb0JBQW9CLEdBQVcsb0NBQVksR0FBRyxVQUFVO0FBQzNCLG9CQUFZLHdCQURnQjtBQUdsRCxrQkFBVSxHQUFXLGlDQUFpQyxDQUFDO0FBQ3ZELHFCQUFhLEdBQVcsa0JBQWtCLENBQUM7QUFDM0Msc0JBQWMsR0FBVywwQkFBMEIsQ0FBQztBQVEvRDtJQVNDLGtDQUFZLE1BQStCLEVBQUUsUUFBYztRQUMxRCxJQUFJLENBQUMsT0FBTyxHQUFHLHVFQUF1RSxDQUFDO1FBRXZGLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDM0MsQ0FBQztJQUNGLENBQUM7SUFQTSxnQ0FBTyxHQUFhLENBQUMsd0NBQVMsQ0FBQyxpQkFBaUIsRUFBRSxvQ0FBWSxDQUFDLENBQUM7SUFReEUsK0JBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBaEJZLGdDQUF3QiwyQkFnQnBDLENBQUE7QUFFRCxJQUFJLGNBQWMsR0FBOEI7SUFDL0MsUUFBUSxFQUFFLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztJQUMxQyxVQUFVLEVBQUUsc0JBQWM7SUFDMUIsWUFBWSxFQUFFLFFBQVE7SUFDdEIsUUFBUSxFQUFFO1FBQ1QsT0FBTyxFQUFFLEdBQUc7UUFDWixhQUFhLEVBQUUsR0FBRztRQUNsQixVQUFVLEVBQUUsR0FBRztLQUNmO0NBQ0QsQ0FBQztBQUVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLE9BQU8sRUFBRSx3Q0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3pELFNBQVMsQ0FBQyxxQkFBYSxFQUFFLGNBQWMsQ0FBQztLQUN4QyxVQUFVLENBQUMsc0JBQWMsRUFBRSx3QkFBd0IsQ0FBQztLQUNwRCxTQUFTLENBQUMsd0NBQXlCLEVBQUUsMkJBQVksQ0FBQztLQUNsRCxTQUFTLENBQUMsOENBQTRCLEVBQUUsaUNBQWUsQ0FBQztLQUN4RCxRQUFRLENBQUMsb0NBQVksRUFBRSw4Q0FBc0IsQ0FBQyxDQUFDIn0=