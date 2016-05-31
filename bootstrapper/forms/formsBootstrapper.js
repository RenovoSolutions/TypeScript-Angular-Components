"use strict";
var angular = require('angular');
exports.moduleName = 'FormTestModule';
var FormTestController = (function () {
    function FormTestController($q, $timeout) {
        this.$q = $q;
        this.$timeout = $timeout;
    }
    FormTestController.prototype.$onInit = function () {
        var _this = this;
        this.validator = {
            validate: function () { return _this.text === 'valid'; },
            errorMessage: 'String must be valid',
        };
    };
    FormTestController.prototype.submit = function () {
        return this.$timeout(function () { return console.log('Submitted'); }, 1000);
    };
    FormTestController.prototype.save = function () {
        this.count++;
        return this.$q.when();
    };
    FormTestController.$inject = ['$q', '$timeout'];
    return FormTestController;
}());
FormRoute.$inject = ['$stateProvider'];
function FormRoute($stateProvider) {
    $stateProvider
        .state('forms', {
        url: '/forms',
        template: require('./forms.html'),
        controller: 'FormTestController',
        controllerAs: 'forms',
    });
}
angular.module(exports.moduleName, [])
    .controller('FormTestController', FormTestController)
    .config(FormRoute);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXNCb290c3RyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmb3Jtc0Jvb3RzdHJhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFLdEIsa0JBQVUsR0FBVyxnQkFBZ0IsQ0FBQztBQUVuRDtJQU1DLDRCQUFvQixFQUFxQixFQUFVLFFBQWlDO1FBQWhFLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7SUFBRyxDQUFDO0lBRXhGLG9DQUFPLEdBQVA7UUFBQSxpQkFLQztRQUpBLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDaEIsUUFBUSxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBckIsQ0FBcUI7WUFDckMsWUFBWSxFQUFFLHNCQUFzQjtTQUNwQyxDQUFDO0lBQ0gsQ0FBQztJQUVELG1DQUFNLEdBQU47UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFZLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBeEIsQ0FBd0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsaUNBQUksR0FBSjtRQUNDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFqQk0sMEJBQU8sR0FBYSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQWtCL0MseUJBQUM7QUFBRCxDQUFDLEFBdkJELElBdUJDO0FBRUQsU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDdkMsbUJBQW1CLGNBQWM7SUFDaEMsY0FBYztTQUNaLEtBQUssQ0FBQyxPQUFPLEVBQUU7UUFDZixHQUFHLEVBQUUsUUFBUTtRQUNiLFFBQVEsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDO1FBQ2pDLFVBQVUsRUFBRSxvQkFBb0I7UUFDaEMsWUFBWSxFQUFFLE9BQU87S0FDckIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsVUFBVSxDQUFDLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDO0tBQ3BELE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyJ9