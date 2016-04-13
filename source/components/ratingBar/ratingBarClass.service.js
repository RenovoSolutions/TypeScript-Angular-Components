'use strict';
var RatingBarClassService = (function () {
    function RatingBarClassService() {
    }
    RatingBarClassService.prototype.getClass = function (confidence) {
        if (confidence >= 0.8) {
            return 'very-high';
        }
        else if (confidence >= 0.6) {
            return 'high';
        }
        else if (confidence >= 0.4) {
            return 'medium';
        }
        else if (confidence >= 0.2) {
            return 'low';
        }
        else {
            return 'very-low';
        }
    };
    return RatingBarClassService;
}());
exports.RatingBarClassService = RatingBarClassService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nQmFyQ2xhc3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhdGluZ0JhckNsYXNzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBTWI7SUFBQTtJQWNBLENBQUM7SUFiQSx3Q0FBUSxHQUFSLFVBQVMsVUFBa0I7UUFDMUIsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNwQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDZixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDakIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2QsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNuQixDQUFDO0lBQ0YsQ0FBQztJQUNGLDRCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFkWSw2QkFBcUIsd0JBY2pDLENBQUEifQ==