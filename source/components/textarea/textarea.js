// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var input_1 = require('../input/input');
exports.moduleName = 'rl.ui.components.textarea';
exports.componentName = 'rlTextarea';
var textarea = input_1.buildInput({
    template: require('./textarea.html'),
    bindings: {
        rows: '<?',
        ngDisabled: '<?',
        maxlength: '<?',
    },
});
angular.module(exports.moduleName, [input_1.moduleName])
    .component(exports.componentName, textarea);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXh0YXJlYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwREFBMEQ7QUFFMUQsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsc0JBQXNELGdCQUFnQixDQUFDLENBQUE7QUFFMUQsa0JBQVUsR0FBVywyQkFBMkIsQ0FBQztBQUNqRCxxQkFBYSxHQUFXLFlBQVksQ0FBQztBQUVsRCxJQUFNLFFBQVEsR0FBOEIsa0JBQVUsQ0FBQztJQUN0RCxRQUFRLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0lBQ3BDLFFBQVEsRUFBRTtRQUNULElBQUksRUFBRSxJQUFJO1FBQ1YsVUFBVSxFQUFFLElBQUk7UUFDaEIsU0FBUyxFQUFFLElBQUk7S0FDZjtDQUNELENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLGtCQUFXLENBQUMsQ0FBQztLQUN2QyxTQUFTLENBQUMscUJBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQyJ9