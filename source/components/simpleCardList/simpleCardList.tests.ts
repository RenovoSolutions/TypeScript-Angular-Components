import { services } from 'typescript-angular-utilities';
import __number = services.number;

import { SimpleCardListComponent } from './simpleCardList';

interface ICardMock {
	close?: sinon.SinonSpy;
	alwaysOpen?: boolean;
	alternatingClass?: string;
}

describe('SimpleCardListComponent', () => {
	let list: SimpleCardListComponent<any>;
	let alwaysOpen: boolean;
	let cards: any[];

	beforeEach(() => {
		list = new SimpleCardListComponent(__number.numberUtility);
		cards = [];
		list.cardChildren = <any>{
			toArray: () => cards,
		};
	});

	it('should trigger all cards to close on openCard and return true if all are successful', (): void => {
		const card1: ICardMock = {
			close: sinon.spy(() => true),
		};
		const card2: ICardMock = {
			close: sinon.spy(() => true),
		};
		cards.push(<any>card1);
		cards.push(<any>card2);

		const canOpen: boolean = list.openCard();

		sinon.assert.calledOnce(card1.close);
		sinon.assert.calledOnce(card2.close);
		expect(canOpen).to.be.true;
	});

	it('should return false if at least one card cant open', (): void => {
		const card1: ICardMock = {
			close: sinon.spy(() => true),
		};
		const cardCantClose: ICardMock = {
			close: sinon.spy(() => false),
		};
		cards.push(<any>card1);
		cards.push(<any>cardCantClose);

		const canOpen: boolean = list.openCard();

		sinon.assert.calledOnce(card1.close);
		sinon.assert.calledOnce(cardCantClose.close);
		expect(canOpen).to.be.false;
	});

	it('should update alwaysOpen on each card on changes', (): void => {
		list.alwaysOpen = true;
		const card: ICardMock = {};
		cards.push(<any>card);

		list.ngOnChanges({
			alwaysOpen: <any>{ currentValue: true },
		});

		expect(card.alwaysOpen).to.be.true;
	});

	it('should set class card-odd on the even indexed cards', (): void => {
		const card1: ICardMock = {};
		const card2: ICardMock = {};
		cards.push(<any>card1);
		cards.push(<any>card2);
		list.alwaysOpen = true;

		list.ngAfterViewChecked();

		expect(card1.alternatingClass).to.equal('card-odd');
		expect(card1.alwaysOpen).to.be.true;
		expect(card2.alternatingClass).to.be.empty;
		expect(card2.alwaysOpen).to.be.true;
	});
});
