// /// <reference path="../../../typings/jquery/jquery.d.ts" />
'use strict';
var ng = require('angular');
var _ = require('lodash');
var rxjs_1 = require('rxjs');
exports.moduleName = 'rl.utilities.services.contentProvider';
exports.serviceName = 'contentProviderFactory';
var ContentProviderService = (function () {
    function ContentProviderService() {
        var _this = this;
        this.setTranscludeContent = function (transcludeFunction) {
            var scope = null;
            if (_.isFunction(transcludeFunction)) {
                transcludeFunction(function (clone, transcludeScope) {
                    _this.setContent(clone, transcludeScope);
                });
            }
            else {
                _this.setContent(null);
            }
        };
        this.contentChanges = new rxjs_1.BehaviorSubject({});
    }
    ContentProviderService.prototype.setContent = function (content, scope) {
        this.content = content;
        this.scope = scope;
        this.contentChanges.next({
            newContent: content,
            scope: scope,
        });
    };
    ContentProviderService.prototype.getContent = function (selector) {
        if (selector != null) {
            return this.content.filter(selector);
        }
        return this.content;
    };
    return ContentProviderService;
}());
contentProviderServiceFactory.$inject = [];
function contentProviderServiceFactory() {
    'use strict';
    return {
        getInstance: function () {
            return new ContentProviderService();
        }
    };
}
ng.module(exports.moduleName, [])
    .factory(exports.serviceName, contentProviderServiceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudFByb3ZpZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250ZW50UHJvdmlkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrREFBK0Q7QUFFL0QsWUFBWSxDQUFDO0FBRWIsSUFBWSxFQUFFLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDOUIsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDNUIscUJBQTRDLE1BQU0sQ0FBQyxDQUFBO0FBRXhDLGtCQUFVLEdBQVcsdUNBQXVDLENBQUM7QUFDN0QsbUJBQVcsR0FBVyx3QkFBd0IsQ0FBQztBQWMxRDtJQUNDO1FBREQsaUJBb0NDO1FBbEJBLHlCQUFvQixHQUF5RCxVQUFDLGtCQUEwQztZQUN2SCxJQUFJLEtBQUssR0FBYyxJQUFJLENBQUM7WUFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsa0JBQWtCLENBQUMsVUFBQyxLQUFhLEVBQUUsZUFBMEI7b0JBQzVELEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDLENBQUMsQ0FBQztZQUNKLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDUCxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLENBQUM7UUFDRixDQUFDLENBQUE7UUF6QkEsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLHNCQUFlLENBQXVCLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFNRCwyQ0FBVSxHQUFWLFVBQVcsT0FBZSxFQUFFLEtBQWlCO1FBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO1lBQ3hCLFVBQVUsRUFBRSxPQUFPO1lBQ25CLEtBQUssRUFBRSxLQUFLO1NBQ1osQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQWFELDJDQUFVLEdBQVYsVUFBVyxRQUFpQjtRQUMzQixFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3JCLENBQUM7SUFDRiw2QkFBQztBQUFELENBQUMsQUFwQ0QsSUFvQ0M7QUFNRCw2QkFBNkIsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQzNDO0lBQ0MsWUFBWSxDQUFDO0lBRWIsTUFBTSxDQUFDO1FBQ04sV0FBVztZQUNWLE1BQU0sQ0FBQyxJQUFJLHNCQUFzQixFQUFFLENBQUM7UUFDckMsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBRUQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUN2QixPQUFPLENBQUMsbUJBQVcsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDIn0=