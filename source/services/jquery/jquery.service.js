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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianF1ZXJ5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqcXVlcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrREFBK0Q7QUFFL0QsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFeEIsa0JBQVUsR0FBVyw4QkFBOEIsQ0FBQztBQUNwRCxtQkFBVyxHQUFXLGVBQWUsQ0FBQztBQU1qRDtJQUFBO0lBS0EsQ0FBQztJQUpBLHNDQUFjLEdBQWQsVUFBZSxXQUFtQixFQUFFLFVBQWtCO1FBQ3JELFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQixNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0Ysb0JBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsT0FBTyxDQUFDLG1CQUFXLEVBQUUsYUFBYSxDQUFDLENBQUMifQ==