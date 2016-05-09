// /// <reference path='../../../typings/commonjs.d.ts' />
// /// <reference path='../../../typings/jquery/jquery.d.ts' />
'use strict';
var rxjs_1 = require('rxjs');
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
        if (this.canOpen == null) {
            this.canOpen = true;
        }
        if (this.listController == null) {
            this.listController = this.noList();
        }
        var behavior = {
            autosave: this.autosave.bind(this),
            close: this.close,
        };
        this.listController.alwaysOpenChanges.subscribe(this.updateAlwaysOpen.bind(this));
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
            alwaysOpenChanges: new rxjs_1.Subject(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpbXBsZUNhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMERBQTBEO0FBQzFELCtEQUErRDtBQUUvRCxZQUFZLENBQUM7QUFHYixxQkFBd0IsTUFBTSxDQUFDLENBQUE7QUFFL0IsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFDeEQsSUFBTyxhQUFhLEdBQUcsdUNBQVEsQ0FBQyxtQkFBbUIsQ0FBQztBQVF6QyxxQkFBYSxHQUFXLGNBQWMsQ0FBQztBQUN2QyxzQkFBYyxHQUFXLHNCQUFzQixDQUFDO0FBd0IzRDtJQWVDLDhCQUFvQixXQUFzRDtRQWYzRSxpQkFtR0M7UUFwRm9CLGdCQUFXLEdBQVgsV0FBVyxDQUEyQztRQUwxRSxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixpQkFBWSxHQUFpRCxFQUFFLENBQUM7UUFpRGhFLFVBQUssR0FBb0I7WUFDeEIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVcsS0FBSyxLQUFLLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDYixDQUFDO1lBRUQsTUFBTSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUE7SUFuRDRFLENBQUM7SUFFOUUsc0NBQU8sR0FBUDtRQUNDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3JDLENBQUM7UUFFRCxJQUFJLFFBQVEsR0FBd0I7WUFDbkMs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