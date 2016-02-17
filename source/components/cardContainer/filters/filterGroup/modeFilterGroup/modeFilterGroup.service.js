'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var filterGroup_service_1 = require('../filterGroup.service');
exports.moduleName = 'rl.ui.components.cardContainer.filters.filterGroup.modeFilterGroup';
exports.factoryName = 'modeFilterGroup';
var ModeFilterGroup = (function (_super) {
    __extends(ModeFilterGroup, _super);
    function ModeFilterGroup(settings, object) {
        this.getValue = settings.getValue;
        settings.options = _.map(settings.options, this.buildModeOption.bind(this));
        _super.call(this, settings, object);
    }
    ModeFilterGroup.prototype.serialize = function () {
        var activeOption = this.activeOption;
        if (activeOption.displayAll) {
            return null;
        }
        return activeOption.value;
    };
    ModeFilterGroup.prototype.buildModeOption = function (option) {
        var _this = this;
        var modeOption = option;
        modeOption.filter = function (item) {
            if (modeOption.displayAll) {
                return true;
            }
            return _this.getValue(item) === modeOption.value;
        };
        return modeOption;
    };
    return ModeFilterGroup;
})(filterGroup_service_1.FilterGroup);
exports.ModeFilterGroup = ModeFilterGroup;
modeFilterGroupFactory.$inject = [__object.serviceName];
function modeFilterGroupFactory(object) {
    'use strict';
    return {
        getInstance: function (settings) {
            return new ModeFilterGroup(settings, object);
        },
    };
}
exports.modeFilterGroupFactory = modeFilterGroupFactory;
angular.module(exports.moduleName, [__object.moduleName])
    .factory(exports.factoryName, modeFilterGroupFactory);
//# sourceMappingURL=modeFilterGroup.service.js.map