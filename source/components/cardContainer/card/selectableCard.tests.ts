import { services } from 'typescript-angular-utilities';
import __notification = services.notification;

import { FormService } from '../../../services/form/form.service';

import { SelectableCardComponent } from './selectableCard';

interface ICardContainerMock {
	setSelected: Sinon.SinonSpy;
}

interface IGuidServiceMock {
	random: Sinon.SinonSpy;
}

describe('SelectableCardComponent', () => {
	let card: SelectableCardComponent<any>;
	let cardContainer: ICardContainerMock;
	let mockGuidService: IGuidServiceMock;

	beforeEach(() => {
		cardContainer = {
			setSelected: sinon.spy(),
		};
		mockGuidService = { random: sinon.spy() };

		card = new SelectableCardComponent(new __notification.NotificationService(<any>{}, <any>{}), null, new FormService(), mockGuidService, null, <any>cardContainer);
		const randomId = 11;
		card.selection = <any>{ id: randomId };
	});

	it('should provide a function for setting the selected property', (): void => {
		card.setSelected(true);

		sinon.assert.calledOnce(cardContainer.setSelected);
		sinon.assert.calledWith(cardContainer.setSelected, [card.selection], true);

		cardContainer.setSelected.reset();

		card.setSelected(false);

		sinon.assert.calledOnce(cardContainer.setSelected);
		sinon.assert.calledWith(cardContainer.setSelected, [card.selection], false);
	});

	it('should toggle the selection', (): void => {
		expect(card.selection.selected).to.not.be.true;

		card.toggleSelected();

		sinon.assert.calledOnce(cardContainer.setSelected);
		sinon.assert.calledWith(cardContainer.setSelected, [card.selection], true);

		card.selection.selected = true;
		cardContainer.setSelected.reset();

		card.toggleSelected();

		sinon.assert.calledOnce(cardContainer.setSelected);
		sinon.assert.calledWith(cardContainer.setSelected, [card.selection], false);
	});
});
