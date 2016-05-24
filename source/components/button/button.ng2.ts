import { Component, EventEmitter } from '@angular/core';
import { each } from 'lodash';

export const baseInputs: string[] = ['type', 'disabled', 'size'];
export const baseOutputs: string[] = ['trigger'];

@Component({
	selector: 'rlButton',
	template: require('./button.ng2.html'),
	inputs: baseInputs,
	outputs: baseOutputs,
})
export class ButtonComponent {
	type: string;
	disabled: boolean;
	size: string;
	trigger: EventEmitter<any> = new EventEmitter();

	get configuredSize(): string {
		return this.size != null && this.size !== ''
			? 'btn-' + this.size
			: null;
	}

	get configuredTypes(): string {
		let type: string = this.type || 'default';
		let typesList: string[] = type.split(' ');
		each(typesList, (type: string, index: number): void => {
			//the for each for places that used btn-block for example in the type attribute do not break
			if (type.indexOf('btn-') === -1) {
				type = 'btn-' + type;
			}
			typesList[index] = type;
		});
		return typesList.join(' ');
	}
}