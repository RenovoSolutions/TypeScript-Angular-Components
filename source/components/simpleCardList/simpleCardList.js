'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlQ2FyZExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaW1wbGVDYXJkTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFHYixJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUM1QixxQkFBc0MsTUFBTSxDQUFDLENBQUE7QUFJbEMscUJBQWEsR0FBVyxrQkFBa0IsQ0FBQztBQUMzQyxzQkFBYyxHQUFXLDBCQUEwQixDQUFDO0FBWS9EO0lBUUMsa0NBQVksTUFBc0IsRUFDL0IsTUFBaUMsRUFDakMsTUFBNkI7UUFMaEMsVUFBSyxHQUEwQixFQUFFLENBQUM7UUFNakMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksY0FBTyxFQUFXLENBQUM7UUFDaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFpQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFOUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsK0NBQVksR0FBWixVQUFhLFFBQTZCO1FBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCwyQ0FBUSxHQUFSO1FBQ0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFDLElBQXlCLElBQWMsT0FBQSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQVosQ0FBWSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVELG1EQUFnQixHQUFoQixVQUFpQixLQUFjO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQXJCTSxnQ0FBTyxHQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQXNCM0QsK0JBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDO0FBN0JZLGdDQUF3QiwyQkE2QnBDLENBQUE7QUFFRDtJQUNDLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFFBQVEsRUFBRSxJQUFJO1FBQ2QsVUFBVSxFQUFFLHNCQUFjO0tBQzFCLENBQUM7QUFDSCxDQUFDO0FBTmUsc0JBQWMsaUJBTTdCLENBQUEifQ==