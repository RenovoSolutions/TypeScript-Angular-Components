"use strict";
var angular = require('angular');
var _ = require('lodash');
var cardContainerBuilder_service_1 = require('../../source/components/cardContainer/cardContainerBuilder.service');
exports.moduleName = 'CardTestModule';
var CardTestController = (function () {
    function CardTestController(cardContainerBuilderFactory) {
        var items = _.map(_.range(1, 101), function (num) {
            return { name: 'Item' + num, value: Math.floor(Math.random() * 2) + 1 };
        });
        this.options = [1, 2];
        this.builder = cardContainerBuilderFactory.getInstance();
        this.builder.dataSource.buildSimpleDataSource(items);
        this.builder.usePaging();
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
        this.builderWithSelectFilter = cardContainerBuilderFactory.getInstance();
        this.dataSource = this.builderWithSelectFilter.dataSource.buildSimpleDataSource(items);
        this.builderWithSelectFilter.usePaging();
        this.builderWithSelectFilter.addColumn({
            label: 'Name',
            size: 6,
            getValue: 'name',
        });
        this.builderWithSelectFilter.addColumn({
            label: 'Value',
            size: 6,
            getValue: 'value',
            template: '<b>{{myItem.value}}</b>',
        });
        this.selectFilter = this.builderWithSelectFilter.filters.buildSelectFilter({
            valueSelector: 'value',
        });
    }
    CardTestController.$inject = [cardContainerBuilder_service_1.factoryName];
    return CardTestController;
}());
CardRoute.$inject = ['$stateProvider'];
function CardRoute($stateProvider) {
    $stateProvider
        .state('cards', {
        url: '/cards',
        template: require('./cards.html'),
        controller: 'CardTestController',
        controllerAs: 'cards',
    });
}
angular.module(exports.moduleName, [])
    .controller('CardTestController', CardTestController)
    .config(CardRoute);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZENvbnRhaW5lckJvb3RzdHJhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcmRDb250YWluZXJCb290c3RyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQU1PLG9FQUFvRSxDQUFDLENBQUE7QUFFL0Qsa0JBQVUsR0FBVyxnQkFBZ0IsQ0FBQztBQU9uRDtJQVFDLDRCQUFZLDJCQUF5RDtRQUNwRSxJQUFNLEtBQUssR0FBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxVQUFDLEdBQVc7WUFDN0QsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sR0FBRyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV0QixJQUFJLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDdEIsS0FBSyxFQUFFLE1BQU07WUFDYixJQUFJLEVBQUUsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNO1NBQ2hCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQ3RCLEtBQUssRUFBRSxPQUFPO1lBQ2QsSUFBSSxFQUFFLENBQUM7WUFDUCxRQUFRLEVBQUUsT0FBTztZQUNqQixRQUFRLEVBQUUseUJBQXlCO1NBQ25DLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUM7WUFDekMsS0FBSyxFQUFFLGFBQWE7WUFDcEIsSUFBSSxFQUFFLFlBQVk7WUFDbEIsUUFBUSxFQUFFLE9BQU87WUFDakIsT0FBTyxFQUFFO2dCQUNSO29CQUNDLEtBQUssRUFBRSxLQUFLO29CQUNaLFVBQVUsRUFBRSxJQUFJO2lCQUNoQjtnQkFDRDtvQkFDQyxLQUFLLEVBQUUsR0FBRztvQkFDVixLQUFLLEVBQUUsQ0FBQztpQkFDUjtnQkFDRDtvQkFDQyxLQUFLLEVBQUUsR0FBRztvQkFDVixLQUFLLEVBQUUsQ0FBQztpQkFDUjthQUNEO1NBQ0QsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLHVCQUF1QixHQUFHLDJCQUEyQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RixJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQztZQUN0QyxLQUFLLEVBQUUsTUFBTTtZQUNiLElBQUksRUFBRSxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU07U0FDaEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQztZQUN0QyxLQUFLLEVBQUUsT0FBTztZQUNkLElBQUksRUFBRSxDQUFDO1lBQ1AsUUFBUSxFQUFFLE9BQU87WUFDakIsUUFBUSxFQUFFLHlCQUF5QjtTQUNuQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7WUFDMUUsYUFBYSxFQUFFLE9BQU87U0FDdEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQTVETSwwQkFBTyxHQUFhLENBQUMsMENBQWMsQ0FBQyxDQUFDO0lBNkQ3Qyx5QkFBQztBQUFELENBQUMsQUFwRUQsSUFvRUM7QUFFRCxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN2QyxtQkFBbUIsY0FBYztJQUNoQyxjQUFjO1NBQ1osS0FBSyxDQUFDLE9BQU8sRUFBRTtRQUNmLEdBQUcsRUFBRSxRQUFRO1FBQ2IsUUFBUSxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDakMsVUFBVSxFQUFFLG9CQUFvQjtRQUNoQyxZQUFZLEVBQUUsT0FBTztLQUNyQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixVQUFVLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUM7S0FDcEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDIn0=