import { Component, Input, Inject, forwardRef, OnInit } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __transform = services.transform;

import { IColumn } from '../../column';
import { ColumnContentTemplate } from '../../templates/columnContent.template';
import { SizeForBreakpoints } from './sizeForBreakpoints';
import { CardComponent } from '../card';

@Component({
	selector: 'rlCardHeaderColumn',
	template: require('./headerColumn.html'),
	providers: [SizeForBreakpoints],
})
export class CardHeaderColumnComponent<T> implements OnInit {
	@Input() column: IColumn<T>;
	@Input() item: T;
	@Input() columnTemplate: ColumnContentTemplate;

	get value(): string | number | boolean {
		return this.transformService.getValue(this.item, this.column.getValue);
	}

	get context(): any {
		return {
			$implicit: this.value,
			item: this.item,
		};
	}

	sizeClass: string;

	card: CardComponent<T>
	transformService: __transform.ITransformService;
	sizeForBreakpoints: SizeForBreakpoints;

	constructor(@Inject(forwardRef(() => CardComponent)) card: CardComponent<T>
			, @Inject(__transform.transformToken) transformService: __transform.ITransformService
			, sizeForBreakpoints: SizeForBreakpoints) {
		this.card = card;
		this.transformService = transformService;
		this.sizeForBreakpoints = sizeForBreakpoints;
	}

	ngOnInit(): void {
		this.sizeClass = this.sizeForBreakpoints.getClass(this.column.size, this.column.styling);
	}
}