import * as angular from 'angular';

export const moduleName: string = 'TextModule';

const textComponent: angular.IComponentOptions = {
	transclude: true,
	template: '<span>{{$ctrl.text}}</span>',
	controller: TextController,
};

class TextController {
	text: string;

	static $inject: string[] = ['$transclude'];
	constructor(private $transclude: angular.ITranscludeFunction) { }

	$onInit(): void {
		this.$transclude((content: JQuery): void => {
			this.text = angular.element('<div></div>').append(content).html();
		});
	}
}

angular.module(moduleName, [])
	.component('tsText', textComponent);