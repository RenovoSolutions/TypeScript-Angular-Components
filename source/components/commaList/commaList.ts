import { Component, Input, OnInit } from '@angular/core';
import { take, map } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __transform = services.transform;

const defaultMaxValue: number = 1000000;

@Component({
	selector: 'rlCommaList',
	template: require('./commaList.html'),
})
export class CommaListComponent<T> implements OnInit {
	@Input() list: T[] = [];
	@Input() transform: __transform.ITransform<T, string>;
	@Input() max: number;

	remainingItems: number = 0;
	private object: __object.IObjectUtility;
	private transformService: __transform.ITransformService;

	constructor( object: __object.ObjectUtility
			, transformService: __transform.TransformService) {
		this.object = object;
		this.transformService = transformService;
	}

	ngOnInit(): void {
		this.max = this.max || defaultMaxValue;
	}

	getFirstItems(): string[] {
		this.remainingItems = this.list.length - this.max;
		const top: T[] = take(this.list, this.max);
		return map(top, (item: T): string => this.transformService.getValue(item, this.transform));
	}
}