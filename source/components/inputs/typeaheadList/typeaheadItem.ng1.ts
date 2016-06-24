import * as angular from 'angular';

export let componentName: string = 'rlTypeaheadListItem';

class TypeaheadItemController {
	transclude: angular.ITranscludeFunction;

	static $inject: string[] = ['$scope', '$element', '$compile'];
	constructor(private $scope: angular.IScope
		, private $element: angular.IAugmentedJQuery
		, private $compile: angular.ICompileService) { }

	$onInit() {
		let itemScope = this.$scope.$parent.$new();
		let contentArea: JQuery = this.$element.find('.content-target');
		if (this.transclude.isSlotFilled('listItemSlot')) {
			this.transclude(itemScope, (template: JQuery): void => {
				contentArea.append(template);
			}, null, 'listItemSlot');
		} else {
			let template: JQuery = contentArea.append(require('./defaultListItem.ng1.html'));
			this.$compile(template)(itemScope);
		}
	}
}

export let typeaheadItem: angular.IComponentOptions = {
	bindings: {
		transclude: '<',
	},
	controller: TypeaheadItemController,
	template: `<div class="content-target"></div>`,
};
