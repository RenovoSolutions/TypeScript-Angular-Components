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
})();
exports.SimpleCardController = SimpleCardController;
function simpleCard() {
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        require: '?^^rlSimpleCardList',
        template: "\n\t\t\t<div class=\"card col-xs-12\">\n\t\t\t\t<div class=\"header row\" ng-class=\"{ 'active': card.canOpen && !card.alwaysOpen }\" ng-click=\"card.toggleContent()\">\n\t\t\t\t\t<div class=\"header-template\"></div>\n\t\t\t\t\t<div class=\"clearfix\"></div>\n\t\t\t\t</div>\n\n\t\t\t\t<ng-form rl-autosave=\"card.autosaveLink\" validate=\"card.validate()\" save=\"card.save()\">\n\t\t\t\t\t<div ng-show=\"card.showContent || card.alwaysOpen\">\n\t\t\t\t\t\t<div class=\"body row\">\n\t\t\t\t\t\t\t<div class=\"content-template\"></div>\n\t\t\t\t\t\t\t<div class=\"clearfix\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</ng-form>\n\t\t\t\t<div ng-show=\"hasFooter && card.showContent\">\n\t\t\t\t\t<div class=\"footer row\">\n\t\t\t\t\t\t<div class=\"footer-template\"></div>\n\t\t\t\t\t\t<div class=\"clearfix\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t",
        controller: exports.controllerName,
        controllerAs: 'card',
        scope: {},
        bindToController: {
            onOpen: '&',
            canOpen: '=',
            alwaysOpen: '=',
            childLink: '=',
            validate: '&',
            save: '&',
        },
        link: function (scope, element, attrs, controller, transclude) {
            transclude(function (clone) {
                var header = clone.filter('rl-card-header');
                var content = clone.filter('rl-card-content');
                var footer = clone.filter('rl-card-footer');
                var headerArea = element.find('.header-template');
                headerArea.append(header);
                var contentArea = element.find('.content-template');
                contentArea.append(content);
                scope.hasFooter = (footer.length > 0);
                if (scope.hasFooter) {
                    var footerArea = element.find('.footer-template');
                    footerArea.append(footer);
                }
            });
        },
    };
}
exports.simpleCard = simpleCard;
//# sourceMappingURL=simpleCard.js.map