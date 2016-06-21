import { Component, Input, Inject, SimpleChange, OnChanges, AfterViewChecked, ContentChildren, QueryList } from '@angular/core';
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
export class SimpleCardListComponent<T> implements OnChanges, AfterViewChecked {
	@Input() alwaysOpen: boolean;

	@ContentChildren(SimpleCardComponent) cardChildren: QueryList<SimpleCardComponent<T>>;

	get cards(): SimpleCardComponent<T>[] {
		return this.cardChildren != null
			? this.cardChildren.toArray()
			: [];
	}

	numberUtility: __number.INumberUtility;

	constructor(@Inject(__number.numberToken) numberUtility: __number.INumberUtility) {
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

	ngAfterViewChecked(): void {
		each(this.cards, (card: SimpleCardComponent<T>, index: number): void => {
			// mark the even indexed cards as 'odd', since they are the first, third, etc in the view
			card.alternatingClass = this.numberUtility.isEven(index)
								? 'card-odd'
								: '';
			if (this.alwaysOpen != null) {
				card.alwaysOpen = this.alwaysOpen;
			}
		});
	}
}
