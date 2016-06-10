import { SimpleCardListComponent } from './simpleCardList';

interface ICardMock {
	close?: Sinon.SinonSpy;
	alwaysOpen?: boolean;
}

describe('SimpleCardListComponent', () => {
	let list: SimpleCardListComponent<any>;
	let alwaysOpen: boolean;

	beforeEach(() => {
		list = new SimpleCardListComponent();
	});

	it('should save a list of cards and set alwaysOpen on them', (): void => {
		list.alwaysOpen = true;
		const card: ICardMock = {};

		list.registerCard(<any>card);

		expect(list.cards).to.have.length(1);
		expect(list.cards[0]).to.equal(card);
		expect(card.alwaysOpen).to.be.true;
	});

	it('should trigger all cards to close on openCard and return true if all are successful', (): void => {
		const card1: ICardMock = {
			close: sinon.spy(() => true),
		};
		const card2: ICardMock = {
			close: sinon.spy(() => true),
		};
		list.registerCard(<any>card1);
		list.registerCard(<any>card2);

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
		list.registerCard(<any>card1);
		list.registerCard(<any>cardCantClose);

		const canOpen: boolean = list.openCard();

		sinon.assert.calledOnce(card1.close);
		sinon.assert.calledOnce(cardCantClose.close);
		expect(canOpen).to.be.false;
	});

	it('should update alwaysOpen on each card on changes', (): void => {
		list.alwaysOpen = true;
		const card: ICardMock = {};
		list.registerCard(<any>card);

		list.ngOnChanges({
			alwaysOpen: <any>{ currentValue: true },
		});

		expect(card.alwaysOpen).to.be.true;
	});
});
