"use strict";
var angular = require('angular');
var textComponent = {
    transclude: true,
    template: '<span>{{$ctrl.text}}</span>',
    controller: TextController,
};
var TextController = (function () {
    function TextController($transclude) {
        this.$transclude = $transclude;
    }
    TextController.prototype.$onInit = function () {
        var _this = this;
        this.$transclude(function (content) {
            _this.text = angular.element('<div></div>').append(content).html();
        });
    };
    TextController.$inject = ['$transclude'];
    return TextController;
}());
angular.module('app')
    .component('tsText', textComponent);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLElBQU0sYUFBYSxHQUE4QjtJQUNoRCxVQUFVLEVBQUUsSUFBSTtJQUNoQixRQUFRLEVBQUUsNkJBQTZCO0lBQ3ZDLFVBQVUsRUFBRSxjQUFjO0NBQzFCLENBQUM7QUFFRjtJQUlDLHdCQUFvQixXQUF3QztRQUF4QyxnQkFBVyxHQUFYLFdBQVcsQ0FBNkI7SUFBSSxDQUFDO0lBRWpFLGdDQUFPLEdBQVA7UUFBQSxpQkFJQztRQUhBLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBQyxPQUFlO1lBQ2hDLEtBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkUsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBUE0sc0JBQU8sR0FBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBUTVDLHFCQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUNuQixTQUFTLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDIn0=