// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('ui-select');
require('ui-select/dist/select.css');
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var __transform = typescript_angular_utilities_1.services.transform.transform;
var input_1 = require('../input/input');
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
var jquery_service_1 = require('../../services/jquery/jquery.service');
exports.moduleName = 'rl.ui.components.select';
exports.componentName = 'rlSelect';
exports.controllerName = 'SelectController';
var SelectController = (function (_super) {
    __extends(SelectController, _super);
    function SelectController($scope, $attrs, $q, $transclude, object, componentValidatorFactory, jqueryUtility) {
        var _this = this;
        _super.call(this, $scope, $attrs, componentValidatorFactory);
        this.$q = $q;
        this.object = object;
        this._nullOption = {
            __isNullOption: true,
        };
        this.inputType = 'select';
        if (!this.template) {
            $transclude(function (clone) {
                if (clone.length) {
                    _this.template = jqueryUtility.getHtml(clone);
                }
                else {
                    _this.template = '{{select.getDisplayName($item)}}';
                }
            });
        }
    }
    Object.defineProperty(SelectController.prototype, "selection", {
        get: function () {
            return this.ngModel.$viewValue;
        },
        set: function (value) {
            if (value.__isNullOption) {
                this.ngModel.$setViewValue(null);
            }
            else {
                this.ngModel.$setViewValue(value);
            }
            this.select({ item: this.ngModel.$viewValue });
        },
        enumerable: true,
        configurable: true
    });
    SelectController.prototype.$onInit = function () {
        var _this = this;
        _super.prototype.$onInit.call(this);
        if (_.isUndefined(this.options)) {
            this.loading = true;
            this.loadItems().then(function (options) {
                _this.options = options;
                _this.loading = false;
            });
        }
        else {
            this.options = this.configureOptions(this.options);
        }
    };
    SelectController.prototype.getDisplayName = function (item) {
        return __transform.getValue(item, this.selector);
    };
    SelectController.prototype.loadItems = function () {
        var _this = this;
        var promise;
        promise = this.getOptions();
        if (promise == null) {
            promise = this.$q.when(this.options);
        }
        return promise.then(function (options) { return _this.configureOptions(options); });
    };
    SelectController.prototype.configureOptions = function (options) {
        if (!this.object.isNullOrWhitespace(this.nullOption)) {
            options.unshift(this._nullOption);
        }
        return options;
    };
    SelectController.$inject = ['$scope', '$attrs', '$q', '$transclude', __object.serviceName, componentValidator_service_1.factoryName, jquery_service_1.serviceName];
    return SelectController;
}(input_1.InputController));
exports.SelectController = SelectController;
var select = input_1.buildInput({
    transclude: true,
    template: require('./select.html'),
    controller: exports.controllerName,
    controllerAs: 'select',
    bindings: {
        options: '<?',
        getOptions: '&',
        selector: '<?',
        ngDisabled: '<?',
        nullOption: '@',
        select: '&',
        itemAs: '@',
        // private
        template: '<?',
    },
});
angular.module(exports.moduleName, ['ui.select', __object.moduleName, input_1.moduleName, jquery_service_1.moduleName])
    .component(exports.componentName, select)
    .controller(exports.controllerName, SelectController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBEQUEwRDtBQUUxRCxZQUFZLENBQUM7Ozs7OztBQUViLFFBQU8sV0FBVyxDQUFDLENBQUE7QUFDbkIsUUFBTywyQkFBMkIsQ0FBQyxDQUFBO0FBRW5DLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBQ2xDLElBQU8sV0FBVyxHQUFHLHVDQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUVsRCxzQkFBdUUsZ0JBQWdCLENBQUMsQ0FBQTtBQUN4RiwyQ0FBeUYsOERBQThELENBQUMsQ0FBQTtBQUN4SiwrQkFBNkYsc0NBQXNDLENBQUMsQ0FBQTtBQUV2SCxrQkFBVSxHQUFXLHlCQUF5QixDQUFDO0FBQy9DLHFCQUFhLEdBQVcsVUFBVSxDQUFDO0FBQ25DLHNCQUFjLEdBQVcsa0JBQWtCLENBQUM7QUFNekQ7SUFBc0Msb0NBQWU7SUErQnBELDBCQUFZLE1BQXNCLEVBQzlCLE1BQTJCLEVBQ25CLEVBQXFCLEVBQzdCLFdBQXdDLEVBQ2hDLE1BQStCLEVBQ3ZDLHlCQUFxRCxFQUNyRCxhQUE2QjtRQXJDbEMsaUJBc0ZDO1FBaERDLGtCQUFNLE1BQU0sRUFBTyxNQUFNLEVBQUUseUJBQXlCLENBQUMsQ0FBQztRQUwzQyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUVyQixXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQXRCbkMsZ0JBQVcsR0FBUTtZQUMxQixjQUFjLEVBQUUsSUFBSTtTQUNwQixDQUFDO1FBd0JELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBRTFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDcEIsV0FBVyxDQUFDLFVBQUMsS0FBK0I7Z0JBQzNDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNsQixLQUFJLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzlDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ1AsS0FBSSxDQUFDLFFBQVEsR0FBRyxrQ0FBa0MsQ0FBQztnQkFDcEQsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQztJQUNGLENBQUM7SUFqQ0Qsc0JBQUksdUNBQVM7YUFBYjtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNoQyxDQUFDO2FBRUQsVUFBYyxLQUFVO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkMsQ0FBQztZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELENBQUM7OztPQVRBO0lBaUNELGtDQUFPLEdBQVA7UUFBQSxpQkFZQztRQVhBLGdCQUFLLENBQUMsT0FBTyxXQUFFLENBQUM7UUFFaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFjO2dCQUNwQyxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDdkIsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEQsQ0FBQztJQUNGLENBQUM7SUFFRCx5Q0FBYyxHQUFkLFVBQWUsSUFBUztRQUN2QixNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxvQ0FBUyxHQUFUO1FBQUEsaUJBT0M7UUFOQSxJQUFJLE9BQWdDLENBQUM7UUFDckMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM1QixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyQixPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQWMsSUFBYyxNQUFNLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVELDJDQUFnQixHQUFoQixVQUFpQixPQUFjO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUF2RE0sd0JBQU8sR0FBYSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLHdDQUE2QixFQUFFLDRCQUFpQixDQUFDLENBQUM7SUF3RDlJLHVCQUFDO0FBQUQsQ0FBQyxBQXRGRCxDQUFzQyx1QkFBZSxHQXNGcEQ7QUF0Rlksd0JBQWdCLG1CQXNGNUIsQ0FBQTtBQUVELElBQU0sTUFBTSxHQUE4QixrQkFBVSxDQUFDO0lBQ3BELFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFFBQVEsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDO0lBQ2xDLFVBQVUsRUFBRSxzQkFBYztJQUMxQixZQUFZLEVBQUUsUUFBUTtJQUN0QixRQUFRLEVBQUU7UUFDVCxPQUFPLEVBQUUsSUFBSTtRQUNiLFVBQVUsRUFBRSxHQUFHO1FBQ2YsUUFBUSxFQUFFLElBQUk7UUFDZCxVQUFVLEVBQUUsSUFBSTtRQUNoQixVQUFVLEVBQUUsR0FBRztRQUNmLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLEdBQUc7UUFFWCxVQUFVO1FBQ1YsUUFBUSxFQUFFLElBQUk7S0FDZDtDQUNELENBQUMsQ0FBQztBQUVILE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFFLGtCQUFXLEVBQUUsMkJBQVksQ0FBQyxDQUFDO0tBQ3ZGLFNBQVMsQ0FBQyxxQkFBYSxFQUFFLE1BQU0sQ0FBQztLQUNoQyxVQUFVLENBQUMsc0JBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDIn0=