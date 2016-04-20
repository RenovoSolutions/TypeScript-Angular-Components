// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uTGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1dHRvbkxpbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMERBQTBEO0FBRTFELFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsdUJBQThDLGtCQUFrQixDQUFDLENBQUE7QUFFcEQsa0JBQVUsR0FBVyw2QkFBNkIsQ0FBQztBQUNuRCxxQkFBYSxHQUFXLGNBQWMsQ0FBQztBQUN2QyxzQkFBYyxHQUFXLHNCQUFzQixDQUFDO0FBRTdEO0lBQTBDLHdDQUFnQjtJQU96RDtRQUNDLGlCQUFPLENBQUM7UUFDUixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUNoRCxDQUFDO0lBQ0YsMkJBQUM7QUFBRCxDQUFDLEFBWEQsQ0FBMEMseUJBQWdCLEdBV3pEO0FBWFksNEJBQW9CLHVCQVdoQyxDQUFBO0FBRUQsSUFBTSxVQUFVLEdBQThCLG9CQUFXLENBQUM7SUFDekQsUUFBUSxFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztJQUN0QyxRQUFRLEVBQUU7UUFDVCxJQUFJLEVBQUUsR0FBRztRQUNULE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLElBQUk7S0FDWjtJQUNELFVBQVUsRUFBRSxzQkFBYztDQUMxQixDQUFDLENBQUM7QUFFSCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLFVBQVUsQ0FBQztLQUNwQyxVQUFVLENBQUMsc0JBQWMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDIn0=