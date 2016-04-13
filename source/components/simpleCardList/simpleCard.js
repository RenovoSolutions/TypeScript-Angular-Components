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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpbXBsZUNhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMERBQTBEO0FBQzFELCtEQUErRDtBQUUvRCxZQUFZLENBQUM7QUFJYiw2Q0FBeUIsOEJBQThCLENBQUMsQ0FBQTtBQUN4RCxJQUFPLGFBQWEsR0FBRyx1Q0FBUSxDQUFDLG1CQUFtQixDQUFDO0FBTXpDLHFCQUFhLEdBQVcsY0FBYyxDQUFDO0FBQ3ZDLHNCQUFjLEdBQVcsc0JBQXNCLENBQUM7QUFxQjNEO0lBZUMsOEJBQW9CLE1BQXNCLEVBQzlCLFdBQXNEO1FBaEJuRSxpQkE2RkM7UUE5RW9CLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQzlCLGdCQUFXLEdBQVgsV0FBVyxDQUEyQztRQU5sRSxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixpQkFBWSxHQUFpRCxFQUFFLENBQUM7UUFvRGhFLFVBQUssR0FBb0I7WUFDeEIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVcsS0FBSyxLQUFLLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDYixDQUFDO1lBRUQsTUFBTSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUE7SUFyRG9FLENBQUM7SUFFdEUsc0NBQU8sR0FBUDtRQUFBLGlCQTRCQztRQTNCQSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FB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