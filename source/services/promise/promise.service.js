"use strict";
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.utilities.services.promise';
exports.serviceName = 'promiseUtility';
var PromiseUtility = (function () {
    function PromiseUtility($q, $injector) {
        this.$q = $q;
        this.$injector = $injector;
    }
    PromiseUtility.prototype.isPromise = function (promise) {
        return _.isObject(promise) && _.isFunction(promise.then) && _.isFunction(promise.catch);
    };
    PromiseUtility.prototype.resolvePromises = function (resolves) {
        var _this = this;
        var promises = {};
        _.each(resolves, function (value, key) {
            if (_.isFunction(value) || _.isArray(value)) {
                promises[key] = (_this.$q.when(_this.$injector.invoke(value)));
            }
            else if (_.isString(value)) {
                promises[key] = (_this.$q.when(_this.$injector.get(value)));
            }
            else {
                promises[key] = (_this.$q.when(value));
            }
        });
        return this.$q.all(promises);
    };
    PromiseUtility.$inject = ['$q', '$injector'];
    return PromiseUtility;
}());
angular.module(exports.moduleName, [])
    .service(exports.serviceName, PromiseUtility);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvbWlzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUVqQixrQkFBVSxHQUFXLCtCQUErQixDQUFDO0FBQ3JELG1CQUFXLEdBQVcsZ0JBQWdCLENBQUM7QUFRbEQ7SUFFQyx3QkFBb0IsRUFBcUIsRUFBVSxTQUF3QztRQUF2RSxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQStCO0lBQUcsQ0FBQztJQUUvRixrQ0FBUyxHQUFULFVBQVUsT0FBWTtRQUNyQixNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRUQsd0NBQWUsR0FBZixVQUFnQixRQUFhO1FBQTdCLGlCQWFDO1FBWkEsSUFBSSxRQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsS0FBVSxFQUFFLEdBQVE7WUFDckMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlELENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2QyxDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQXBCTSxzQkFBTyxHQUFhLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBcUJoRCxxQkFBQztBQUFELENBQUMsQUF0QkQsSUFzQkM7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDIn0=