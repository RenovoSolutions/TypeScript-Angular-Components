// /// <reference path="../../../typings/jquery/jquery.d.ts" />
'use strict';
var angular = require('angular');
exports.moduleName = 'rl.utilities.services.jquery';
exports.serviceName = 'jqueryUtility';
var JQueryUtility = (function () {
    function JQueryUtility() {
    }
    JQueryUtility.prototype.replaceContent = function (contentArea, newContent) {
        contentArea.empty();
        return contentArea.append(newContent);
    };
    return JQueryUtility;
}());
angular.module(exports.moduleName, [])
    .service(exports.serviceName, JQueryUtility);
//# sourceMappingURL=jquery.service.js.map