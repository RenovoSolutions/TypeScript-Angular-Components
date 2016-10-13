import * as angular from 'angular';

export const moduleName: string = 'TextModule';

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

const textComponent: angular.IComponentOptions = {
	transclude: true,
	template: '<span>{{$ctrl.text}}</span>',
	controller: TextController,
};

angular.module(moduleName, [])
	.component('tsText', textComponent);
