import { Injectable } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __string = services.string;

import { xs, sm, md, lg } from '../../../../services/breakpoints/breakpoint';
import { IBreakpointSize } from '../../column';

@Injectable()
export class SizeForBreakpoints {
	stringUtility: __string.IStringUtility;

	constructor(stringUtility: __string.StringUtility) {
		this.stringUtility = stringUtility;
	}

	getClass(sizes: IBreakpointSize, styling: string): string {
		let classes: string[] = [];
		classes.push(this.getColumnClass(sizes, xs));
		classes.push(this.getColumnClass(sizes, sm));
		classes.push(this.getColumnClass(sizes, md));
		classes.push(this.getColumnClass(sizes, lg));

		return classes.join(' ') + ' ' + styling;
	}

	private getColumnClass(columnSizes: IBreakpointSize, attribute: string): string {
		const value: number | string = columnSizes[attribute];
		if (value > 0 && value !== 'hidden') {
			return this.stringUtility.substitute('col-{0}-{1}', attribute, <string>value);
		} else {
			return 'hidden-' + attribute;
		}
	}
}