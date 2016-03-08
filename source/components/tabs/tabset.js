// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var _ = require('lodash');
exports.directiveName = 'rlTabset';
exports.controllerName = 'rlTabsetController';
var TabsetController = (function () {
    function TabsetController() {
        this.tabHeaders = [];
    }
    TabsetController.prototype.registerTab = function (element, header) {
        var index = this.findPosition(element);
        if (_.has(this.tabHeaders, index)) {
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
    return TabsetController;
}());
exports.TabsetController = TabsetController;
function tabset() {
    return {
        restrict: 'E',
        transclude: true,
        template: require('./tabset.html'),
        controller: exports.controllerName,
        controllerAs: 'tabset',
        scope: {},
        link: {
            pre: function (scope, element, attrs, tabset) {
                tabset.findPosition = function (tabElement) {
                    // find the position of the specified element by iterating over the tabs and finding a matching element
                    var tabs = element.find('rl-tab');
                    var num;
                    _.each(tabs, function (elem, index) {
                        if (tabElement[0] === elem) {
                            num = index;
                            return false;
                        }
                    });
                    return num;
                };
            },
        },
    };
}
exports.tabset = tabset;
//# sourceMappingURL=tabset.js.map