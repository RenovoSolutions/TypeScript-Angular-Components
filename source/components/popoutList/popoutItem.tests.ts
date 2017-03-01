import { PopoutItemComponent } from './popoutItem';

interface IListServiceMock {
	isFocused: sinon.SinonSpy;
}

describe('PopoutItemComponent', () => {
	let item: PopoutItemComponent<string>;
	let listService: IListServiceMock;

	beforeEach(() => {
		listService = { isFocused: sinon.spy() };
		item = new PopoutItemComponent<string>(<any>listService);
	});

	it('should check the list to see if this item is focused', (): void => {
		listService.isFocused = sinon.spy(() => true);

		expect(item.focused).to.be.true;

		sinon.assert.calledOnce(listService.isFocused);
		sinon.assert.calledWith(listService.isFocused, item);
	});
});
