import { Component, Input, SimpleChange, OnChanges } from '@angular/core';
import { every, each } from 'lodash';

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

	cards: SimpleCardComponent<T>[] = [];

	registerCard(card: SimpleCardComponent<T>): void {
		card.alwaysOpen = this.alwaysOpen;
		this.cards.push(card);
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
