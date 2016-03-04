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
})();
exports.RatingBarClassService = RatingBarClassService;
//# sourceMappingURL=ratingBarClass.service.js.map