// /// <reference path='../../../typings/commonjs.d.ts' />
// /// <reference path='../../../typings/jquery/jquery.d.ts' />
'use strict';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __parentChild = typescript_angular_utilities_1.services.parentChildBehavior;
exports.directiveName = 'rlSimpleCard';
exports.controllerName = 'SimpleCardController';
var SimpleCardController = (function () {
    function SimpleCardController($scope, $element, parentChild) {
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
        if (this.canOpen == null) {
            this.canOpen = true;
        }
        this.listController = $element.controller('rlSimpleCardList');
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
        parentChild.registerChildBehavior(this.childLink, behavior);
        $scope.$watch(function () { return _this.alwaysOpen; }, function (value) {
            if (value) {
                _this.showContent = true;
            }
            else {
                _this.close();
            }
        });
        this.cardType = this.cardType != null ? this.cardType : null;
    }
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
    SimpleCardController.$inject = ['$scope', '$element', __parentChild.serviceName];
    return SimpleCardController;
}());
exports.SimpleCardController = SimpleCardController;
function simpleCard() {
    'use strict';
    return {
        restrict: 'E',
        transclude: {
            'headerSlot': '?rlCardHeader',
            'contentSlot': '?rlCardContent',
            'footerSlot': '?rlCardFooter',
        },
        require: '?^^rlSimpleCardList',
        template: require('./simpleCard.html'),
        controller: exports.controllerName,
        controllerAs: 'card',
        scope: {},
        bindToController: {
            onOpen: '&',
            canOpen: '=?',
            alwaysOpen: '=?',
            childLink: '=?',
            validate: '&',
            save: '&',
            cardType: '@',
        },
    };
}
exports.simpleCard = simpleCard;
//# sourceMappingURL=simpleCard.js.map