import { Component } from '@angular/core';

import { CardContainerComponent } from '../../cardContainer';

@Component({
	selector: 'rlItemCount',
	template: require('./itemCount.html'),
})
export class ItemCountComponent<T> {
	cardContainer: CardContainerComponent<T>;

	constructor(cardContainer: CardContainerComponent<T>) {
		this.cardContainer = cardContainer;
	}
}
