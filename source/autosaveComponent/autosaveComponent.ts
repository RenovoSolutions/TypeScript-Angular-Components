'use strict';

export var directiveName: string = 'rlAutosave';
export var controllerName: string = 'AutosaveComponentController';

import __parentChildBehavior = require('../../services/parentChildBehavior/parentChildBehavior.service');
import __objectUtility = require('../../services/objectUtility/objectUtility.service');
import __autosave = require('../../services/autosave/autosave.service');

export interface IAutosaveComponentController {
	autosave(): boolean;
}

export interface IAutosaveComponentAttributes extends ng.IAttributes {
	validate: string;
}

export interface IAutosaveComponentScope extends ng.IScope {
	childLink: __parentChildBehavior.IChild<any>;
	validate(): boolean;
	save(): ng.IPromise<void>;

	// private properties shared between the controller and scope
	contentForm: ng.IFormController;
}

export interface IAutosaveBehavior {
	autosave(): boolean;
}

export class AutosaveComponentController {
	static $inject: string[] = ['$scope', '$attrs', __parentChildBehavior.name, __objectUtility.name, __autosave.name];
	constructor(private $scope: IAutosaveComponentScope
		, $attrs: IAutosaveComponentAttributes
		, parentChildBehavior: __parentChildBehavior.IParentChildBehaviorService
		, objectUtility: __objectUtility.IObjectUtility
		, private autosaveService: __autosave.IAutosaveService) {
		this.hasValidator = objectUtility.isNullOrWhitespace($attrs.validate) === false;

		var behavior: IAutosaveBehavior = {
			autosave: this.autosave,
		};

		parentChildBehavior.registerChildBehavior(this.$scope.childLink, behavior);
	}

	private hasValidator: boolean;

	autosave: { (): boolean } = (): boolean => {
		if (this.$scope.contentForm.$pristine) {
			return true;
		}

		var valid: boolean = true;
		if (this.hasValidator) {
			valid = this.$scope.validate();
			if (valid === undefined) {
				valid = true;
			}
		}

		if (valid) {
			this.autosaveService.trigger(this.$scope.save().then((): void => {
				this.$scope.contentForm.$setPristine();
			}));
			return true;
		} else {
			return false;
		}
	}
}

export function autosaveComponent(): ng.IDirective {
	'use strict';
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'components/autosaveComponent/autosaveComponent.html',
		controller: controllerName,
		controllerAs: 'autosave',
		scope: {
			childLink: '=',
			validate: '&',
			save: '&',
		},
	};
}
