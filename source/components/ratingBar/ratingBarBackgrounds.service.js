'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nQmFyQmFja2dyb3VuZHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhdGluZ0JhckJhY2tncm91bmRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBY2I7SUFBQTtRQUNDLGFBQVEsR0FBb0I7WUFDM0IsSUFBSSxFQUFFLFVBQVU7WUFDaEIsS0FBSyxFQUFFLFlBQVk7U0FDbkIsQ0FBQztRQUNGLFNBQUksR0FBb0I7WUFDdkIsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsaUJBQWlCO1NBQ3hCLENBQUM7UUFDRixnQkFBVyxHQUFvQjtZQUM5QixJQUFJLEVBQUUsYUFBYTtZQUNuQixLQUFLLEVBQUUsd0JBQXdCO1NBQy9CLENBQUM7SUFXSCxDQUFDO0lBVEEsa0RBQWEsR0FBYixVQUFjLElBQVk7UUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztRQUMvQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDNUIsQ0FBQztJQUNGLENBQUM7SUFDRixpQ0FBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7QUF2Qlksa0NBQTBCLDZCQXVCdEMsQ0FBQSJ9