"use strict";
var angular = require('angular');
var TabTestController = (function () {
    function TabTestController() {
    }
    TabTestController.prototype.$onInit = function () {
        this.steps = [
            {
                title: 'Step 1',
                subtitle: 'Do something',
                onClick: function () { return console.log('Visited step 1'); },
            },
            {
                title: 'Step 2',
                subtitle: 'Do more work',
                onClick: function () { return console.log('Visited step 2'); },
            },
        ];
    };
    return TabTestController;
}());
angular.module('app')
    .controller('TabTestController', TabTestController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic0Jvb3RzdHJhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYnNCb290c3RyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBSW5DO0lBQUE7SUFpQkEsQ0FBQztJQWRBLG1DQUFPLEdBQVA7UUFDQyxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1o7Z0JBQ0MsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLE9BQU8sRUFBRSxjQUFZLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUE3QixDQUE2QjthQUNsRDtZQUNEO2dCQUNDLEtBQUssRUFBRSxRQUFRO2dCQUNmLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixPQUFPLEVBQUUsY0FBWSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBN0IsQ0FBNkI7YUFDbEQ7U0FDRCxDQUFDO0lBQ0gsQ0FBQztJQUNGLHdCQUFDO0FBQUQsQ0FBQyxBQWpCRCxJQWlCQztBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ25CLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDIn0=