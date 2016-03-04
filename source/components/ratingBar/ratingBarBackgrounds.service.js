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
})();
exports.RatingBarBackgroundService = RatingBarBackgroundService;
//# sourceMappingURL=ratingBarBackgrounds.service.js.map