'use strict';
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var breakpoints_module_1 = require('../../services/breakpoints/breakpoints.module');
exports.directiveName = 'rlResponsiveCardGrid';
exports.controllerName = 'ResponsiveCardGridController';
var __observable = typescript_angular_utilities_1.services.observable;
var __numberUtility = typescript_angular_utilities_1.services.number;
var ResponsiveCardGridController = (function () {
    function ResponsiveCardGridController(observableFactory, $q, breakpoints, numberUtility) {
        var _this = this;
        this.$q = $q;
        this.breakpoints = breakpoints;
        this.numberUtility = numberUtility;
        this.emptyCards = [];
        this.behaviors = [];
        this.updateCardEndOfRowStatus = function () {
            _this.observable.fire('updateEndOfRowStatus');
        };
        this.observable = observableFactory.getInstance();
        if (this.startingIndex != null) {
            this.emptyCards = _.range(this.startingIndex);
        }
        breakpoints.register(this.updateCardEndOfRowStatus);
    }
    ResponsiveCardGridController.prototype.registerCard = function (behavior, element) {
        var index = this.findPosition(element);
        index = this.startingIndex != null ? index + this.startingIndex : index;
        var unregisterFunctions = [];
        unregisterFunctions.push(this.observable.register(behavior.autosave, 'autosave'));
        unregisterFunctions.push(this.observable.register(behavior.close, 'close'));
        unregisterFunctions.push(this.observable.register(behavior.hoverOut, 'hoverOut'));
        unregisterFunctions.push(this.observable.register(behavior.updateEndOfRowStatus, 'updateEndOfRowStatus'));
        var indexedBehavior = behavior;
        indexedBehavior.index = index;
        this.behaviors.push(indexedBehavior);
        return function () {
            _.each(unregisterFunctions, function (unregister) {
                unregister();
            });
        };
    };
    ResponsiveCardGridController.prototype.openCard = function (openingCard) {
        if (this.autosaveCard()) {
            _.each(this.getCurrentRow(openingCard.index), function (card) {
                card.open();
            });
        }
    };
    ResponsiveCardGridController.prototype.closeCard = function () {
        this.autosaveCard();
    };
    ResponsiveCardGridController.prototype.autosaveCard = function () {
        var results = this.observable.fire('autosave');
        if (_.all(results)) {
            this.observable.fire('close');
            return true;
        }
        return false;
    };
    ResponsiveCardGridController.prototype.hoverIn = function (currentCard) {
        _.each(this.getCurrentRow(currentCard.index), function (card) {
            card.hoverIn();
        });
    };
    ResponsiveCardGridController.prototype.hoverOut = function () {
        this.observable.fire('hoverOut');
    };
    ResponsiveCardGridController.prototype.cardIsEndOfRow = function (currentCard) {
        return (currentCard.index + 1) % this.cardsPerRow === 0;
    };
    ResponsiveCardGridController.prototype.getCurrentRow = function (index) {
        var _this = this;
        // cache the value of cardsPerRow to avoid cases where the breakpoint updates in the middle of this function
        var cardsPerRow = this.cardsPerRow;
        var currentRow = this.numberUtility.integerDivide(index, cardsPerRow);
        return _.filter(this.behaviors, function (behavior) {
            return currentRow === _this.numberUtility.integerDivide(behavior.index, cardsPerRow);
        });
    };
    Object.defineProperty(ResponsiveCardGridController.prototype, "cardsPerRow", {
        get: function () {
            var currentBreakpoint = this.breakpoints.currentBreakpoint;
            return this.breakpointRowDictionary[currentBreakpoint];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResponsiveCardGridController.prototype, "breakpointRowDictionary", {
        get: function () {
            var list = [];
            list[breakpoints_module_1.xs] = 1;
            list[breakpoints_module_1.sm] = 1;
            list[breakpoints_module_1.md] = 2;
            list[breakpoints_module_1.lg] = 3;
            return list;
        },
        enumerable: true,
        configurable: true
    });
    ResponsiveCardGridController.$inject = [__observable.factoryName, '$q', breakpoints_module_1.breakpointServiceName, __numberUtility.serviceName];
    return ResponsiveCardGridController;
})();
exports.ResponsiveCardGridController = ResponsiveCardGridController;
function responsiveCardGrid() {
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        template: "\n\t\t\t<div>\n\t\t\t\t<div class=\"col-lg-4 col-md-6 col-sm-12 smallCardsList\" ng-repeat=\"emptyCard in grid.emptyCards\" ng-if=\"grid.fillEmptySpace\"></div>\n\t\t\t\t<div ng-transclude></div>\n\t\t\t</div>\n\t\t",
        controller: exports.controllerName,
        controllerAs: 'grid',
        scope: {},
        bindToController: {
            startingIndex: '=',
            fillEmptySpace: '=',
        },
        link: {
            pre: function (scope, element, attrs, grid) {
                grid.findPosition = function (cardElement) {
                    // find the position of the specified element by iterating over the cards and finding a matching element
                    var cards = element.find('rl-responsive-card');
                    var num;
                    cards.each(function (index, elem) {
                        if (cardElement[0] === elem) {
                            num = index;
                            return false;
                        }
                    });
                    return num;
                };
            },
        },
    };
}
exports.responsiveCardGrid = responsiveCardGrid;
//# sourceMappingURL=responsiveCardGrid.js.map