"use strict";
var RatingBarBackgroundService = (function () {
    function RatingBarBackgroundService() {
        this.standard = {
            type: 'standard',
            class: 'background',
        };
        this.dark = {
            type: 'dark',
            class: 'background-dark',
        };
        this.transparent = {
            type: 'transparent',
            class: 'background-transparent',
        };
    }
    RatingBarBackgroundService.prototype.getBackground = function (type) {
        if (type === this.dark.type) {
            return this.dark.class;
        }
        else if (type === this.transparent.type) {
            return this.transparent.class;
        }
        else {
            return this.standard.class;
        }
    };
    return RatingBarBackgroundService;
}());
exports.RatingBarBackgroundService = RatingBarBackgroundService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nQmFyQmFja2dyb3VuZHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhdGluZ0JhckJhY2tncm91bmRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVlBO0lBQUE7UUFDQyxhQUFRLEdBQW9CO1lBQzNCLElBQUksRUFBRSxVQUFVO1lBQ2hCLEtBQUssRUFBRSxZQUFZO1NBQ25CLENBQUM7UUFDRixTQUFJLEdBQW9CO1lBQ3ZCLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLGlCQUFpQjtTQUN4QixDQUFDO1FBQ0YsZ0JBQVcsR0FBb0I7WUFDOUIsSUFBSSxFQUFFLGFBQWE7WUFDbkIsS0FBSyxFQUFFLHdCQUF3QjtTQUMvQixDQUFDO0lBV0gsQ0FBQztJQVRBLGtEQUFhLEdBQWIsVUFBYyxJQUFZO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDL0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzVCLENBQUM7SUFDRixDQUFDO0lBQ0YsaUNBQUM7QUFBRCxDQUFDLEFBdkJELElBdUJDO0FBdkJZLGtDQUEwQiw2QkF1QnRDLENBQUEifQ==