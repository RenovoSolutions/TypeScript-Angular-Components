'use strict';
var angular = require('angular');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBSXhCLGtCQUFVLEdBQVcscUJBQXFCLENBQUM7QUFDM0MsbUJBQVcsR0FBVyxhQUFhLENBQUM7QUFNL0M7SUFBQTtJQVFBLENBQUM7SUFQQSx1Q0FBaUIsR0FBakIsVUFBa0IsSUFBb0I7UUFDckMsSUFBSSxZQUFZLEdBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsVUFBQyxJQUFTO1lBQ2hELE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxNQUFNLEdBQWtCLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDeEUsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNGLGtCQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDIn0=