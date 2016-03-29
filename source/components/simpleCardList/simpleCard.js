// /// <reference path='../../../typings/commonjs.d.ts' />
// /// <reference path='../../../typings/jquery/jquery.d.ts' />
'use strict';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __parentChild = typescript_angular_utilities_1.services.parentChildBehavior;
exports.componentName = 'rlSimpleCard';
exports.controllerName = 'SimpleCardController';
var SimpleCardController = (function () {
    function SimpleCardController($scope, parentChild) {
        var _this = this;
        this.$scope = $scope;
        this.parentChild = parentChild;
        this.showContent = false;
        this.autosaveLink = {};
        this.close = function () {
            if (_this.showContent === false || _this.alwaysOpen) {
                return true;
            }
            return _this.autosave();
        };
    }
    SimpleCardController.prototype.$onInit = function () {
        var _this = this;
        if (this.canOpen == null) {
            this.canOpen = true;
        }
        if (this.listController == null) {
            this.listController = this.noList();
        }
        var behavior = {
            autosave: this.autosave.bind(this),
            close: this.close,
            setAlwaysOpen: function (value) {
                _this.alwaysOpen = value;
            },
        };
        this.listController.registerCard(behavior);
        this.parentChild.registerChildBehavior(this.childLink, behavior);
        this.$scope.$watch(function () { return _this.alwaysOpen; }, function (value) {
            if (value) {
                _this.showContent = true;
            }
            else {
                _this.close();
            }
        });
    };
    SimpleCardController.prototype.toggleContent = function () {
        if (this.showContent) {
            this.close();
        }
        else {
            this.open();
        }
    };
    SimpleCardController.prototype.open = function () {
        if (this.canOpen && this.listController.openCard()) {
            this.showContent = true;
            this.onOpen();
        }
    };
    SimpleCardController.prototype.autosave = function () {
        var _this = this;
        return this.parentChild.triggerChildBehavior(this.autosaveLink, function (behavior) {
            var canClose = behavior.autosave();
            if (canClose) {
                _this.showContent = false;
            }
            return canClose;
        });
    };
    SimpleCardController.prototype.noList = function () {
        return {
            openCard: function () {
                return true;
            },
            registerCard: function (behavior) {
                return null;
            },
        };
    };
    SimpleCardController.$inject = ['$scope', __parentChild.serviceName];
    return SimpleCardController;
}());
exports.SimpleCardController = SimpleCardController;
exports.simpleCard = {
    transclude: {
        'headerSlot': '?rlCardHeader',
        'contentSlot': '?rlCardContent',
        'footerSlot': '?rlCardFooter',
    },
    require: { listController: '?^^rlSimpleCardList' },
    template: require('./simpleCard.html'),
    controller: exports.controllerName,
    controllerAs: 'card',
    bindings: {
        onOpen: '&',
        canOpen: '=?',
        alwaysOpen: '=?',
        childLink: '=?',
        save: '&',
        saveWhenInvalid: '<?',
        cardType: '@',
    },
};
//# sourceMappingURL=simpleCard.js.map