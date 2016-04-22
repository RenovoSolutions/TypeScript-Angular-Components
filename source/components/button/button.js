// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBEQUEwRDtBQUUxRCxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUV0QixrQkFBVSxHQUFXLHlCQUF5QixDQUFDO0FBQy9DLHFCQUFhLEdBQVcsVUFBVSxDQUFDO0FBQ25DLHNCQUFjLEdBQVcsa0JBQWtCLENBQUM7QUFXekQ7SUFxQkM7UUFDQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3pGLENBQUM7SUFmRCxzQkFBSSxtQ0FBSzthQUFUO1lBQ0MsSUFBSSxTQUFTLEdBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0MsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQVksRUFBRSxLQUFhO2dCQUM3Qyw0RkFBNEY7Z0JBQzVGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqQyxJQUFJLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDdEIsQ0FBQztnQkFDRCxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFNRix1QkFBQztBQUFELENBQUMsQUF6QkQsSUF5QkM7QUF6Qlksd0JBQWdCLG1CQXlCNUIsQ0FBQTtBQUVELElBQU0sTUFBTSxHQUE4QjtJQUN6QyxVQUFVLEVBQUUsSUFBSTtJQUNoQixRQUFRLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQztJQUNsQyxRQUFRLEVBQUU7UUFDVCxNQUFNLEVBQUUsR0FBRztRQUNYLElBQUksRUFBRSxHQUFHO1FBQ1QsVUFBVSxFQUFFLElBQUk7UUFDaEIsSUFBSSxFQUFFLEdBQUc7S0FDVDtJQUNELFVBQVUsRUFBRSxzQkFBYztJQUMxQixZQUFZLEVBQUUsUUFBUTtDQUN0QixDQUFDO0FBR0YscUJBQTRCLE9BQXVCO0lBQ2xELElBQU0sS0FBSyxHQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQ2hDLEtBQUssQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO0lBQ3RGLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNsQyxLQUFLLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQztJQUMxRCxLQUFLLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQztJQUNoRSxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxVQUFDLE9BQVksRUFBRSxHQUFXO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixDQUFDO0lBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2QsQ0FBQztBQWRlLG1CQUFXLGNBYzFCLENBQUE7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLE1BQU0sQ0FBQztLQUNoQyxVQUFVLENBQUMsc0JBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDIn0=