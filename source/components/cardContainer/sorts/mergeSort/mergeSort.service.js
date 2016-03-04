'use strict';
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
exports.moduleName = 'rl.ui.components.cardContainer.sorts.mergeSort';
exports.serviceName = 'mergeSort';
var MergeSort = (function () {
    function MergeSort() {
    }
    MergeSort.prototype.sort = function (data, compare) {
        if (data.length < 2) {
            return data;
        }
        if (compare == null) {
            compare = this.defaultCompare;
        }
        var mid;
        var left;
        var right;
        mid = data.length / 2;
        left = this.sort(data.slice(0, mid), compare);
        right = this.sort(data.slice(mid, data.length), compare);
        return this.merge(left, right, compare);
    };
    MergeSort.prototype.defaultCompare = function (a, b) {
        return a < b
            ? typescript_angular_utilities_1.types.CompareResult.less
            : (a > b ? typescript_angular_utilities_1.types.CompareResult.greater : typescript_angular_utilities_1.types.CompareResult.equal);
    };
    MergeSort.prototype.merge = function (left, right, compare) {
        var result = [];
        while (left.length && right.length) {
            if (compare(left[0], right[0]) === typescript_angular_utilities_1.types.CompareResult.greater) {
                result.push(right.shift());
            }
            else {
                // if equal it should preserve same order (stable)
                result.push(left.shift());
            }
        }
        if (left.length) {
            result.push.apply(result, left);
        }
        if (right.length) {
            result.push.apply(result, right);
        }
        return result;
    };
    return MergeSort;
})();
exports.MergeSort = MergeSort;
angular.module(exports.moduleName, [])
    .service(exports.serviceName, MergeSort);
//# sourceMappingURL=mergeSort.service.js.map