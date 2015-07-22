// uses typings/angularjs
// uses typings/bootstrap
// uses utility.d.ts

module rl.components.dialog {
	'use strict';
	
	export var moduleName: string = 'rl.components.dialog';
	
	export var directiveName: string = 'rlDialog';
	export var controllerName: string = 'DialogController';
	
	export interface IDialogScope extends ng.IScope {
		modal: JQuery;
		isOpen: boolean;
		hidden: boolean;
		dialogClass: string;
		closeHandler(): boolean;
	}
	
	interface IDialogAttributes extends ng.IAttributes {
		closeHandler: string;
	}
	
	dialog.$inject = [utilities.object.serviceName];
	export function dialog(objectUtility: utilities.object.IObjectUtility): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			transclude: true,
			templateUrl: 'components/dialog/dialog.html',
			scope: {
				isOpen: '=',
				dialogClass: '@',
				closeHandler: '&',
			},
			controller: controllerName,
			link(scope: IDialogScope, element: ng.IAugmentedJQuery, attrs: IDialogAttributes): void {
				var modalControl: JQuery = element.find('.modal');
				scope.modal = modalControl;
				var hasCloseHandler: boolean = objectUtility.isNullOrWhitespace(attrs.closeHandler) === false;
	
				modalControl.on('hide.bs.modal', (event: BaseJQueryEventObject): void => {
					if (hasCloseHandler && !scope.closeHandler()) {
						event.preventDefault();
						scope.$apply((): void => {
							scope.isOpen = true;
						});
						return;
					}
	
					scope.hidden = true;
	
					if (scope.isOpen) {
						scope.$apply((): void => {
							scope.isOpen = false;
						});
					}
				});
			}
		};
	}
	
	// broadcasts 'renovo.dialog.open' and 'renovo.dialog.close'
	
	export interface IDialogController {
		isOpen: boolean;
		open(): void;
		close(): void;
	}
	
	export class DialogController implements IDialogController {
		static $inject: string[] = ['$scope', '$rootScope'];
		constructor(private $scope: IDialogScope, private $rootScope: ng.IScope) {
			$scope.$watch('isOpen', (value: boolean): void => {
				if (value) {
					$scope.hidden = false;
					$rootScope.$broadcast('renovo.dialog.open');
					$scope.modal.modal();
				} else {
					$rootScope.$broadcast('renovo.dialog.close');
	
					if ($scope.hidden === false) {
						$scope.modal.modal('hide');
					}
				}
				this.isOpen = value;
			});
		}
	
		isOpen: boolean;
	
		open(): void {
			this.$scope.isOpen = true;
		}
	
		close(): void {
			this.$scope.isOpen = false;
		}
	}
	
	angular.module(moduleName, [utilities.object.moduleName])
		.directive(directiveName, dialog)
		.controller(controllerName, DialogController);
}
