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
//# sourceMappingURL=contentProvider.service.js.map