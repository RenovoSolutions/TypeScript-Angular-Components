"use strict";
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.ui.services.form';
exports.serviceName = 'formService';
var FormService = (function () {
    function FormService() {
    }
    FormService.prototype.getAggregateError = function (form) {
        var filteredForm = _.filter(form, function (prop) {
            return prop != null && prop.rlErrorMessage != null;
        });
        var errors = _.mapValues(filteredForm, 'rlErrorMessage');
        return _.first(errors);
    };
    return FormService;
}());
angular.module(exports.moduleName, [])
    .service(exports.serviceName, FormService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUlqQixrQkFBVSxHQUFXLHFCQUFxQixDQUFDO0FBQzNDLG1CQUFXLEdBQVcsYUFBYSxDQUFDO0FBTS9DO0lBQUE7SUFRQSxDQUFDO0lBUEEsdUNBQWlCLEdBQWpCLFVBQWtCLElBQW9CO1FBQ3JDLElBQUksWUFBWSxHQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFVBQUMsSUFBUztZQUNoRCxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksTUFBTSxHQUFrQixDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFDRixrQkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixPQUFPLENBQUMsbUJBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyJ9