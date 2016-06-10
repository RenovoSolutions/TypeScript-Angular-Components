import { Component } from '@angular/core';

import { SIMPLE_CARD_DIRECTIVES } from '../../source/components/simpleCardList/index';
import { CheckboxComponent } from '../../source/components/checkbox/checkbox';
import { TextboxComponent } from '../../source/components/textbox/textbox';

@Component({
	selector: 'tsCardsBootstrapper',
	template: require('./cardsNg2.html'),
	directives: [
		SIMPLE_CARD_DIRECTIVES,
		CheckboxComponent,
		TextboxComponent,
	],
})
export class CardsBootstrapper {
	alwaysOpen: boolean = false;

	submitAsync: { (data: any): Promise<void> } = (data: any) => {
		return new Promise<void>((resolve: Function, reject: Function): void => {
			setTimeout(() => {
				console.log(data);
				resolve();
			}, 1000);
		});
	}
}