// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var input_1 = require('../input/input');
exports.moduleName = 'rl.ui.components.textbox';
exports.componentName = 'rlTextbox';
var textbox = input_1.buildInput({
    template: require('./textbox.html'),
    bindings: {
        maxlength: '<?',
    },
});
angular.module(exports.moduleName, [input_1.moduleName])
    .component(exports.componentName, textbox);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGJveC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRleHRib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMERBQTBEO0FBRTFELFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBR25DLHNCQUFzRCxnQkFBZ0IsQ0FBQyxDQUFBO0FBRTFELGtCQUFVLEdBQVcsMEJBQTBCLENBQUM7QUFDaEQscUJBQWEsR0FBVyxXQUFXLENBQUM7QUFFakQsSUFBTSxPQUFPLEdBQThCLGtCQUFVLENBQUM7SUFDckQsUUFBUSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztJQUNuQyxRQUFRLEVBQUU7UUFDVCxTQUFTLEVBQUUsSUFBSTtLQUNmO0NBQ0QsQ0FBQyxDQUFDO0FBRUgsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsa0JBQVcsQ0FBQyxDQUFDO0tBQ3ZDLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDIn0=