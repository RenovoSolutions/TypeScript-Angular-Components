import { Component, Input, OnInit } from '@angular/core';

import { IStep, MultiStepIndicatorComponent } from '../../source/components/multiStepIndicator/multiStepIndicator';

@Component({
    selector: 'tsMsiBootstrapper',
    template: require('./msi.ng2.html'),
	directives: [MultiStepIndicatorComponent]
})
export class MsiBootstrapperComponent implements OnInit {
	steps: IStep[];
	shit: string;
	numbered: boolean;
	checked: boolean;

    constructor() {
		this.shit = 'BITCH';
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
							console.log('Visited step 1');
							resolve();
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
							console.log('Visited step 2');
							resolve();
						}
					);
				},
			},
		];
    }
}