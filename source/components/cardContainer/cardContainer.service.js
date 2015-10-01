var CardContainerService = (function () {
    function CardContainerService(cardContainer) {
        this.cardContainer = cardContainer;
        this.pager = cardContainer.pager;
        this.dataSource = cardContainer.dataSource;
        this.filters = cardContainer.filters;
    }
    CardContainerService.prototype.lookupFilter = function (type) {
        return this.filters[type];
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