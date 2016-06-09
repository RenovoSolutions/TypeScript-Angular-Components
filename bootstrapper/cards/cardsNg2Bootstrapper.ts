import { Component } from '@angular/core';

import { SIMPLE_CARD_DIRECTIVES } from '../../source/components/simpleCardList/index';
import { CheckboxComponent } from '../../source/components/checkbox/checkbox';

@Component({
	selector: 'tsCardsBootstrapper',
	template: require('./cardsNg2.html'),
	directives: [
		SIMPLE_CARD_DIRECTIVES,
		CheckboxComponent,
	],
})
export class CardsBootstrapper {
	alwaysOpen: boolean = false;
}