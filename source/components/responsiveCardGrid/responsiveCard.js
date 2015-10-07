'use strict';
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var jquery_service_1 = require('../../services/jquery/jquery.service');
exports.directiveName = 'rlResponsiveCard';
exports.controllerName = 'ResponsiveCardController';
var __parentChildBehavior = typescript_angular_utilities_1.services.parentChildBehavior;
var __promiseUtility = typescript_angular_utilities_1.services.promise;
var ResponsiveCardController = (function () {
    function ResponsiveCardController($scope, $q, $element, parentChildBehavior, promiseUtility) {
        var _this = this;
        this.$scope = $scope;
        this.$q = $q;
        this.$element = $element;
        this.parentChildBehavior = parentChildBehavior;
        this.promiseUtility = promiseUtility;
        this.autosaveLink = { viewData: null };
        // behavior functions
        this.autosave = function () {
            if (_this.showDetails === false) {
                return true;
            }
            var behavior = _this.parentChildBehavior.getChildBehavior(_this.autosaveLink);
            return behavior.autosave();
        };
        this.close = function () {
            _this.showDetails = false;
        };
        this.open = function () {
            _this.showDetails = true;
        };
        this.hoverIn = function () {
            _this.isHovering = true;
        };
        this.hoverOut = function () {
            _this.isHovering = false;
        };
        this.updateEndOfRowStatus = function () {
            _this.isEndOfRow = _this.cardGridController.cardIsEndOfRow(_this.behavior);
        };
        this.behavior = {
            autosave: this.autosave,
            close: this.close,
            open: this.open,
            hoverIn: this.hoverIn,
            hoverOut: this.hoverOut,
            updateEndOfRowStatus: this.updateEndOfRowStatus,
        };
        this.summary = this.header.summary || function () { return ''; };
        this.summaryLength = _.isUndefined(this.header.summaryLength) ? 25 : this.header.summaryLength;
        this.showIcon = this.header.showIcon || function () { return false; };
        this.cardGridController = $element.controller('rlResponsiveCardGrid');
        this.unregister = this.cardGridController.registerCard(this.behavior, $element);
        this.isEndOfRow = this.cardGridController.cardIsEndOfRow(this.behavior);
        $scope.$on('$destroy', function () {
            _this.unregister();
        });
    }
    ResponsiveCardController.prototype.toggle = function () {
        if (this.showDetails) {
            this.cardGridController.closeCard();
        }
        else {
            this.cardGridController.openCard(this.behavior);
        }
    };
    ResponsiveCardController.prototype.triggerHoverIn = function () {
        this.cardGridController.hoverIn(this.behavior);
    };
    ResponsiveCardController.prototype.triggerHoverOut = function () {
        this.cardGridController.hoverOut();
    };
    ResponsiveCardController.$inject = ['$scope', '$q', '$element', __parentChildBehavior.serviceName, __promiseUtility.serviceName];
    return ResponsiveCardController;
})();
exports.ResponsiveCardController = ResponsiveCardController;
responsiveCard.$inject = [jquery_service_1.serviceName];
function responsiveCard(jqueryHelper) {
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        require: '^^rlResponsiveCardGrid',
        template: "\n\t\t\t<div class=\"smallCardsList col-lg-4 col-md-6 col-sm-12\">\n\t\t\t\t<div class=\"small-card\">\n\t\t\t\t\t<div class=\"small-card-header\" ng-class=\"{ 'smallCardHeaderHover': card.isHovering }\"\n\t\t\t\t\t\tng-click=\"card.toggle()\" ng-mouseover=\"card.triggerHoverIn()\" ng-mouseleave=\"card.triggerHoverOut()\">\n\t\t\t\t\t\t<div class=\"small-card-header-card-name\">\n\t\t\t\t\t\t\t<span ng-bind-html=\"card.header.name\"></span>\n\t\t\t\t\t\t\t<span ng-if=\"card.summary() | isEmpty:false\"> - </span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"small-card-header-summary-text\" ng-bind-html=\"card.summary()|truncate:card.summaryLength:true\"></div>\n\t\t\t\t\t\t<span class=\"small-card-header-item-count\" ng-if=\"card.header.count != null\"><span class=\"badge\">{{card.header.count()}}</span></span>\n\t\t\t\t\t\t<span class=\"small-card-header-item-count\" ng-if=\"card.header.status != null\"><span class=\"badge\">{{card.header.status()}}</span></span>\n\t\t\t\t\t\t<span class=\"small-card-header-icon\" ng-if=\"card.showIcon()\"> <i class=\"small-card-indicator fa fa-2x fa-{{card.header.icon}}\" title=\"{{card.header.iconTooltip}}\" /></span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<ng-form rl-autosave=\"card.autosaveLink\" validate=\"card.validate()\" save=\"card.save()\">\n\t\t\t\t\t\t<div ng-if=\"card.showDetails\">\n\t\t\t\t\t\t\t<div class=\"small-card-content\">\n\t\t\t\t\t\t\t\t<div ng-transclude></div>\n\t\t\t\t\t\t\t\t<div class=\"clearfix\"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</ng-form>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"clearfix\" ng-if=\"card.isEndOfRow\"></div>\n\t\t",
        controller: exports.controllerName,
        controllerAs: 'card',
        scope: {},
        bindToController: {
            header: '=',
            validate: '&',
            save: '&',
        },
    };
}
exports.responsiveCard = responsiveCard;
//# sourceMappingURL=responsiveCard.js.map