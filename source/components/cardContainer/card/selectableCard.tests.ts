import { services } from 'typescript-angular-utilities';
import __boolean = services.boolean;
import __notification = services.notification;

import { FormService } from '../../../services/form/form.service';

import { SelectableCardComponent } from './selectableCard';

interface ICardContainerMock {
	selectionChanged?: any;
	registerCard: Sinon.SinonSpy;
}

describe('SelectableCardComponent', () => {
	let card: SelectableCardComponent<any>;
	let cardContainer: ICardContainerMock;

	beforeEach(() => {
		cardContainer = {
			selectionChanged: { emit: sinon.spy() },
			registerCard: sinon.spy(),
		};

		card = new SelectableCardComponent(new __notification.NotificationService(<any>{}, <any>{}), null, new FormService(), null, <any>cardContainer);
		card.item = { viewData: {} };
	});

	it('should provide a function for setting the selected property', (): void => {
		expect(card.item.viewData.selected).to.not.be.true;

		card.setSelected(true);

		expect(card.item.viewData.selected).to.be.true;

		card.setSelected(false);

		expect(card.item.viewData.selected).to.be.false;

		sinon.assert.calledTwice(cardContainer.selectionChanged.emit);
	});

	it('should toggle the selection', (): void => {
		expect(card.item.viewData.selected).to.not.be.true;

		card.toggleSelected();

		expect(card.item.viewData.selected).to.be.true;

		card.toggleSelected();

		expect(card.item.viewData.selected).to.be.false;

		sinon.assert.calledTwice(cardContainer.selectionChanged.emit);
	});
});
