"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFMaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tbWFMaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw2Q0FBb0MsOEJBQThCLENBQUMsQ0FBQTtBQUduRSxJQUFPLFdBQVcsR0FBRyx1Q0FBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7QUFFdkMsa0JBQVUsR0FBVyw0QkFBNEIsQ0FBQztBQUNsRCxxQkFBYSxHQUFXLGFBQWEsQ0FBQztBQUN0QyxzQkFBYyxHQUFXLHFCQUFxQixDQUFDO0FBRTFEO0lBUUMsNkJBQVksTUFBK0I7UUFIM0MsbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFJMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU8sMkNBQWEsR0FBckIsVUFBc0IsSUFBVztRQUFqQyxpQkFpQkM7UUFoQkEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFDLElBQVM7Z0JBQzVCLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO1FBQUEsQ0FBQztRQUVGLElBQUksT0FBYyxDQUFDO1FBRW5CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QixPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWpDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzlDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUF0Qk0sMkJBQU8sR0FBYSxDQUFDLHdDQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQXVCMUQsMEJBQUM7QUFBRCxDQUFDLEFBOUJELElBOEJDO0FBOUJZLDJCQUFtQixzQkE4Qi9CLENBQUE7QUFFRCxJQUFJLFNBQVMsR0FBOEI7SUFDMUMsUUFBUSxFQUFFLDBSQU9UO0lBQ0QsVUFBVSxFQUFFLHNCQUFjO0lBQzFCLFlBQVksRUFBRSxXQUFXO0lBQ3pCLFFBQVEsRUFBRTtRQUNULE1BQU0sRUFBRSxPQUFPO1FBQ2YsR0FBRyxFQUFFLElBQUk7UUFDVCxTQUFTLEVBQUUsSUFBSTtLQUNmO0NBQ0QsQ0FBQztBQUVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLHdDQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDaEQsU0FBUyxDQUFDLHFCQUFhLEVBQUUsU0FBUyxDQUFDO0tBQ25DLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLG1CQUFtQixDQUFDLENBQUMifQ==