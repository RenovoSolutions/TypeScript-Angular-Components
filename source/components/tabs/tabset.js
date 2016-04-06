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
//# sourceMappingURL=tabset.js.map