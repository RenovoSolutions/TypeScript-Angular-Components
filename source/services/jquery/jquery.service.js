// /// <reference path="../../../typings/jquery/jquery.d.ts" />
'use strict';
var angular = require('angular');
exports.moduleName = 'rl.utilities.services.jquery';
exports.serviceName = 'jqueryUtility';
var JQueryUtility = (function () {
    function JQueryUtility() {
    }
    JQueryUtility.prototype.getHtml = function (jquery) {
        return angular.element('<div>').append(jquery).html();
    };
    JQueryUtility.prototype.replaceContent = function (contentArea, newContent) {
        contentArea.empty();
        return contentArea.append(newContent);
    };
    return JQueryUtility;
}());
angular.module(exports.moduleName, [])
    .service(exports.serviceName, JQueryUtility);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianF1ZXJ5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqcXVlcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrREFBK0Q7QUFFL0QsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFeEIsa0JBQVUsR0FBVyw4QkFBOEIsQ0FBQztBQUNwRCxtQkFBVyxHQUFXLGVBQWUsQ0FBQztBQU9qRDtJQUFBO0lBU0EsQ0FBQztJQVJBLCtCQUFPLEdBQVAsVUFBUSxNQUFjO1FBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUN0RCxDQUFDO0lBRUQsc0NBQWMsR0FBZCxVQUFlLFdBQW1CLEVBQUUsVUFBa0I7UUFDckQsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDRixvQkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixPQUFPLENBQUMsbUJBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQyJ9