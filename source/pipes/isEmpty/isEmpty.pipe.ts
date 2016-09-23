import { Pipe, PipeTransform } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __object = services.object;

@Pipe({	name: 'isEmpty' })
export class IsEmptyPipe implements PipeTransform {
	private objectUtility: __object.IObjectUtility;

	constructor(objectUtility: __object.ObjectUtility) {
		this.objectUtility = objectUtility;
	}
	transform(input: any, trueWhenEmpty?: boolean): boolean {
		var isEmpty: boolean = this.objectUtility.isNullOrEmpty(input);

		if (trueWhenEmpty === false) {
			return !isEmpty;
		}
		return isEmpty;
	}
}
