var CardContainerService = (function () {
    function CardContainerService(cardContainer) {
        this.cardContainer = cardContainer;
        this.pager = cardContainer.dataSource.pager;
        this.dataSource = cardContainer.dataSource;
        this.searchFilter = cardContainer.searchFilter;
    }
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