// /// <reference path='../../../../typings/jquery/jquery.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var Rx = require('rx');
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
        this.refresh = new Rx.Subject();
        $scope.refresh = function () {
            _this.source.refresh();
            _this.refresh.onNext(null);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0VBQWtFO0FBRWxFLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sYUFBYSxHQUFHLHVDQUFRLENBQUMsbUJBQW1CLENBQUM7QUFDcEQsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFFbEMsb0NBQXFELG9DQUFvQyxDQUFDLENBQUE7QUFNL0Usa0JBQVUsR0FBVyxxQ0FBcUMsQ0FBQztBQUMzRCxxQkFBYSxHQUFXLFFBQVEsQ0FBQztBQUNqQyxzQkFBYyxHQUFXLGdCQUFnQixDQUFDO0FBbUNyRDtJQXVCQyx3QkFBb0IsTUFBa0IsRUFDbEMsV0FBdUMsRUFDL0IsRUFBcUIsRUFDckIsUUFBa0MsRUFDbEMsV0FBc0QsRUFDOUQsTUFBK0I7UUE1QnBDLGlCQThJQztRQXZIb0IsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUUxQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBMkM7UUFabEUsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUN2QixpQkFBWSxHQUFpRCxFQUFFLENBQUM7UUF5RnhELGFBQVEsR0FBb0I7WUFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2IsQ0FBQztZQUVELE1BQU0sQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUUsVUFBQyxR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
