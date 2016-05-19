// /// <reference path='../../../typings/commonjs.d.ts' />
"use strict";
var _ = require('lodash');
var angular = require('angular');
exports.moduleName = 'rl.ui.components.button';
exports.componentName = 'rlButton';
exports.controllerName = 'ButtonController';
var ButtonController = (function () {
    function ButtonController() {
        this.type = this.type != null ? this.type : 'default';
        this.configuredSize = this.size != null && this.size !== '' ? 'btn-' + this.size : null;
    }
    Object.defineProperty(ButtonController.prototype, "types", {
        get: function () {
            var typesList = this.type.split(' ');
            typesList.forEach(function (type, index) {
                //the for each for places that used btn-block for example in the type attribute do not break
                if (type.indexOf('btn-') === -1) {
                    type = 'btn-' + type;
                }
                typesList[index] = type;
            });
            return typesList.join(' ');
        },
        enumerable: true,
        configurable: true
    });
    return ButtonController;
}());
exports.ButtonController = ButtonController;
var button = {
    transclude: true,
    template: require('./button.html'),
    bindings: {
        action: '&',
        type: '@',
        ngDisabled: '<?',
        size: '@',
    },
    controller: exports.controllerName,
    controllerAs: 'button',
};
function buildButton(options) {
    var clone = _.clone(button);
    clone.require = options.require;
    clone.transclude = options.transclude != null ? options.transclude : clone.transclude;
    clone.template = options.template;
    clone.controller = options.controller || clone.controller;
    clone.controllerAs = options.controllerAs || clone.controllerAs;
    clone.bindings = _.assign({}, clone.bindings, options.bindings);
    _.each(clone.bindings, function (binding, key) {
        if (binding == null) {
            delete clone.bindings[key];
        }
    });
    return clone;
}
exports.buildButton = buildButton;
angular.module(exports.moduleName, [])
    .component(exports.componentName, button)
    .controller(exports.controllerName, ButtonController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBEQUEwRDs7QUFFMUQsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDNUIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFdEIsa0JBQVUsR0FBVyx5QkFBeUIsQ0FBQztBQUMvQyxxQkFBYSxHQUFXLFVBQVUsQ0FBQztBQUNuQyxzQkFBYyxHQUFXLGtCQUFrQixDQUFDO0FBV3pEO0lBcUJDO1FBQ0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0RCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUN6RixDQUFDO0lBZkQsc0JBQUksbUNBQUs7YUFBVDtZQUNDLElBQUksU0FBUyxHQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9DLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFZLEVBQUUsS0FBYTtnQkFDN0MsNEZBQTRGO2dCQUM1RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakMsSUFBSSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLENBQUM7Z0JBQ0QsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBTUYsdUJBQUM7QUFBRCxDQUFDLEFBekJELElBeUJDO0FBekJZLHdCQUFnQixtQkF5QjVCLENBQUE7QUFFRCxJQUFNLE1BQU0sR0FBOEI7SUFDekMsVUFBVSxFQUFFLElBQUk7SUFDaEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUM7SUFDbEMsUUFBUSxFQUFFO1FBQ1QsTUFBTSxFQUFFLEdBQUc7UUFDWCxJQUFJLEVBQUUsR0FBRztRQUNULFVBQVUsRUFBRSxJQUFJO1FBQ2hCLElBQUksRUFBRSxHQUFHO0tBQ1Q7SUFDRCxVQUFVLEVBQUUsc0JBQWM7SUFDMUIsWUFBWSxFQUFFLFFBQVE7Q0FDdEIsQ0FBQztBQUdGLHFCQUE0QixPQUF1QjtJQUNsRCxJQUFNLEtBQUssR0FBUSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUNoQyxLQUFLLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztJQUN0RixLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDbEMsS0FBSyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUM7SUFDMUQsS0FBSyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUM7SUFDaEUsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBQyxPQUFZLEVBQUUsR0FBVztRQUNoRCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyQixPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsQ0FBQztJQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNkLENBQUM7QUFkZSxtQkFBVyxjQWMxQixDQUFBO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxNQUFNLENBQUM7S0FDaEMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyJ9