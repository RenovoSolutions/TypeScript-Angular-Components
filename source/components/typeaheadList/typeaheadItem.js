// /// <reference path='../../../typings/node/node.d.ts' />
'use strict';
exports.componentName = 'rlTypeaheadListItem';
var TypeaheadItemController = (function () {
    function TypeaheadItemController($scope, $element, $compile) {
        this.$scope = $scope;
        this.$element = $element;
        this.$compile = $compile;
    }
    TypeaheadItemController.prototype.$onInit = function () {
        var itemScope = this.$scope.$parent.$new();
        var contentArea = this.$element.find('.content-target');
        if (this.transclude.isSlotFilled('listItemSlot')) {
            this.transclude(itemScope, function (template) {
                contentArea.append(template);
            }, null, 'listItemSlot');
        }
        else {
            var template = contentArea.append(require('./defaultListItem.html'));
            this.$compile(template)(itemScope);
        }
    };
    TypeaheadItemController.$inject = ['$scope', '$element', '$compile'];
    return TypeaheadItemController;
}());
exports.typeaheadItem = {
    bindings: {
        transclude: '<',
    },
    controller: TypeaheadItemController,
    template: "<div class=\"content-target\"></div>",
};
//# sourceMappingURL=typeaheadItem.js.map