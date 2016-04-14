"use strict";
var angular = require('angular');
var cardContainerBuilder_service_1 = require('../../source/components/cardContainer/cardContainerBuilder.service');
var CardTestController = (function () {
    function CardTestController(cardContainerBuilderFactory) {
        var items = [
            { name: 'Item 1', value: 1 },
            { name: 'Item 2', value: 2 },
            { name: 'Item 3', value: 1 },
            { name: 'Item 4', value: 1 },
            { name: 'Item 5', value: 2 },
            { name: 'Item 6', value: 2 },
        ];
        this.builder = cardContainerBuilderFactory.getInstance();
        this.builder.dataSource.buildSimpleDataSource(items);
        this.builder.addColumn({
            label: 'Name',
            size: 6,
            getValue: 'name',
        });
        this.builder.addColumn({
            label: 'Value',
            size: 6,
            getValue: 'value',
            template: '<b>{{myItem.value}}</b>',
        });
        this.builder.renderFilters();
        this.builder.filters.buildModeFilterGroup({
            label: 'Mode Filter',
            type: 'modeFilter',
            getValue: 'value',
            options: [
                {
                    label: 'All',
                    displayAll: true,
                },
                {
                    label: '1',
                    value: 1,
                },
                {
                    label: '2',
                    value: 2,
                },
            ],
        });
    }
    CardTestController.$inject = [cardContainerBuilder_service_1.factoryName];
    return CardTestController;
}());
angular.module('app')
    .controller('CardTestController', CardTestController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZENvbnRhaW5lckJvb3RzdHJhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcmRDb250YWluZXJCb290c3RyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLDZDQUFtRyxvRUFBb0UsQ0FBQyxDQUFBO0FBT3hLO0lBSUMsNEJBQVksMkJBQXlEO1FBQ3BFLElBQU0sS0FBSyxHQUFnQjtZQUMxQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtZQUM1QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtZQUM1QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtZQUM1QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtZQUM1QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtZQUM1QixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtTQUM1QixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6RCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUN0QixLQUFLLEVBQUUsTUFBTTtZQUNiLElBQUksRUFBRSxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU07U0FDaEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDdEIsS0FBSyxFQUFFLE9BQU87WUFDZCxJQUFJLEVBQUUsQ0FBQztZQUNQLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFFBQVEsRUFBRSx5QkFBeUI7U0FDbkMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztZQUN6QyxLQUFLLEVBQUUsYUFBYTtZQUNwQixJQUFJLEVBQUUsWUFBWTtZQUNsQixRQUFRLEVBQUUsT0FBTztZQUNqQixPQUFPLEVBQUU7Z0JBQ1I7b0JBQ0MsS0FBSyxFQUFFLEtBQUs7b0JBQ1osVUFBVSxFQUFFLElBQUk7aUJBQ2hCO2dCQUNEO29CQUNDLEtBQUssRUFBRSxHQUFHO29CQUNWLEtBQUssRUFBRSxDQUFDO2lCQUNSO2dCQUNEO29CQUNDLEtBQUssRUFBRSxHQUFHO29CQUNWLEtBQUssRUFBRSxDQUFDO2lCQUNSO2FBQ0Q7U0FDRCxDQUFDLENBQUM7SUFDSixDQUFDO0lBNUNNLDBCQUFPLEdBQWEsQ0FBQywwQ0FBYyxDQUFDLENBQUM7SUE2QzdDLHlCQUFDO0FBQUQsQ0FBQyxBQWhERCxJQWdEQztBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ25CLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDIn0=