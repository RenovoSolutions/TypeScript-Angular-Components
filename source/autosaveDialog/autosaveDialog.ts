'use strict';

export var directiveName: string = 'rlAutosaveDialog';
export var controllerName: string = 'AutosaveDialogController';

import __parentChildBehavior = require('../../services/parentChildBehavior/parentChildBehavior.service');
import __autosaveComponent = require('../autosaveComponent/autosaveComponent');

export interface IAutosaveDialogController {
	isOpen: boolean;
	cancel(): void;
	saveAndClose(): void;
	autosave(): boolean;
	saveAction(): ng.IPromise<void>;
	saveOnClose: boolean;
	autosaveLink: __parentChildBehavior.IChild<__autosaveComponent.IAutosaveBehavior>;
	explicit: boolean;
}

export interface ISaveParams {
	explicit: boolean;
}

export interface IAutosaveDialogScope extends ng.IScope {
	isOpen: boolean;
	validate(): boolean;
	save(params: ISaveParams): ng.IPromise<void>;
}

export class AutosaveDialogController implements IAutosaveDialogController {
	static $inject: string[] = ['$scope', __parentChildBehavior.name];
	constructor(private $scope: IAutosaveDialogScope
			, private parentChildBehavior: __parentChildBehavior.IParentChildBehaviorService) {
		this.autosaveLink = { viewData: null };

		this.$scope.$watch('isOpen', (value: boolean): void => {
			this.isOpen = value;
			if (value) {
				this.saveOnClose = true;
			}
		});

		this.$scope.$watch((): boolean => { return this.isOpen; }, (value: boolean): void => {
			this.$scope.isOpen = value;
		});
	}

	autosaveLink: __parentChildBehavior.IChild<__autosaveComponent.IAutosaveBehavior>;
	isOpen: boolean;
	explicit: boolean = false;
	saveOnClose: boolean;

	cancel(): void {
		this.saveOnClose = false;
		this.isOpen = false;
	}

	saveAndClose(): void {
		this.saveOnClose = true;
		this.explicit = true;
		this.isOpen = false;
	}

	autosave: {(): boolean} = (): boolean => {
		if (this.saveOnClose === false) {
			return true;
		} else {
			var behavior: __autosaveComponent.IAutosaveBehavior = this.parentChildBehavior.getChildBehavior(this.autosaveLink);
			return behavior.autosave();
		}
	}

	saveAction(): ng.IPromise<void> {
		var params: ISaveParams = { explicit: this.explicit };
		this.explicit = false;
		return this.$scope.save(params);
	}
}

export class AutosaveDialog implements ng.IDirective {
	static instance(): ng.IDirective {
		return new AutosaveDialog();
	}

	restrict: string = 'E';
	transclude: boolean = true;
	templateUrl: string = 'components/autosaveDialog/autosaveDialog.html';
	controller: string = controllerName;
	controllerAs: string = 'dialog';
	scope: any = {
		isOpen: '=',
		validate: '&',
		save: '&',
	};
}
