// /// <reference path='../../../typings/commonjs.d.ts' />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var button_1 = require('../button/button');
exports.moduleName = 'rl.ui.components.buttonLink';
exports.componentName = 'rlButtonLink';
exports.controllerName = 'ButtonLinkController';
var ButtonLinkController = (function (_super) {
    __extends(ButtonLinkController, _super);
    function ButtonLinkController() {
        _super.call(this);
        this.target = this.newTab ? '_blank' : '_self';
    }
    return ButtonLinkController;
}(button_1.ButtonController));
exports.ButtonLinkController = ButtonLinkController;
var buttonLink = button_1.buildButton({
    template: require('./buttonLink.html'),
    bindings: {
        link: '@',
        newTab: '<?',
        action: null,
    },
    controller: exports.controllerName,
});
angular.module(exports.moduleName, [])
    .component(exports.componentName, buttonLink)
    .controller(exports.controllerName, ButtonLinkController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uTGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1dHRvbkxpbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMERBQTBEOzs7Ozs7O0FBRTFELElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLHVCQUE4QyxrQkFBa0IsQ0FBQyxDQUFBO0FBRXBELGtCQUFVLEdBQVcsNkJBQTZCLENBQUM7QUFDbkQscUJBQWEsR0FBVyxjQUFjLENBQUM7QUFDdkMsc0JBQWMsR0FBVyxzQkFBc0IsQ0FBQztBQUU3RDtJQUEwQyx3Q0FBZ0I7SUFPekQ7UUFDQyxpQkFBTyxDQUFDO1FBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDaEQsQ0FBQztJQUNGLDJCQUFDO0FBQUQsQ0FBQyxBQVhELENBQTBDLHlCQUFnQixHQVd6RDtBQVhZLDRCQUFvQix1QkFXaEMsQ0FBQTtBQUVELElBQU0sVUFBVSxHQUE4QixvQkFBVyxDQUFDO0lBQ3pELFFBQVEsRUFBRSxPQUFPLENBQUMsbUJBQW1CLENBQUM7SUFDdEMsUUFBUSxFQUFFO1FBQ1QsSUFBSSxFQUFFLEdBQUc7UUFDVCxNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxJQUFJO0tBQ1o7SUFDRCxVQUFVLEVBQUUsc0JBQWM7Q0FDMUIsQ0FBQyxDQUFDO0FBRUgsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxVQUFVLENBQUM7S0FDcEMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyJ9