import { PopoutListService } from './popoutList.service';

describe('PopoutListService', () => {
	let listService: PopoutListService<string>;

	beforeEach(() => {
		listService = new PopoutListService<string>();
	});

	it('should close the list on a select event', (): void => {
		const closeSpy = sinon.spy();
		listService.close = closeSpy;

		listService.select.next('value');

		sinon.assert.calledOnce(closeSpy);
	});

	describe('showOptions', (): void => {
		it('should close the options', (): void => {
			listService._showOptions = true;
			listService.close();
			expect(listService.showOptions).to.be.false;
		});

		it('should open the options', (): void => {
			listService.open();
			expect(listService.showOptions).to.be.true;
		});

		it('should return false if the list is disabled', (): void => {
			listService._showOptions = true;
			listService.disabled = true;
			expect(listService.showOptions).to.be.false;
		});
	});

	describe('focus', (): void => {
		beforeEach(() => {
			listService.listItems = <any>{ length: 2 };
			listService.customItems = <any>{ length: 2 };
		});

		it('should set the index to 0 if it was null', (): void => {
			listService.focusNext();
			expect(listService.focusIndex).to.equal(0);
		});

		it('should set the index to 0 if it was at the end of the lists', (): void => {
			listService.focusIndex = 3;

			listService.focusNext();

			expect(listService.focusIndex).to.equal(0);
		});

		it('should increment the index if in the middle of the lists', (): void => {
			listService.focusIndex = 0;

			listService.focusNext();

			expect(listService.focusIndex).to.equal(1);
		});

		it('should set the index to the end of the lists if it was null', (): void => {
			listService.focusPrevious();
			expect(listService.focusIndex).to.equal(3);
		});

		it('should set the index to the end of the lists if it was at 0', (): void => {
			listService.focusIndex = 0;

			listService.focusPrevious();

			expect(listService.focusIndex).to.equal(3);
		});

		it('should decrement the index if in the middle of the lists', (): void => {
			listService.focusIndex = 3;

			listService.focusPrevious();

			expect(listService.focusIndex).to.equal(2);
		});
	});

	describe('current', (): void => {
		let customItems;
		let listItems;

		beforeEach(() => {
			customItems = [{ value: 11 }, { value: 12 }];
			listItems = [{ value: 13 }, { value: 14 }];
			listService.customItems = <any>{
				length: 2,
				toArray: () => customItems,
			};
			listService.listItems = <any>{
				length: 2,
				toArray: () => listItems,
			};
		});

		it('should be null if the focus index is null', (): void => {
			expect(listService.current).to.be.null;
		});

		it('should index to the customItems array if within the range', (): void => {
			listService.focusIndex = 0;
			expect(listService.current).to.equal(customItems[0]);
		});

		it('should index to the listItems array if outside of the customItems range', (): void => {
			listService.focusIndex = 3;
			expect(listService.current).to.equal(listItems[1]);
		});

		it('should return true if the item is the current item', (): void => {
			listService.focusIndex = 3;
			expect(listService.isFocused(listItems[1])).to.be.true;
		});

		it('should emit a trigger event on the current item and clear the focus index', (): void => {
			const emitSpy = sinon.spy();
			listItems[1].trigger = { emit: emitSpy };
			listService.focusIndex = 3;

			listService.selectCurrent();

			sinon.assert.calledOnce(emitSpy);
			expect(listService.focusIndex).to.be.null;
		});

		it('should do nothing if there is no current item', (): void => {
			const emitSpy = sinon.spy();
			customItems[0].trigger = { emit: emitSpy };

			listService.selectCurrent();

			sinon.assert.notCalled(emitSpy);
		});
	});
});
