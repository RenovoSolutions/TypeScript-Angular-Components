import { Component, Input, OnInit } from '@angular/core';

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
				stateName: 'ng2',
				subtitle: 'Do something',
				onClick: (): Promise<{}> => {
					return new Promise(
						function (resolve, reject) {
							console.log('Processing step 1');
							setTimeout(() => {
								console.log('Step 1 processed');
								resolve();
							}, 1000);
						}
					);
				},
			},
			{
				title: 'Step 2',
				subtitle: 'Do more work',
				onClick: (): Promise<{}> => {
					return new Promise(
						function (resolve, reject) {
							console.log('Processing step 2');
							setTimeout(() => {
								console.log('Step 2 processed');
								resolve();
							}, 1000);
						}
					);
				},
			},
		];
	}
}
