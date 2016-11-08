import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __transform = services.transform;

import { IColumn } from '../../column';
import { ISortDirections, SortDirection } from '../../sorts/sortDirection';
import { ColumnHeaderTemplate } from '../../templates/columnHeader.template';
import { SizeForBreakpoints } from '../../card/headerColumn/sizeForBreakpoints';

@Component({
	selector: 'rlColumnHeader',
	template: require('./columnHeader.html'),
	providers: [SizeForBreakpoints],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnHeaderComponent<T> {
	@Input() column: IColumn<T>;
	@Input() sorting: string;
	@Input() headerTemplate: ColumnHeaderTemplate;
	@Output() sort: EventEmitter<void> = new EventEmitter<void>();

	sizeClass: string;

	sizeForBreakpoints: SizeForBreakpoints;
	sortDirection: ISortDirections = SortDirection;

	constructor(sizeForBreakpoints: SizeForBreakpoints) {
		this.sizeForBreakpoints = sizeForBreakpoints;
	}

	ngOnInit(): void {
		this.sizeClass = this.sizeForBreakpoints.getClass(this.column.size, this.column.styling);
	}
}
