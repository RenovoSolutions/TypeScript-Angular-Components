// /// <reference path='../../../../typings/jquery/jquery.d.ts' />
"use strict";
var angular = require('angular');
var _ = require('lodash');
var Rx = require('rxjs');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var parentChild_service_1 = require('../../../services/parentChild/parentChild.service');
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
        this.refresh = new Rx.Subject();
        $scope.refresh = function () {
            _this.source.refresh();
            _this.refresh.next(null);
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
    CardController.$inject = ['$scope', '$controller', '$q', '$element', parentChild_service_1.serviceName, typescript_angular_utilities_1.downgrade.objectServiceName];
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
    parentChild_service_1.moduleName,
    typescript_angular_utilities_1.downgrade.moduleName,
    headerColumn_module_1.moduleName,
])
    .component(exports.componentName, card)
    .controller(exports.controllerName, CardController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0VBQWtFOztBQUVsRSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUM1QixJQUFZLEVBQUUsV0FBTSxNQUFNLENBQUMsQ0FBQTtBQUUzQiw2Q0FBb0MsOEJBQThCLENBQUMsQ0FBQTtBQUduRSxvQ0FBZ0ksbURBQW1ELENBQUMsQ0FBQTtBQUVwTCxvQ0FBcUQsb0NBQW9DLENBQUMsQ0FBQTtBQU0vRSxrQkFBVSxHQUFXLHFDQUFxQyxDQUFDO0FBQzNELHFCQUFhLEdBQVcsUUFBUSxDQUFDO0FBQ2pDLHNCQUFjLEdBQVcsZ0JBQWdCLENBQUM7QUFtQ3JEO0lBd0JDLHdCQUFvQixNQUFrQixFQUNsQyxXQUF1QyxFQUMvQixFQUFxQixFQUNyQixRQUFrQyxFQUNsQyxXQUF3QyxFQUNoRCxNQUErQjtRQTdCcEMsaUJBZ0pDO1FBeEhvQixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBRTFCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQ3JCLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUE2QjtRQWJwRCxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixVQUFLLEdBQVksS0FBSyxDQUFDO1FBQ3ZCLGlCQUFZLEdBQW1DLEVBQUUsQ0FBQztRQTJGMUMsYUFBUSxHQUFvQjtZQUNuQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDYixDQUFDO1lBRUQsTUFBTSxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsS0FBSSxDQUFDLFlBQVksRUFBRSxVQUFDLFFBQTJCO2dCQUMzRixFQUFFLENBQUMsQ0FBQyxRQUFRLENB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