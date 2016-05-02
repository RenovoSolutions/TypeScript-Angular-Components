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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZENvbnRhaW5lckJvb3RzdHJhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcmRDb250YWluZXJCb290c3RyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUFtRyxvRUFBb0UsQ0FBQyxDQUFBO0FBRTNKLGtCQUFVLEdBQVcsZ0JBQWdCLENBQUM7QUFPbkQ7SUFJQyw0QkFBWSwyQkFBeUQ7UUFDcEUsSUFBTSxLQUFLLEdBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsVUFBQyxHQUFXO1lBQzdELE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEdBQUcsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUN0QixLQUFLLEVBQUUsTUFBTTtZQUNiLElBQUksRUFBRSxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU07U0FDaEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDdEIsS0FBSyxFQUFFLE9BQU87WUFDZCxJQUFJLEVBQUUsQ0FBQztZQUNQLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFFBQVEsRUFBRSx5QkFBeUI7U0FDbkMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztZQUN6QyxLQUFLLEVBQUUsYUFBYTtZQUNwQixJQUFJLEVBQUUsWUFBWTtZQUNsQixRQUFRLEVBQUUsT0FBTztZQUNqQixPQUFPLEVBQUU7Z0JBQ1I7b0JBQ0MsS0FBSyxFQUFFLEtBQUs7b0JBQ1osVUFBVSxFQUFFLElBQUk7aUJBQ2hCO2dCQUNEO29CQUNDLEtBQUssRUFBRSxHQUFHO29CQUNWLEtBQUssRUFBRSxDQUFDO2lCQUNSO2dCQUNEO29CQUNDLEtBQUssRUFBRSxHQUFHO29CQUNWLEtBQUssRUFBRSxDQUFDO2lCQUNSO2FBQ0Q7U0FDRCxDQUFDLENBQUM7SUFDSixDQUFDO0lBeENNLDBCQUFPLEdBQWEsQ0FBQywwQ0FBYyxDQUFDLENBQUM7SUF5QzdDLHlCQUFDO0FBQUQsQ0FBQyxBQTVDRCxJQTRDQztBQUVELFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3ZDLG1CQUFtQixjQUFjO0lBQ2hDLGNBQWM7U0FDWixLQUFLLENBQUMsT0FBTyxFQUFFO1FBQ2YsR0FBRyxFQUFFLFFBQVE7UUFDYixRQUFRLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQztRQUNqQyxVQUFVLEVBQUUsb0JBQW9CO1FBQ2hDLFlBQVksRUFBRSxPQUFPO0tBQ3JCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQztLQUNwRCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMifQ==