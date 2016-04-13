// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
exports.moduleName = 'rl.ui.components.multiStepIndicator';
exports.componentName = 'rlMultiStepIndicator';
exports.controllerName = 'MultiStepIndicatorController';
var __object = typescript_angular_utilities_1.services.object;
var MultiStepIndicatorController = (function () {
    function MultiStepIndicatorController($state, $q, object) {
        this.$state = $state;
        this.$q = $q;
        this.object = object;
        this.configureSteps();
    }
    MultiStepIndicatorController.prototype.onClick = function (step) {
        if (!this.anyLoading()) {
            step.loading = true;
            this.$q.when(step.onClick()).then(function () {
                step.loading = false;
            });
        }
    };
    MultiStepIndicatorController.prototype.anyLoading = function () {
        return _.some(this.steps, function (step) {
            return step.loading;
        });
    };
    MultiStepIndicatorController.prototype.configureSteps = function () {
        var _this = this;
        _.each(this.steps, function (step) {
            step.hasCount = _.isFunction(step.count);
            step.getCompleted = function () { return _this.getIsCompleted(step); };
            step.getValid = function () { return _this.getIsValid(step); };
            if (!_.isFunction(step.onClick)) {
                if (_this.object.isNullOrWhitespace(step.stateName)) {
                    step.inactive = true;
                }
                else {
                    step.onClick = function () { return _this.redirectToState(step); };
                    if (_this.$state.includes(step.stateName)) {
                        step.isCurrent = true;
                    }
                }
            }
        });
    };
    MultiStepIndicatorController.prototype.redirectToState = function (step) {
        var _this = this;
        return this.$state.go(step.stateName).then(function () {
            _this.clearCurrentState();
            step.isCurrent = true;
        });
    };
    MultiStepIndicatorController.prototype.clearCurrentState = function () {
        _.each(this.steps, function (step) {
            step.isCurrent = false;
        });
    };
    MultiStepIndicatorController.prototype.getIsCompleted = function (step) {
        return _.isFunction(step.isCompleted)
            ? step.isCompleted()
            : step.isCompleted;
    };
    MultiStepIndicatorController.prototype.setIsCompleted = function (step, isCompleted) {
        if (!_.isFunction(step.isCompleted)) {
            step.isCompleted = isCompleted;
        }
    };
    MultiStepIndicatorController.prototype.getIsValid = function (step) {
        if (_.isFunction(step.isValid)) {
            return step.isValid();
        }
        else if (!_.isUndefined(step.isValid != null)) {
            return step.isValid;
        }
        else {
            return true;
        }
    };
    MultiStepIndicatorController.$inject = ['$state', '$q', __object.serviceName];
    return MultiStepIndicatorController;
}());
exports.MultiStepIndicatorController = MultiStepIndicatorController;
var multiStepIndicator = {
    template: require('./multiStepIndicator.html'),
    controller: exports.controllerName,
    controllerAs: 'breadcrumb',
    bindings: {
        steps: '=',
        numbered: '=',
    },
};
angular.module(exports.moduleName, [__object.moduleName])
    .component(exports.componentName, multiStepIndicator)
    .controller(exports.controllerName, MultiStepIndicatorController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlTdGVwSW5kaWNhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXVsdGlTdGVwSW5kaWNhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBEQUEwRDtBQUUxRCxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw2Q0FBeUIsOEJBQThCLENBQUMsQ0FBQTtBQUU3QyxrQkFBVSxHQUFXLHFDQUFxQyxDQUFDO0FBQzNELHFCQUFhLEdBQVcsc0JBQXNCLENBQUM7QUFDL0Msc0JBQWMsR0FBVyw4QkFBOEIsQ0FBQztBQUVuRSxJQUFPLFFBQVEsR0FBRyx1Q0FBUSxDQUFDLE1BQU0sQ0FBQztBQXFCbEM7SUFJQyxzQ0FBb0IsTUFBZ0MsRUFDeEMsRUFBcUIsRUFDckIsTUFBK0I7UUFGdkIsV0FBTSxHQUFOLE1BQU0sQ0FBMEI7UUFDeEMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFDMUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCw4Q0FBTyxHQUFQLFVBQVEsSUFBcUI7UUFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO0lBQ0YsQ0FBQztJQUVELGlEQUFVLEdBQVY7UUFDQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQUMsSUFBcUI7WUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU8scURBQWMsR0FBdEI7UUFBQSxpQkFrQkM7UUFqQkEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQUMsSUFBcUI7WUFDeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWlCLE1BQU0sQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBaUIsTUFBTSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFakUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFnQyxNQUFNLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFcEYsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ3ZCLENBQUM7Z0JBQ0YsQ0FBQztZQUNGLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTyxzREFBZSxHQUF2QixVQUF3QixJQUFxQjtRQUE3QyxpQkFLQztRQUpBLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzFDLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVPLHdEQUFpQixHQUF6QjtRQUNDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFDLElBQVc7WUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU8scURBQWMsR0FBdEIsVUFBdUIsSUFBcUI7UUFDM0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztjQUNsQixJQUFJLENBQUMsV0FBWSxFQUFFO2NBQzFCLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDOUIsQ0FBQztJQUVPLHFEQUFjLEdBQXRCLFVBQXVCLElBQXFCLEVBQUUsV0FBb0I7UUFDakUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDaEMsQ0FBQztJQUNGLENBQUM7SUFFTyxpREFBVSxHQUFsQixVQUFtQixJQUFxQjtRQUN2QyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFpQixJQUFJLENBQUMsT0FBUSxFQUFFLENBQUM7UUFDeEMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsTUFBTSxDQUFVLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDOUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7SUFDRixDQUFDO0lBM0VNLG9DQUFPLEdBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQTRFbkUsbUNBQUM7QUFBRCxDQUFDLEFBL0VELElBK0VDO0FBL0VZLG9DQUE0QiwrQkErRXhDLENBQUE7QUFFRCxJQUFJLGtCQUFrQixHQUE4QjtJQUNuRCxRQUFRLEVBQUUsT0FBTyxDQUFDLDJCQUEyQixDQUFDO0lBQzlDLFVBQVUsRUFBRSxzQkFBYztJQUMxQixZQUFZLEVBQUUsWUFBWTtJQUMxQixRQUFRLEVBQUU7UUFDVCxLQUFLLEVBQUUsR0FBRztRQUNWLFFBQVEsRUFBRSxHQUFHO0tBQ2I7Q0FDRCxDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQy9DLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLGtCQUFrQixDQUFDO0tBQzVDLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLDRCQUE0QixDQUFDLENBQUMifQ==