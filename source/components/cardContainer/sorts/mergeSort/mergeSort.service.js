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
}());
exports.MergeSort = MergeSort;
angular.module(exports.moduleName, [])
    .service(exports.serviceName, MergeSort);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VTb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZXJnZVNvcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyw2Q0FBZ0MsOEJBQThCLENBQUMsQ0FBQTtBQUlwRCxrQkFBVSxHQUFXLGdEQUFnRCxDQUFDO0FBQ3RFLG1CQUFXLEdBQVcsV0FBVyxDQUFDO0FBTTdDO0lBQUE7SUFpREEsQ0FBQztJQWhEQSx3QkFBSSxHQUFKLFVBQWdCLElBQWlCLEVBQUUsT0FBcUM7UUFDdkUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDYixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckIsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDL0IsQ0FBQztRQUVELElBQUksR0FBVyxDQUFDO1FBQ2hCLElBQUksSUFBVyxDQUFDO1FBQ2hCLElBQUksS0FBWSxDQUFDO1FBRWpCLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5QyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFekQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQVksSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU8sa0NBQWMsR0FBdEIsVUFBa0MsQ0FBWSxFQUFFLENBQVk7UUFDM0QsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDO2NBQ1Qsb0NBQUssQ0FBQyxhQUFhLENBQUMsSUFBSTtjQUN4QixDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsb0NBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLG9DQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTyx5QkFBSyxHQUFiLFVBQXlCLElBQWlCLEVBQUUsS0FBa0IsRUFBRSxPQUFvQztRQUNuRyxJQUFJLE1BQU0sR0FBZ0IsRUFBRSxDQUFDO1FBRTdCLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDcEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxvQ0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzVCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDUCxrREFBa0Q7Z0JBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDM0IsQ0FBQztRQUNGLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNmLENBQUM7SUFDRixnQkFBQztBQUFELENBQUMsQUFqREQsSUFpREM7QUFqRFksaUJBQVMsWUFpRHJCLENBQUE7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDIn0=