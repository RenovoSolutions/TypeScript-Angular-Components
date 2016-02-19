var _ = require('lodash');
var CardContainerService = (function () {
    function CardContainerService(cardContainer) {
        this.cardContainer = cardContainer;
        this.pager = cardContainer.pager;
        this.dataSource = cardContainer.dataSource;
        this.filters = cardContainer.filters;
    }
    CardContainerService.prototype.lookupFilter = function (type) {
        return _.find(this.filters, function (filter) { return filter.type === type; });
    };
    Object.defineProperty(CardContainerService.prototype, "numberSelected", {
        get: function () {
            return this.cardContainer.numberSelected;
        },
        enumerable: true,
        configurable: true
    });
    return CardContainerService;
})();
exports.CardContainerService = CardContainerService;
//# sourceMappingURL=cardContainer.service.js.map