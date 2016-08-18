import { Injectable } from '@angular/core';
import { isObject } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __string = services.string;
import __object = services.object;

import { xs, sm, md, lg } from '../../../../services/breakpoints/breakpoint';
import { IBreakpointSize } from '../../column';

@Injectable()
export class SizeForBreakpoints {
	stringUtility: __string.IStringUtility;
	objectUtility: __object.IObjectUtility;

	constructor(stringUtility: __string.StringUtility
			, objectUtility: __object.ObjectUtility) {
		this.stringUtility = stringUtility;
		this.objectUtility = objectUtility;
	}

	getClass(sizes: IBreakpointSize | number, styling: string): string {
		sizes = this.buildSizes(sizes);
		let classes: string[] = [];
		classes.push(this.getColumnClass(sizes, xs));
		classes.push(this.getColumnClass(sizes, sm));
		classes.push(this.getColumnClass(sizes, md));
		classes.push(this.getColumnClass(sizes, lg));

		return classes.join(' ') + ' ' + styling;
	}

	buildSizes(sizes: IBreakpointSize | number): IBreakpointSize {
		// mutates the original size. If necessary, we could clone here
		if (isObject(sizes)) {
			sizes[xs] = this.objectUtility.valueOrDefault(sizes[xs], 0);
			sizes[sm] = this.objectUtility.valueOrDefault(sizes[sm], sizes[xs]);
			sizes[md] = this.objectUtility.valueOrDefault(sizes[md], sizes[sm]);
			sizes[lg] = this.objectUtility.valueOrDefault(sizes[lg], sizes[md]);
		} else {
			sizes = {
				xs: <number>sizes,
				sm: <number>sizes,
				md: <number>sizes,
				lg: <number>sizes,
			};
		}
		return sizes;
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