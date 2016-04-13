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
}());
exports.SortDirection = SortDirection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydERpcmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNvcnREaXJlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBUWI7SUFLQyx1QkFBb0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7SUFBSSxDQUFDO0lBRXhCLG9CQUFNLEdBQXBCLFVBQXFCLFNBQXdCO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUNqQyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNuRCxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUMzQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxDQUFDO0lBQ0YsQ0FBQztJQUVhLHlCQUFXLEdBQXpCLFVBQTBCLFNBQXdCO1FBQ2pELFlBQVksQ0FBQztRQUNiLEVBQUUsQ0FBQyxDQUFDLFNBQVMsS0FBSyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3BCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ25ELE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNmLENBQUM7SUFDRixDQUFDO0lBekJhLGtCQUFJLEdBQWtCLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLHVCQUFTLEdBQWtCLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELHdCQUFVLEdBQWtCLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBd0JoRSxvQkFBQztBQUFELENBQUMsQUEzQkQsSUEyQkM7QUEzQlkscUJBQWEsZ0JBMkJ6QixDQUFBIn0=