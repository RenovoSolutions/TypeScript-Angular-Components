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
        this.contentChanges = new rxjs_1.Subject();
    }
    ContentProviderService.prototype.setContent = function (content, scope) {
        this.content = content;
        this.scope = scope;
        this.contentChanges.next({
            newContent: content,
            scope: scope,
        });
    };
    ContentProviderService.prototype.subscribe = function (action) {
        if (this.content != null) {
            action({
                newContent: this.getContent(),
                scope: this.scope,
            });
        }
        return this.contentChanges.subscribe(action);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudFByb3ZpZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250ZW50UHJvdmlkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrREFBK0Q7QUFFL0QsWUFBWSxDQUFDO0FBRWIsSUFBWSxFQUFFLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDOUIsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDNUIscUJBQXNDLE1BQU0sQ0FBQyxDQUFBO0FBRWxDLGtCQUFVLEdBQVcsdUNBQXVDLENBQUM7QUFDN0QsbUJBQVcsR0FBVyx3QkFBd0IsQ0FBQztBQWUxRDtJQUNDO1FBREQsaUJBK0NDO1FBN0JBLHlCQUFvQixHQUF5RCxVQUFDLGtCQUEwQztZQUN2SCxJQUFJLEtBQUssR0FBYyxJQUFJLENBQUM7WUFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsa0JBQWtCLENBQUMsVUFBQyxLQUFhLEVBQUUsZUFBMEI7b0JBQzVELEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDLENBQUMsQ0FBQztZQUNKLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDUCxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLENBQUM7UUFDRixDQUFDLENBQUE7UUF6QkEsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGNBQU8sRUFBbUIsQ0FBQztJQUN0RCxDQUFDO0lBTUQsMkNBQVUsR0FBVixVQUFXLE9BQWUsRUFBRSxLQUFpQjtRQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztZQUN4QixVQUFVLEVBQUUsT0FBTztZQUNuQixLQUFLLEVBQUUsS0FBSztTQUNaLENBQUMsQ0FBQztJQUNKLENBQUM7SUFhRCwwQ0FBUyxHQUFULFVBQVUsTUFBaUM7UUFDMUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQztnQkFDTixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ2pCLENBQUMsQ0FBQztRQUNKLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELDJDQUFVLEdBQVYsVUFBVyxRQUFpQjtRQUMzQixFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3JCLENBQUM7SUFDRiw2QkFBQztBQUFELENBQUMsQUEvQ0QsSUErQ0M7QUFNRCw2QkFBNkIsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQzNDO0lBQ0MsWUFBWSxDQUFDO0lBRWIsTUFBTSxDQUFDO1FBQ04sV0FBVztZQUNWLE1BQU0sQ0FBQyxJQUFJLHNCQUFzQixFQUFFLENBQUM7UUFDckMsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBRUQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUN2QixPQUFPLENBQUMsbUJBQVcsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDIn0=