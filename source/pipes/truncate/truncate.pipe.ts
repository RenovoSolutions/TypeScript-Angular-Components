// Formats and optionally truncates and ellipsimogrifies a string for display in a card header

import { Pipe, PipeTransform } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __object = services.object;

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
	private objectUtility: __object.IObjectUtility;

	constructor(objectUtility: __object.ObjectUtility) {
		this.objectUtility = objectUtility;
	}

	transform(input?: string | number, truncateTo?: number, includeEllipses?: boolean): string {
		includeEllipses = includeEllipses == null ? false : includeEllipses;

		var out: string = this.objectUtility.isNullOrWhitespace(input) ? '' : input.toString();
		if (out.length) {
			if (truncateTo != null && out.length > truncateTo) {
				out = out.substring(0, truncateTo);
				if (includeEllipses) {
					out += '...';
				}
			}
		}
		return out;
	}
}
