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
        $attrs.$addClass('card-list');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlQ2FyZExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaW1wbGVDYXJkTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFHYixJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw2Q0FBeUIsOEJBQThCLENBQUMsQ0FBQTtBQUN4RCxJQUFPLFlBQVksR0FBRyx1Q0FBUSxDQUFDLFVBQVUsQ0FBQztBQUkvQixxQkFBYSxHQUFXLGtCQUFrQixDQUFDO0FBQzNDLHNCQUFjLEdBQVcsMEJBQTBCLENBQUM7QUFXL0Q7SUFLQyxrQ0FBWSxNQUFzQixFQUMvQixNQUFpQyxFQUNqQyxNQUE2QixFQUM3QixpQkFBeUQ7UUFSN0QsaUJBcUNDO1FBNUJDLElBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFpQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFDLEtBQWM7WUFDMUYsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsK0NBQVksR0FBWixVQUFhLFFBQTZCO1FBQ3pDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXhDLElBQUksbUJBQW1CLEdBQXVDLEVBQUUsQ0FBQztRQUVqRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFFekYsTUFBTSxDQUFDO1lBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxVQUFDLFVBQTRDO2dCQUN4RSxVQUFVLEVBQUUsQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDO0lBQ0gsQ0FBQztJQUVELDJDQUFRLEdBQVI7UUFDQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBWSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFoQ00sZ0NBQU8sR0FBYSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQWlDckYsK0JBQUM7QUFBRCxDQUFDLEFBckNELElBcUNDO0FBckNZLGdDQUF3QiwyQkFxQ3BDLENBQUE7QUFFRDtJQUNDLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFFBQVEsRUFBRSxJQUFJO1FBQ2QsVUFBVSxFQUFFLHNCQUFjO0tBQzFCLENBQUM7QUFDSCxDQUFDO0FBTmUsc0JBQWMsaUJBTTdCLENBQUEifQ==