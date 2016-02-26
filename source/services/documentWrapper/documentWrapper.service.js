'use strict';
var angular = require('angular');
var $ = require('jquery');
exports.moduleName = 'rl.ui.services.documentWrapper';
exports.serviceName = 'documentWrapper';
var DocumentService = (function () {
    function DocumentService() {
        this.documentControl = $(document);
    }
    DocumentService.prototype.height = function () {
        return this.documentControl.height();
    };
    return DocumentService;
}());
angular.module(exports.moduleName, [])
    .service(exports.serviceName, DocumentService);
//# sourceMappingURL=documentWrapper.service.js.map