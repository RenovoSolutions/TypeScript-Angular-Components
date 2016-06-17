import * as angular from 'angular';

export let moduleName: string = 'rl.ui.components.cardContainer.itemCount';
export let componentName: string = 'rlItemCount';

let itemCount: angular.IComponentOptions = {
	require: { cardContainer: '?^^rlCardContainer' },
	template: require('./itemCount.ng1.html'),
	controllerAs: 'itemCount',
};

angular.module(moduleName, [])
	.component(componentName, itemCount);
