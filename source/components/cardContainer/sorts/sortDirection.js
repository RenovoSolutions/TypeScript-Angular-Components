"use strict";
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
}());
exports.SortDirection = SortDirection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydERpcmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNvcnREaXJlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BO0lBS0MsdUJBQW9CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQUksQ0FBQztJQUV4QixvQkFBTSxHQUFwQixVQUFxQixTQUF3QjtRQUM1QyxFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7UUFDakMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDM0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDaEMsQ0FBQztJQUNGLENBQUM7SUFFYSx5QkFBVyxHQUF6QixVQUEwQixTQUF3QjtRQUNqRCxZQUFZLENBQUM7UUFDYixFQUFFLENBQUMsQ0FBQyxTQUFTLEtBQUssYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNwQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNuRCxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3JCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDZixDQUFDO0lBQ0YsQ0FBQztJQXpCYSxrQkFBSSxHQUFrQixJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQyx1QkFBUyxHQUFrQixJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRCx3QkFBVSxHQUFrQixJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQXdCaEUsb0JBQUM7QUFBRCxDQUFDLEFBM0JELElBMkJDO0FBM0JZLHFCQUFhLGdCQTJCekIsQ0FBQSJ9