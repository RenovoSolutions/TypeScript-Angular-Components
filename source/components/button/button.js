// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.button';
exports.componentName = 'rlButton';
exports.controllerName = 'ButtonController';
var ButtonController = (function () {
    function ButtonController() {
        this.type = this.type != null ? this.type : 'default';
        this.configuredSize = this.size != null ? 'btn-' + this.size : null;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBEQUEwRDtBQUUxRCxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUV4QixrQkFBVSxHQUFXLHlCQUF5QixDQUFDO0FBQy9DLHFCQUFhLEdBQVcsVUFBVSxDQUFDO0FBQ25DLHNCQUFjLEdBQVcsa0JBQWtCLENBQUM7QUFXdkQ7SUFTQztRQUNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckUsQ0FBQztJQUNGLHVCQUFDO0FBQUQsQ0FBQyxBQWJELElBYUM7QUFiWSx3QkFBZ0IsbUJBYTVCLENBQUE7QUFFRCxJQUFJLE1BQU0sR0FBOEI7SUFDdkMsVUFBVSxFQUFFLElBQUk7SUFDaEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUM7SUFDbEMsUUFBUSxFQUFFO1FBQ1QsTUFBTSxFQUFFLEdBQUc7UUFDWCxJQUFJLEVBQUUsR0FBRztRQUNULFVBQVUsRUFBRSxJQUFJO1FBQ2hCLElBQUksRUFBRSxHQUFHO0tBQ1Q7SUFDRCxVQUFVLEVBQUUsc0JBQWM7SUFDMUIsWUFBWSxFQUFFLFFBQVE7Q0FDdEIsQ0FBQztBQUVGLHFCQUE0QixPQUF1QjtJQUNsRCxJQUFJLEtBQUssR0FBUSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUNoQyxLQUFLLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztJQUN0RixLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDbEMsS0FBSyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUM7SUFDMUQsS0FBSyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUM7SUFDaEUsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBQyxPQUFZLEVBQUUsR0FBVztRQUNoRCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyQixPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsQ0FBQztJQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNkLENBQUM7QUFkZSxtQkFBVyxjQWMxQixDQUFBO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxNQUFNLENBQUM7S0FDaEMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyJ9