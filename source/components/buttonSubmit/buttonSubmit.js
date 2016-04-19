// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var button_1 = require('../button/button');
exports.moduleName = 'rl.ui.components.buttonSubmit';
exports.componentName = 'rlButtonSubmit';
var buttonSubmit = button_1.buildButton({
    template: require('./buttonSubmit.html'),
    bindings: {
        rightAligned: '<?',
        saving: '<?',
        action: null,
    },
});
angular.module(exports.moduleName, [])
    .component(exports.componentName, buttonSubmit);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uU3VibWl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uU3VibWl0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBEQUEwRDtBQUUxRCxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyx1QkFBNEIsa0JBQWtCLENBQUMsQ0FBQTtBQUVsQyxrQkFBVSxHQUFXLCtCQUErQixDQUFDO0FBQ3JELHFCQUFhLEdBQVcsZ0JBQWdCLENBQUM7QUFFdEQsSUFBTSxZQUFZLEdBQThCLG9CQUFXLENBQUM7SUFDMUQsUUFBUSxFQUFFLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQztJQUN4QyxRQUFRLEVBQUU7UUFDVCxZQUFZLEVBQUUsSUFBSTtRQUNsQixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxJQUFJO0tBQ1o7Q0FDRCxDQUFDLENBQUM7QUFFSixPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDIn0=