// /// <reference path="../../../typings/jquery/jquery.d.ts" />
'use strict';
var ng = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __observable = typescript_angular_utilities_1.services.observable;
exports.moduleName = 'rl.utilities.services.contentProvider';
exports.serviceName = 'contentProviderFactory';
var ContentProviderService = (function () {
    function ContentProviderService(observableFactory) {
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
        this.observable = observableFactory.getInstance();
    }
    ContentProviderService.prototype.setContent = function (content, scope) {
        this.content = content;
        this.scope = scope;
        this.observable.fire('contentChanged');
    };
    ContentProviderService.prototype.register = function (action, selector) {
        var _this = this;
        if (this.content != null) {
            action(this.getContent(selector), this.scope);
        }
        return this.observable.register(function () {
            action(_this.getContent(selector), _this.scope);
        }, 'contentChanged');
    };
    ContentProviderService.prototype.getContent = function (selector) {
        if (selector != null) {
            return this.content.filter(selector);
        }
        return this.content;
    };
    return ContentProviderService;
}());
contentProviderServiceFactory.$inject = [__observable.factoryName];
function contentProviderServiceFactory(observableFactory) {
    'use strict';
    return {
        getInstance: function () {
            return new ContentProviderService(observableFactory);
        }
    };
}
ng.module(exports.moduleName, [__observable.moduleName])
    .factory(exports.serviceName, contentProviderServiceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudFByb3ZpZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb250ZW50UHJvdmlkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrREFBK0Q7QUFFL0QsWUFBWSxDQUFDO0FBRWIsSUFBWSxFQUFFLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDOUIsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFFeEQsSUFBTyxZQUFZLEdBQUcsdUNBQVEsQ0FBQyxVQUFVLENBQUM7QUFFL0Isa0JBQVUsR0FBVyx1Q0FBdUMsQ0FBQztBQUM3RCxtQkFBVyxHQUFXLHdCQUF3QixDQUFDO0FBUzFEO0lBQ0MsZ0NBQVksaUJBQXlEO1FBRHRFLGlCQTJDQztRQTVCQSx5QkFBb0IsR0FBeUQsVUFBQyxrQkFBMEM7WUFDdkgsSUFBSSxLQUFLLEdBQWMsSUFBSSxDQUFDO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLGtCQUFrQixDQUFDLFVBQUMsS0FBYSxFQUFFLGVBQTBCO29CQUM1RCxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxlQUFlLENBQUMsQ0FBQztnQkFDekMsQ0FBQyxDQUFDLENBQUM7WUFDSixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixDQUFDO1FBQ0YsQ0FBQyxDQUFBO1FBdEJBLElBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQU1ELDJDQUFVLEdBQVYsVUFBVyxPQUFlLEVBQUUsS0FBaUI7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBYUQseUNBQVEsR0FBUixVQUFTLE1BQTRELEVBQUUsUUFBaUI7UUFBeEYsaUJBUUM7UUFQQSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDL0IsTUFBTSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCwyQ0FBVSxHQUFWLFVBQVcsUUFBaUI7UUFDM0IsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNyQixDQUFDO0lBQ0YsNkJBQUM7QUFBRCxDQUFDLEFBM0NELElBMkNDO0FBTUQsNkJBQTZCLENBQUMsT0FBTyxHQUFHLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ25FLHVDQUF1QyxpQkFBeUQ7SUFDL0YsWUFBWSxDQUFDO0lBRWIsTUFBTSxDQUFDO1FBQ04sV0FBVztZQUNWLE1BQU0sQ0FBQyxJQUFJLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDdEQsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBRUQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzlDLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLDZCQUE2QixDQUFDLENBQUMifQ==