"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnRXcmFwcGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb2N1bWVudFdyYXBwZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFakIsa0JBQVUsR0FBVyxnQ0FBZ0MsQ0FBQztBQUN0RCxtQkFBVyxHQUFXLGlCQUFpQixDQUFDO0FBTW5EO0lBQUE7UUFDUyxvQkFBZSxHQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUsvQyxDQUFDO0lBSEEsZ0NBQU0sR0FBTjtRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFDRixzQkFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixPQUFPLENBQUMsbUJBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQyJ9