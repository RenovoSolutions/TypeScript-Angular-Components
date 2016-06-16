import { Component } from '@angular/core';

import { CardContainerComponent } from '../cardContainer';

@Component({
	selector: 'rlItemCount',
	template: require('./itemCount.html'),
})
export class ItemCountComponent {
	cardContainer: CardContainerComponent;

	constructor(cardContainer: CardContainerComponent) {
		this.cardContainer = cardContainer;
	}
}
