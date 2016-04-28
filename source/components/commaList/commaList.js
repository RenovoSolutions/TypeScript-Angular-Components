'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __transform = typescript_angular_utilities_1.services.transform.transform;
exports.moduleName = 'rl.ui.components.commaList';
exports.componentName = 'rlCommaList';
exports.controllerName = 'CommaListController';
var CommaListController = (function () {
    function CommaListController(object) {
        this.remainingItems = 0;
        this.list = this.getFirstItems(this.inList);
    }
    CommaListController.prototype.getFirstItems = function (list) {
        var _this = this;
        if (this.transform != null) {
            list = _.map(list, function (item) {
                return __transform.getValue(item, _this.transform);
            });
        }
        ;
        var newList;
        if (this.max != null) {
            newList = _.take(list, this.max);
            this.remainingItems = list.length - this.max;
        }
        else {
            newList = _.clone(list);
        }
        return newList;
    };
    CommaListController.$inject = [typescript_angular_utilities_1.downgrade.objectServiceName];
    return CommaListController;
}());
exports.CommaListController = CommaListController;
var commaList = {
    template: "\n\t\t<span>\n\t\t\t<span ng-repeat=\"item in commaList.list track by $index\">\n\t\t\t\t<span>{{item}}</span><span ng-hide=\"$last\">, </span>\n\t\t\t</span>\n\t\t\t<span ng-show=\"commaList.remainingItems > 0\">... {{commaList.remainingItems}} more items</span>\n\t\t</span>\n\t",
    controller: exports.controllerName,
    controllerAs: 'commaList',
    bindings: {
        inList: '<list',
        max: '<?',
        transform: '<?',
    },
};
angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName])
    .component(exports.componentName, commaList)
    .controller(exports.controllerName, CommaListController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFMaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tbWFMaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUFvQyw4QkFBOEIsQ0FBQyxDQUFBO0FBR25FLElBQU8sV0FBVyxHQUFHLHVDQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUV2QyxrQkFBVSxHQUFXLDRCQUE0QixDQUFDO0FBQ2xELHFCQUFhLEdBQVcsYUFBYSxDQUFDO0FBQ3RDLHNCQUFjLEdBQVcscUJBQXFCLENBQUM7QUFFMUQ7SUFRQyw2QkFBWSxNQUErQjtRQUgzQyxtQkFBYyxHQUFXLENBQUMsQ0FBQztRQUkxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTywyQ0FBYSxHQUFyQixVQUFzQixJQUFXO1FBQWpDLGlCQWlCQztRQWhCQSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQUMsSUFBUztnQkFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRCxDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7UUFBQSxDQUFDO1FBRUYsSUFBSSxPQUFjLENBQUM7UUFFbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDOUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDaEIsQ0FBQztJQXRCTSwyQkFBTyxHQUFhLENBQUMsd0NBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBdUIxRCwwQkFBQztBQUFELENBQUMsQUE5QkQsSUE4QkM7QUE5QlksMkJBQW1CLHNCQThCL0IsQ0FBQTtBQUVELElBQUksU0FBUyxHQUE4QjtJQUMxQyxRQUFRLEVBQUUsMFJBT1Q7SUFDRCxVQUFVLEVBQUUsc0JBQWM7SUFDMUIsWUFBWSxFQUFFLFdBQVc7SUFDekIsUUFBUSxFQUFFO1FBQ1QsTUFBTSxFQUFFLE9BQU87UUFDZixHQUFHLEVBQUUsSUFBSTtRQUNULFNBQVMsRUFBRSxJQUFJO0tBQ2Y7Q0FDRCxDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsd0NBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNoRCxTQUFTLENBQUMscUJBQWEsRUFBRSxTQUFTLENBQUM7S0FDbkMsVUFBVSxDQUFDLHNCQUFjLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyJ9