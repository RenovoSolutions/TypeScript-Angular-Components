"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VTb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZXJnZVNvcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsNkNBQXNCLDhCQUE4QixDQUFDLENBQUE7QUFJMUMsa0JBQVUsR0FBVyxnREFBZ0QsQ0FBQztBQUN0RSxtQkFBVyxHQUFXLFdBQVcsQ0FBQztBQU03QztJQUFBO0lBaURBLENBQUM7SUFoREEsd0JBQUksR0FBSixVQUFnQixJQUFpQixFQUFFLE9BQXFDO1FBQ3ZFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQy9CLENBQUM7UUFFRCxJQUFJLEdBQVcsQ0FBQztRQUNoQixJQUFJLElBQVcsQ0FBQztRQUNoQixJQUFJLEtBQVksQ0FBQztRQUVqQixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXpELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFZLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVPLGtDQUFjLEdBQXRCLFVBQWtDLENBQVksRUFBRSxDQUFZO1FBQzNELE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQztjQUNULG9DQUFLLENBQUMsYUFBYSxDQUFDLElBQUk7Y0FDeEIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLG9DQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxvQ0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRU8seUJBQUssR0FBYixVQUF5QixJQUFpQixFQUFFLEtBQWtCLEVBQUUsT0FBb0M7UUFDbkcsSUFBSSxNQUFNLEdBQWdCLEVBQUUsQ0FBQztRQUU3QixPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssb0NBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM1QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1Asa0RBQWtEO2dCQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLENBQUM7UUFDRixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDZixDQUFDO0lBQ0YsZ0JBQUM7QUFBRCxDQUFDLEFBakRELElBaURDO0FBakRZLGlCQUFTLFlBaURyQixDQUFBO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixPQUFPLENBQUMsbUJBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQyJ9