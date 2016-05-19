"use strict";
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var radioGroup_1 = require('./radioGroup');
exports.radioGroupDirectiveName = radioGroup_1.directiveName;
exports.radioGroup = radioGroup_1.radioGroup;
exports.radioGroupControllerName = radioGroup_1.controllerName;
exports.RadioGroupController = radioGroup_1.RadioGroupController;
var radio_1 = require('./radio');
exports.radioComponentName = radio_1.componentName;
exports.radio = radio_1.radio;
exports.radioControllerName = radio_1.controllerName;
exports.RadioController = radio_1.RadioController;
exports.moduleName = 'rl21.components.radio';
angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName])
    .directive(radioGroup_1.directiveName, radioGroup_1.radioGroup)
    .controller(radioGroup_1.controllerName, radioGroup_1.RadioGroupController)
    .component(radio_1.componentName, radio_1.radio)
    .controller(radio_1.controllerName, radio_1.RadioController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmFkaW8ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyw2Q0FBMEIsOEJBQThCLENBQUMsQ0FBQTtBQUV6RCwyQkFLTyxjQUFjLENBQUMsQ0FBQTtBQVNyQiwrQkFBdUI7QUFDdkIsa0JBQVU7QUFDVixnQ0FBd0I7QUFDeEIsNEJBQW9CO0FBWHJCLHNCQUtPLFNBQVMsQ0FBQyxDQUFBO0FBT2hCLDBCQUFrQjtBQUNsQixhQUFLO0FBQ0wsMkJBQW1CO0FBQ25CLHVCQUFlO0FBR0wsa0JBQVUsR0FBVyx1QkFBdUIsQ0FBQztBQUV4RCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQyx3Q0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ2hELFNBQVMsQ0FBQywwQkFBdUIsRUFBRSx1QkFBVSxDQUFDO0tBQzlDLFVBQVUsQ0FBQywyQkFBd0IsRUFBRSxpQ0FBb0IsQ0FBQztLQUMxRCxTQUFTLENBQUMscUJBQWtCLEVBQUUsYUFBSyxDQUFDO0tBQ3BDLFVBQVUsQ0FBQyxzQkFBbUIsRUFBRSx1QkFBZSxDQUFDLENBQUMifQ==