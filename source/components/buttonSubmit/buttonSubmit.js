// /// <reference path='../../../typings/commonjs.d.ts' />
"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uU3VibWl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uU3VibWl0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBEQUEwRDs7QUFFMUQsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsdUJBQTRCLGtCQUFrQixDQUFDLENBQUE7QUFFbEMsa0JBQVUsR0FBVywrQkFBK0IsQ0FBQztBQUNyRCxxQkFBYSxHQUFXLGdCQUFnQixDQUFDO0FBRXRELElBQU0sWUFBWSxHQUE4QixvQkFBVyxDQUFDO0lBQzFELFFBQVEsRUFBRSxPQUFPLENBQUMscUJBQXFCLENBQUM7SUFDeEMsUUFBUSxFQUFFO1FBQ1QsWUFBWSxFQUFFLElBQUk7UUFDbEIsTUFBTSxFQUFFLElBQUk7UUFDWixNQUFNLEVBQUUsSUFBSTtLQUNaO0NBQ0QsQ0FBQyxDQUFDO0FBRUosT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQyJ9