'use strict';
var SortDirection = (function () {
    function SortDirection(value) {
        this.value = value;
    }
    SortDirection.toggle = function (direction) {
        if (direction === SortDirection.ascending) {
            return SortDirection.descending;
        }
        else if (direction === SortDirection.descending) {
            return SortDirection.none;
        }
        else {
            return SortDirection.ascending;
        }
    };
    SortDirection.getFullName = function (direction) {
        'use strict';
        if (direction === SortDirection.ascending) {
            return 'ascending';
        }
        else if (direction === SortDirection.descending) {
            return 'descending';
        }
        else {
            return 'none';
        }
    };
    SortDirection.none = new SortDirection(0);
    SortDirection.ascending = new SortDirection(1);
    SortDirection.descending = new SortDirection(2);
    return SortDirection;
})();
exports.SortDirection = SortDirection;
//# sourceMappingURL=sortDirection.js.map