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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlQ2FyZExpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaW1wbGVDYXJkTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFHYixJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw2Q0FBeUIsOEJBQThCLENBQUMsQ0FBQTtBQUN4RCxJQUFPLFlBQVksR0FBRyx1Q0FBUSxDQUFDLFVBQVUsQ0FBQztBQUkvQixxQkFBYSxHQUFXLGtCQUFrQixDQUFDO0FBQzNDLHNCQUFjLEdBQVcsMEJBQTBCLENBQUM7QUFXL0Q7SUFLQyxrQ0FBWSxNQUFzQixFQUMvQixNQUFpQyxFQUNqQyxNQUE2QixFQUM3QixpQkFBeUQ7UUFSN0QsaUJBbUNDO1FBMUJDLElBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFpQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFDLEtBQWM7WUFDMUYsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELCtDQUFZLEdBQVosVUFBYSxRQUE2QjtRQUN6QyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV4QyxJQUFJLG1CQUFtQixHQUF1QyxFQUFFLENBQUM7UUFFakUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM1RSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBRXpGLE1BQU0sQ0FBQztZQUNOLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxVQUE0QztnQkFDeEUsVUFBVSxFQUFFLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztJQUNILENBQUM7SUFFRCwyQ0FBUSxHQUFSO1FBQ0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQVksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBOUJNLGdDQUFPLEdBQWEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7SUErQnJGLCtCQUFDO0FBQUQsQ0FBQyxBQW5DRCxJQW1DQztBQW5DWSxnQ0FBd0IsMkJBbUNwQyxDQUFBO0FBRUQ7SUFDQyxZQUFZLENBQUM7SUFDYixNQUFNLENBQUM7UUFDTixRQUFRLEVBQUUsSUFBSTtRQUNkLFVBQVUsRUFBRSxzQkFBYztLQUMxQixDQUFDO0FBQ0gsQ0FBQztBQU5lLHNCQUFjLGlCQU03QixDQUFBIn0=