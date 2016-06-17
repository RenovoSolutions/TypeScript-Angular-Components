import * as angular from 'angular';

export let headerComponentName: string = 'rlDefaultCardContainerHeader';
export let footerComponentName: string = 'rlDefaultCardContainerFooter';

export let defaultContainerHeader: angular.IComponentOptions = {
	template: require('./defaultCardContainerHeader.html'),
};

export let defaultContainerFooter: angular.IComponentOptions = {
	template: require('./defaultCardContainerFooter.html'),
};
