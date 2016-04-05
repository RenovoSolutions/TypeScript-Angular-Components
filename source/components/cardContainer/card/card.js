// /// <reference path='../../../../typings/jquery/jquery.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __parentChild = typescript_angular_utilities_1.services.parentChildBehavior;
var __object = typescript_angular_utilities_1.services.object;
var headerColumn_module_1 = require('./headerColumn/headerColumn.module');
exports.moduleName = 'rl.ui.components.cardContainer.card';
exports.componentName = 'rlCard';
exports.controllerName = 'CardController';
var CardController = (function () {
    function CardController($scope, $controller, $q, $element, parentChild, object) {
        var _this = this;
        this.$scope = $scope;
        this.$q = $q;
        this.$element = $element;
        this.parentChild = parentChild;
        this.showContent = false;
        this.dirty = false;
        this.autosaveLink = {};
        this.autosave = function () {
            if (_this.showContent === false) {
                return true;
            }
            return _this.parentChild.triggerChildBehavior(_this.autosaveLink, function (behavior) {
                if (behavior.autosave()) {
                    _this.showContent = false;
                    return true;
                }
                else {
                    return false;
                }
            });
        };
        if (this.cardAs) {
            $scope[this.cardAs] = this.item;
        }
        $scope.collapse = this.autosave;
        $scope.setSelected = this.setSelected.bind(this);
        $scope.refresh = function () {
            _this.source.refresh();
            $scope.$broadcast('card.refresh');
        };
        $scope.remove = function () {
            _this.source.remove(_this.item);
        };
        $scope.containerData = this.containerData;
        if (object.isNullOrWhitespace(this.cardController) === false) {
            var controller = $controller(this.cardController, { $scope: $scope });
            if (object.isNullOrWhitespace(this.cardControllerAs) === false) {
                $scope[this.cardControllerAs] = controller;
            }
        }
        parentChild.registerChildBehavior(this.item, {
            close: this.autosave,
        });
    }
    CardController.prototype.toggleContent = function () {
        if (!this.showContent) {
            this.open();
        }
        else {
            this.autosave();
        }
    };
    CardController.prototype.validateCard = function () {
        var behavior = this.parentChild.getChildBehavior(this.item);
        if (_.isFunction(behavior.validateCard)) {
            return behavior.validateCard();
        }
        else {
            return true;
        }
    };
    CardController.prototype.saveCard = function () {
        var behavior = this.parentChild.getChildBehavior(this.item);
        if (_.isFunction(behavior.saveCard)) {
            return behavior.saveCard();
        }
        else {
            return this.$q.when();
        }
    };
    CardController.prototype.clickCard = function () {
        this.parentChild.triggerChildBehavior(this.item, function (behavior) {
            if (_.isFunction(behavior.clickCard)) {
                return behavior.clickCard();
            }
        });
    };
    CardController.prototype.$postLink = function () {
        var _this = this;
        this.cardContainer.makeCard(this.$scope, function (content) {
            var contentArea = _this.$element.find('.content-template');
            contentArea.append(content);
            _this.hasBody = content.length > 0;
        }, null, 'contentSlot');
        this.cardContainer.makeCard(this.$scope, function (footer) {
            _this.hasFooter = (footer.length > 0);
            if (_this.hasFooter) {
                var footerArea = _this.$element.find('.footer-template');
                footerArea.append(footer);
            }
        }, null, 'footerSlot');
    };
    CardController.prototype.open = function () {
        this.parentChild.triggerChildBehavior(this.item, function (behavior) {
            if (_.isFunction(behavior.initCard)) {
                behavior.initCard();
            }
        });
        if (this.cardContainer.openCard()) {
            this.showContent = true;
        }
    };
    CardController.prototype.setSelected = function (value) {
        if (_.isUndefined(this.item.viewData)) {
            this.item.viewData = {};
        }
        this.item.viewData.selected = value;
        this.selectionChanged();
    };
    CardController.$inject = ['$scope', '$controller', '$q', '$element', __parentChild.serviceName, __object.serviceName];
    return CardController;
}());
exports.CardController = CardController;
var card = {
    template: require('./card.html'),
    require: { cardContainer: '^^rlCardContainer' },
    controller: exports.controllerName,
    controllerAs: '__card',
    bindings: {
        columns: '<?',
        item: '=',
        clickable: '<?',
        source: '=',
        containerData: '<?',
        cardController: '<?',
        cardControllerAs: '<?',
        cardAs: '<?',
        permanentFooter: '<?',
        selectable: '<?',
        selectionChanged: '&',
        saveWhenInvalid: '<?',
    },
};
angular.module(exports.moduleName, [
    __parentChild.moduleName,
    __object.moduleName,
    headerColumn_module_1.moduleName,
])
    .component(exports.componentName, card)
    .controller(exports.controllerName, CardController);
//# sourceMappingURL=card.js.map