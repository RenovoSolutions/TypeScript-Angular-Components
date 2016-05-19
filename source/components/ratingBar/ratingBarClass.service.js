"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nQmFyQ2xhc3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhdGluZ0JhckNsYXNzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBO0lBQUE7SUFjQSxDQUFDO0lBYkEsd0NBQVEsR0FBUixVQUFTLFVBQWtCO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDcEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2YsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2pCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDOUIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNkLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDbkIsQ0FBQztJQUNGLENBQUM7SUFDRiw0QkFBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBZFksNkJBQXFCLHdCQWNqQyxDQUFBIn0=