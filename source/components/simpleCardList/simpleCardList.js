"use strict";
var _ = require('lodash');
var rxjs_1 = require('rxjs');
exports.directiveName = 'rlSimpleCardList';
exports.controllerName = 'SimpleCardListController';
var SimpleCardListController = (function () {
    function SimpleCardListController($scope, $attrs, $parse) {
        this.cards = [];
        this.alwaysOpenChanges = new rxjs_1.Subject();
        $scope.$watch(function () { return $parse($attrs.alwaysOpen)($scope); }, this.alwaysOpenChange.bind(this));
        $attrs.$addClass('card-list');
    }
    SimpleCardListController.prototype.registerCard = function (behavior) {
        this.cards.push(behavior);
    };
    SimpleCardListController.prototype.openCard = function () {
        return _.every(this.cards, function (card) { return card.close(); });
    };
    SimpleCardListController.prototype.alwaysOpenChange = function (value) {
        this.alwaysOpen = value;
        this.alwaysOpenChanges.next(value);
    };
    SimpleCardListController.$inject = ['$scope', '$attrs', '$parse'];
    return SimpleCardListController;
}());
exports.SimpleCardListController = SimpleCardListController;
function simpleCardList() {
    'use strict';
    return {
        restrict: 'AE',
        controller: exports.controllerName,
    };
}
exports.simpleCardList = simpleCardList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlQ2FyZExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaW1wbGVDYXJkTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDNUIscUJBQXNDLE1BQU0sQ0FBQyxDQUFBO0FBSWxDLHFCQUFhLEdBQVcsa0JBQWtCLENBQUM7QUFDM0Msc0JBQWMsR0FBVywwQkFBMEIsQ0FBQztBQVkvRDtJQVFDLGtDQUFZLE1BQXNCLEVBQy9CLE1BQWlDLEVBQ2pDLE1BQTZCO1FBTGhDLFVBQUssR0FBMEIsRUFBRSxDQUFDO1FBTWpDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGNBQU8sRUFBVyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBaUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTlHLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELCtDQUFZLEdBQVosVUFBYSxRQUE2QjtRQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsMkNBQVEsR0FBUjtRQUNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUF5QixJQUFjLE9BQUEsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFaLENBQVksQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCxtREFBZ0IsR0FBaEIsVUFBaUIsS0FBYztRQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFyQk0sZ0NBQU8sR0FBYSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFzQjNELCtCQUFDO0FBQUQsQ0FBQyxBQTdCRCxJQTZCQztBQTdCWSxnQ0FBd0IsMkJBNkJwQyxDQUFBO0FBRUQ7SUFDQyxZQUFZLENBQUM7SUFDYixNQUFNLENBQUM7UUFDTixRQUFRLEVBQUUsSUFBSTtRQUNkLFVBQVUsRUFBRSxzQkFBYztLQUMxQixDQUFDO0FBQ0gsQ0FBQztBQU5lLHNCQUFjLGlCQU03QixDQUFBIn0=