import * as angular from 'angular';

export let moduleName: string = 'rl.ui.behaviors.alias';
export let directiveName: string = 'rlAlias';
export let controllerName: string = 'AliasController';

export interface IAliasAttributes extends angular.IAttributes {
	rlAlias: string;
}

export class AliasController {
	static $inject: string[] = ['$scope', '$attrs', '$parse', '$interpolate'];
	constructor(private $scope: angular.IScope
			, private $attrs: IAliasAttributes
			, private $parse: angular.IParseService
			, private $interpolate: angular.IInterpolateService) {
		let initialValue: any = this.getValue();
		this.resolveAlias(initialValue);
		$scope.$watch(this.getValue.bind(this), this.resolveAlias.bind(this));
	}

	private expression: string[];

	private getValue(): any {
		this.expression = this.$attrs.rlAlias.split(' as ');
		return this.$parse(this.expression[0])(this.$scope);
	}

	private resolveAlias(value: any): void {
		let alias: string = this.$interpolate(this.expression[1])(this.$scope);
		if (alias != null) {
			this.$scope[alias] = value;
		}
	}
}

export function alias(): angular.IDirective {
	return {
		restrict: 'A',
		controller: controllerName,
	};
}

angular.module(moduleName, [])
	.directive(directiveName, alias)
	.controller(controllerName, AliasController);
