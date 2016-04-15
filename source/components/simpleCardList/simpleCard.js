// /// <reference path='../../../typings/commonjs.d.ts' />
// /// <reference path='../../../typings/jquery/jquery.d.ts' />
'use strict';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __parentChild = typescript_angular_utilities_1.services.parentChildBehavior;
exports.componentName = 'rlSimpleCard';
exports.controllerName = 'SimpleCardController';
var SimpleCardController = (function () {
    function SimpleCardController(parentChild) {
        var _this = this;
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
        this.updateAlwaysOpen(this.alwaysOpen);
    };
    SimpleCardController.prototype.$onChanges = function (changes) {
        if (changes.alwaysOpen) {
            this.updateAlwaysOpen(changes.alwaysOpen.currentValue);
        }
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
    SimpleCardController.prototype.updateAlwaysOpen = function (alwaysOpen) {
        if (alwaysOpen) {
            this.showContent = true;
            this.alwaysOpen = true;
        }
        else {
            this.close();
        }
    };
    SimpleCardController.$inject = [__parentChild.serviceName];
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
        canOpen: '<?',
        alwaysOpen: '<?',
        childLink: '=?',
        save: '&',
        saveWhenInvalid: '<?',
        cardType: '@',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpbXBsZUNhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMERBQTBEO0FBQzFELCtEQUErRDtBQUUvRCxZQUFZLENBQUM7QUFJYiw2Q0FBeUIsOEJBQThCLENBQUMsQ0FBQTtBQUN4RCxJQUFPLGFBQWEsR0FBRyx1Q0FBUSxDQUFDLG1CQUFtQixDQUFDO0FBUXpDLHFCQUFhLEdBQVcsY0FBYyxDQUFDO0FBQ3ZDLHNCQUFjLEdBQVcsc0JBQXNCLENBQUM7QUF5QjNEO0lBZUMsOEJBQW9CLFdBQXNEO1FBZjNFLGlCQXFHQztRQXRGb0IsZ0JBQVcsR0FBWCxXQUFXLENBQTJDO1FBTDFFLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLGlCQUFZLEdBQWlELEVBQUUsQ0FBQztRQW1EaEUsVUFBSyxHQUFvQjtZQUN4QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssSUFBSSxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNiLENBQUM7WUFFRCxNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQTtJQXJENEUsQ0FBQztJQUU5RSxzQ0FBTyxHQUFQO1FBQUEsaUJBc0JDO1FBckJBLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3JDLENBQUM7UUFFRCxJQUFJLFFBQVEsR0FBd0I7WUFDbkMsUUFBUSxFQUFFLElBQUks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