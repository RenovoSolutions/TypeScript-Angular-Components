import { Injectable, Inject } from '@angular/core';

import { services, downgrade } from 'typescript-angular-utilities';
import __string = services.string;

import { xs, sm, md, lg } from '../../../../services/breakpoints/breakpoint';
import { IBreakpointSize } from '../../column';

@Injectable()
export class SizeForBreakpoints {
	string: __string.IStringUtility;

	constructor( @Inject(__string.stringToken) string: __string.IStringUtility) {
		this.string = string;
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
			return this.string.substitute('col-{0}-{1}', attribute, <string>value);
		} else {
			return 'hidden-' + attribute;
		}
	}
}