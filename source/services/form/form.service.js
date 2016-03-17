'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.services.form';
exports.serviceName = 'formService';
var FormService = (function () {
    function FormService() {
    }
    FormService.prototype.getAggregateError = function (form) {
        var filteredForm = _.filter(form, function (prop) {
            return prop.rlErrorMessage != null;
        });
        var errors = _.mapValues(filteredForm, 'rlErrorMessage');
        return _.first(errors);
    };
    return FormService;
}());
angular.module(exports.moduleName, [])
    .service(exports.serviceName, FormService);
//# sourceMappingURL=form.service.js.map