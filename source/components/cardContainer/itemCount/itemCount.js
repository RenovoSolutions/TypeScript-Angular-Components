"use strict";
var angular = require('angular');
exports.moduleName = 'rl.ui.components.cardContainer.itemCount';
exports.componentName = 'rlItemCount';
var itemCount = {
    require: { cardContainer: '?^^rlCardContainer' },
    template: require('./itemCount.html'),
    controllerAs: 'itemCount',
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, itemCount);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbUNvdW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbUNvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUV4QixrQkFBVSxHQUFXLDBDQUEwQyxDQUFDO0FBQ2hFLHFCQUFhLEdBQVcsYUFBYSxDQUFDO0FBRWpELElBQUksU0FBUyxHQUE4QjtJQUMxQyxPQUFPLEVBQUUsRUFBRSxhQUFhLEVBQUUsb0JBQW9CLEVBQUU7SUFDaEQsUUFBUSxFQUFFLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztJQUNyQyxZQUFZLEVBQUUsV0FBVztDQUN6QixDQUFDO0FBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMscUJBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQyJ9