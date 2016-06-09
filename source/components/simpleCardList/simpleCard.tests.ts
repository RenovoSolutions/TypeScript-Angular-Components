import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __boolean = services.boolean;

import { SimpleCardComponent } from './simpleCard';
import { SimpleCardListComponent } from './simpleCardList';

interface IListMock {
	openCard: Sinon.SinonSpy;
	registerCard: Sinon.SinonSpy;
}

interface IFormMock {
	submit: Sinon.SinonSpy;
}

describe('SimpleCardComponent', () => {
	let card: SimpleCardComponent<any>;
	let list: IListMock;

	beforeEach(() => {
		list = {
			openCard: sinon.spy(() => true),
			registerCard: sinon.spy(),
		};

		card = new SimpleCardComponent(<any>list, new __boolean.BooleanUtility);
	});

	it('should register  with the list', (): void => {
		card.ngOnInit();

		sinon.assert.calledOnce(list.registerCard);
		sinon.assert.calledWith(list.registerCard, card);
	});

	it('should create an empty list if no list is provided', (): void => {
		card = new SimpleCardComponent(null, new __boolean.BooleanUtility);
		expect(card.list).to.exist;
	});

	describe('open close', (): void => {
		let form: IFormMock;

		beforeEach((): void => {
			form = { submit: sinon.spy(() => true) };
			card.rlForm = <any>form;
			card.ngOnInit();
		});

		it('should autosave and close the card if the card is open', (): void => {
			card.showContent = true;

			card.toggle();

			expect(card.showContent).to.be.false;
			sinon.assert.calledOnce(form.submit);
		});

		it('should not close if the form submit returns false', (): void => {
			form.submit = sinon.spy(() => false);
			card.showContent = true;

			card.toggle();

			expect(card.showContent).to.be.true;
		});

		it('should signal the list and then open if the card is closed', (): void => {
			const onOpenSpy: Sinon.SinonSpy = sinon.spy();
			card.onOpen.emit = onOpenSpy;

			expect(card.showContent).to.be.false;

			card.toggle();

			sinon.assert.calledOnce(list.openCard);
			sinon.assert.calledOnce(onOpenSpy);
			expect(card.showContent).to.be.true;
		});

		it('should not open the card if the list returns false', (): void => {
			const onOpenSpy: Sinon.SinonSpy = sinon.spy();
			card.onOpen.emit = onOpenSpy;
			list.openCard = sinon.spy(() => false);

			card.toggle();

			sinon.assert.calledOnce(list.openCard);
			sinon.assert.notCalled(onOpenSpy);
			expect(card.showContent).to.be.false;
		});

		it('should be able to open with an empty list', (): void => {
			card = new SimpleCardComponent(null, new __boolean.BooleanUtility);
			const onOpenSpy: Sinon.SinonSpy = sinon.spy();
			card.onOpen.emit = onOpenSpy;
			card.ngOnInit();

			card.toggle();

			sinon.assert.calledOnce(onOpenSpy);
			expect(card.showContent).to.be.true;
		});

		it('should return true to indicate that another card can be opened without closing or autosaving if always open is true', (): void => {
			card.showContent = true;
			card.alwaysOpen = true;
			expect(card.close()).to.be.true;
			expect(card.showContent).to.be.true;
		});
	});
});
