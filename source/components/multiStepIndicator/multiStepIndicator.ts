import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { each, some, isFunction, isUndefined } from 'lodash';

export interface IStep {
	title: string;
	subtitle?: string;
	onClick?: {(): Observable<any>};
	routerLink?: any[];
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

	private router: Router;

	constructor(router: Router) {
		this.router = router;
	}

	ngOnInit() {
		this.configureSteps();
	}

	onClick(step: IConfiguredStep): Observable<void> {
		if (!this.anyLoading()) {
			step.isLoading = true;

			const stream = Observable.from(step.onClick());
			stream.subscribe({ complete: () => step.isLoading = false });
			return stream;
		}
		return Observable.empty<void>();
	}

	anyLoading(): boolean {
		return some(this.steps, (step: IConfiguredStep): boolean => {
			return step.isLoading;
		});
	}

	private configureSteps(): void {
		each(this.steps, (step: IConfiguredStep): void => {
			step.getCompleted = (): boolean => this.getIsCompleted(step);
			step.getValid = (): boolean => this.getIsValid(step);
			step.isActive = true;
			step.isCurrent = false;
			step.isLoading = false;

			if (!isFunction(step.onClick)) {
				if (step.routerLink) {
					step.onClick = (): Observable<void> => this.redirectToState(step);

					if (this.router.isActive(this.router.createUrlTree(step.routerLink), false)) {
						step.isCurrent = true;
					}
				}
				else {
					step.isActive = false;
				}
			}
		});
	}

	private redirectToState(step: IConfiguredStep): Observable<void> {
		const stream = Observable.fromPromise(this.router.navigate(step.routerLink));
		stream.subscribe((): void => {
			this.clearCurrentState();
			step.isCurrent = true;
		});
		return stream.map(() => null);
	}

	private clearCurrentState(): void {
		each(this.steps, (step: IStep): void => {
			step.isCurrent = false;
		});
	}

	private getIsCompleted(step: IConfiguredStep): boolean {
		return isFunction(step.isCompleted)
			? (<{(): boolean}>step.isCompleted)()
			: <boolean>step.isCompleted;
	}

	private setIsCompleted(step: IConfiguredStep, isCompleted: boolean): void {
		if (!isFunction(step.isCompleted)) {
			step.isCompleted = isCompleted;
		}
	}

	private getIsValid(step: IConfiguredStep): boolean {
		if (isFunction(step.isValid)) {
			return (<{(): boolean}>step.isValid)();
		} else if (!isUndefined(step.isValid != null)) {
			return <boolean>step.isValid;
		} else {
			return true;
		}
	}
}
