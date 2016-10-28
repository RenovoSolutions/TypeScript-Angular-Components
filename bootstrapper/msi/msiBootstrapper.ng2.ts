import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IStep } from '../../source/components/multiStepIndicator/multiStepIndicator';

@Component({
	selector: 'tsMsiBootstrapper',
	template: require('./msi.ng2.html'),
})
export class MsiBootstrapperComponent implements OnInit {
	steps: IStep[];
	numbered: boolean;
	checked: boolean;

	constructor() {
		this.numbered = false;
		this.checked = true;
	}

	ngOnInit() {
		this.steps = [
			{
				title: 'Step 1',
				routerLink: ['/msi/ng1'],
				subtitle: 'Angular 1',
			},
			{
				title: 'Step 2',
				routerLink: ['/msi/ng2'],
				subtitle: 'Angular 2',
			},
			{
				title: 'Step 3',
				subtitle: 'Do more work',
				onClick: (): Observable<void> => {
					return Observable.of(null)
									.do(() => console.log('Processing step 3'))
									.delay(1000)
									.do(() => console.log('Step 3 processed'));
				},
			},
		];
	}
}
