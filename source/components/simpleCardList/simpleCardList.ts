import { Component, Input, SimpleChange, OnChanges, ContentChildren, QueryList } from '@angular/core';
import { every, each } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __number = services.number;

import { SimpleCardComponent } from './simpleCard';

export interface IListChanges {
	[key: string]: SimpleChange;
	alwaysOpen: SimpleChange;
}

@Component({
	selector: 'rlSimpleCardList,[rlSimpleCardList]',
	template: `
			<span class="card-list">
				<ng-content></ng-content>
			</span>`,
})
export class SimpleCardListComponent<T> implements OnChanges {
	@Input() alwaysOpen: boolean;

	@ContentChildren(SimpleCardComponent) cardChildren: QueryList<SimpleCardComponent<T>>;

	get cards(): SimpleCardComponent<T>[] {
		return this.cardChildren != null
			? this.cardChildren.toArray()
			: [];
	}

	numberUtility: __number.INumberUtility;

	constructor(numberUtility: __number.NumberUtility) {
		this.numberUtility = numberUtility;
	}

	openCard(): boolean {
		return every(this.cards, card => card.close());
	}

	ngOnChanges(changes: IListChanges): void {
		if (changes.alwaysOpen) {
			each(this.cards, card => { card.alwaysOpen = changes.alwaysOpen.currentValue; });
		}
	}
}
