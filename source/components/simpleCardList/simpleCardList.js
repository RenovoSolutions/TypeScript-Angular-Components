'use strict';
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __observable = typescript_angular_utilities_1.services.observable;
exports.directiveName = 'rlSimpleCardList';
exports.controllerName = 'SimpleCardListController';
var SimpleCardListController = (function () {
    function SimpleCardListController($scope, $attrs, $parse, observableFactory) {
        var _this = this;
        this.observable = observableFactory.getInstance();
        $scope.$watch(function () { return $parse($attrs.alwaysOpen)($scope); }, function (value) {
            _this.alwaysOpen = value;
            _this.observable.fire('alwaysOpen', value);
        });
    }
    SimpleCardListController.prototype.registerCard = function (behavior) {
        behavior.setAlwaysOpen(this.alwaysOpen);
        var unregisterFunctions = [];
        unregisterFunctions.push(this.observable.register(behavior.close, 'close'));
        unregisterFunctions.push(this.observable.register(behavior.setAlwaysOpen, 'alwaysOpen'));
        return function () {
            _.each(unregisterFunctions, function (unregister) {
                unregister();
            });
        };
    };
    SimpleCardListController.prototype.openCard = function () {
        return _.every(this.observable.fire('close'));
    };
    SimpleCardListController.$inject = ['$scope', '$attrs', '$parse', __observable.factoryName];
    return SimpleCardListController;
})();
exports.SimpleCardListController = SimpleCardListController;
function simpleCardList() {
    'use strict';
    return {
        restrict: 'AE',
        controller: exports.controllerName,
    };
}
exports.simpleCardList = simpleCardList;
//# sourceMappingURL=simpleCardList.js.map