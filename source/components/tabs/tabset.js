// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __array = typescript_angular_utilities_1.services.array;
exports.componentName = 'rlTabset';
exports.controllerName = 'rlTabsetController';
var TabsetController = (function () {
    function TabsetController($element) {
        this.$element = $element;
        this.tabHeaders = [];
    }
    TabsetController.prototype.registerTab = function (element, header) {
        var index = this.findPosition(element);
        if (__array.arrayUtility.has(this.tabHeaders, index)) {
            header.isVisible = this.tabHeaders[index].isVisible;
        }
        else {
            header.isVisible = (index === 0);
        }
        this.tabHeaders[index] = header;
    };
    TabsetController.prototype.select = function (tab) {
        _.each(this.tabHeaders, function (otherTab) {
            otherTab.isVisible = false;
        });
        tab.isVisible = true;
    };
    TabsetController.prototype.findPosition = function (tabElement) {
        // find the position of the specified element by iterating over the tabs and finding a matching element
        var tabs = this.$element.find('rl-tab');
        var num;
        _.each(tabs, function (elem, index) {
            if (tabElement[0] === elem) {
                num = index;
                return false;
            }
        });
        return num;
    };
    TabsetController.$inject = ['$element'];
    return TabsetController;
}());
exports.TabsetController = TabsetController;
exports.tabset = {
    transclude: true,
    template: require('./tabset.html'),
    controller: exports.controllerName,
    controllerAs: 'tabset',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFic2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBEQUEwRDtBQUUxRCxZQUFZLENBQUM7QUFHYixJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw2Q0FBeUIsOEJBQThCLENBQUMsQ0FBQTtBQUN4RCxJQUFPLE9BQU8sR0FBRyx1Q0FBUSxDQUFDLEtBQUssQ0FBQztBQUVyQixxQkFBYSxHQUFXLFVBQVUsQ0FBQztBQUNuQyxzQkFBYyxHQUFXLG9CQUFvQixDQUFDO0FBUXpEO0lBdUJDLDBCQUFvQixRQUFrQztRQUFsQyxhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQXRCdEQsZUFBVSxHQUFpQixFQUFFLENBQUM7SUFzQjJCLENBQUM7SUFwQjFELHNDQUFXLEdBQVgsVUFBWSxPQUE0QixFQUFFLE1BQWtCO1FBQzNELElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFL0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNyRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUNqQyxDQUFDO0lBRUQsaUNBQU0sR0FBTixVQUFPLEdBQWU7UUFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQUMsUUFBb0I7WUFDNUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBS0QsdUNBQVksR0FBWixVQUFhLFVBQStCO1FBQzNDLHVHQUF1RztRQUN2RyxJQUFJLElBQUksR0FBd0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0QsSUFBSSxHQUFXLENBQUM7UUFDaEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQyxJQUFhLEVBQUUsS0FBYTtZQUN6QyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsR0FBRyxHQUFHLEtBQUssQ0FBQztnQkFDWixNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2QsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFkTSx3QkFBTyxHQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7SUFlekMsdUJBQUM7QUFBRCxDQUFDLEFBckNELElBcUNDO0FBckNZLHdCQUFnQixtQkFxQzVCLENBQUE7QUFFVSxjQUFNLEdBQXlCO0lBQ3pDLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFFBQVEsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDO0lBQ2xDLFVBQVUsRUFBRSxzQkFBYztJQUMxQixZQUFZLEVBQUUsUUFBUTtDQUN0QixDQUFDIn0=