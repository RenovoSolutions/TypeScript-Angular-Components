import { Component, Inject, Input, OnInit } from '@angular/core';
import * as ui from 'angular-ui-router';
import * as _ from 'lodash';

export interface IStep {
	title: string;
	subtitle?: string;
	onClick?: {(): Promise<any>};
	stateName?: string;
	count?: {(): number};
	isCompleted?: boolean | {(): boolean};
	isValid?: boolean | {(): boolean};
	isCurrent?: boolean;
}

export interface IConfiguredStep extends IStep {
	isActive: boolean;
	isLoading: boolean;
	getCompleted(): boolean;
	getValid(): boolean;
}

@Component({
	selector: 'rlMultiStepIndicator',
	template: require('./multiStepIndicator.html'),
})
export class MultiStepIndicatorComponent implements OnInit {
	@Input() steps: IConfiguredStep[];
	@Input() numbered: boolean;
	@Input() checked: boolean;

	private _state: ui.IStateService;

	constructor(@Inject('$state') state: ui.IStateService) {
		this._state = state;
	}

	ngOnInit() {
		this.configureSteps();
	}

	onClick(step: IConfiguredStep): Promise<void> {
		if (!this.anyLoading()) {
			step.isLoading = true;

			return step.onClick().then((): void => {
				step.isLoading = false;
			}).catch((error) => {
				step.isLoading = false;
				throw error;
			});
		}
		return null;
	}

	anyLoading(): boolean {
		return _.some(this.steps, (step: IConfiguredStep): boolean => {
			return step.isLoading;
		});
	}

	private configureSteps(): void {
		_.each(this.steps, (step: IConfiguredStep): void => {
			step.getCompleted = (): boolean => this.getIsCompleted(step);
			step.getValid = (): boolean => this.getIsValid(step);
			step.isActive = true;
			step.isCurrent = false;
			step.isLoading = false;

			if (!_.isFunction(step.onClick)) {
				if (step.stateName) {
					step.onClick = (): Promise<void> => this.redirectToState(step);

					if (this._state.includes(step.stateName)) {
						step.isCurrent = true;
					}
				}
				else {
					step.isActive = false;
				}
			}
		});
	}

	private redirectToState(step: IConfiguredStep): Promise<void> {
		return this._state.go(step.stateName).then((): void => {
			this.clearCurrentState();
			step.isCurrent = true;
		});
	}

	private clearCurrentState(): void {
		_.each(this.steps, (step: IStep): void => {
			step.isCurrent = false;
		});
	}

	private getIsCompleted(step: IConfiguredStep): boolean {
		return _.isFunction(step.isCompleted)
			? (<{(): boolean}>step.isCompleted)()
			: <boolean>step.isCompleted;
	}

	private setIsCompleted(step: IConfiguredStep, isCompleted: boolean): void {
		if (!_.isFunction(step.isCompleted)) {
			step.isCompleted = isCompleted;
		}
	}

	private getIsValid(step: IConfiguredStep): boolean {
		if (_.isFunction(step.isValid)) {
			return (<{(): boolean}>step.isValid)();
		} else if (!_.isUndefined(step.isValid != null)) {
			return <boolean>step.isValid;
		} else {
			return true;
		}
	}
}
