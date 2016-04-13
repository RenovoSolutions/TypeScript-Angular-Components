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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnRXcmFwcGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb2N1bWVudFdyYXBwZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUVqQixrQkFBVSxHQUFXLGdDQUFnQyxDQUFDO0FBQ3RELG1CQUFXLEdBQVcsaUJBQWlCLENBQUM7QUFNbkQ7SUFBQTtRQUNTLG9CQUFlLEdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBSy9DLENBQUM7SUFIQSxnQ0FBTSxHQUFOO1FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUNGLHNCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDIn0=