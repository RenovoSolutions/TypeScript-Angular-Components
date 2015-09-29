'use strict';
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __observable = typescript_angular_utilities_1.services.observable;
exports.directiveName = 'rlSimpleCardList';
exports.controllerName = 'SimpleCardListController';
var SimpleCardListController = (function () {
    function SimpleCardListController(observableFactory) {
        this.observable = observableFactory.getInstance();
    }
    SimpleCardListController.prototype.registerCard = function (behavior) {
        return this.observable.register(behavior.close, 'close');
    };
    SimpleCardListController.prototype.openCard = function () {
        return _.all(this.observable.fire('close'));
    };
    SimpleCardListController.$inject = [__observable.factoryName];
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