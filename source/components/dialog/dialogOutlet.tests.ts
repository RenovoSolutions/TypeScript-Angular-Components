import { DialogOutletComponent } from './dialogOutlet';
import { DialogRootService } from './dialogRoot.service';

interface IJqueryBootstrapMock extends Sinon.SinonSpy {
	(): IJqueryBootstrapMock;
	modal: Sinon.SinonSpy;
	on: Sinon.SinonSpy;
}

describe('DialogOutletComponent', (): void => {
	let dialogOutlet: DialogOutletComponent;
	let dialogRoot: DialogRootService;
	let mockJquery: IJqueryBootstrapMock;
	let hideModal: Function;

	beforeEach((): void => {
		mockJquery = <any>sinon.spy(() => mockJquery);
		mockJquery.modal = sinon.spy();
		mockJquery.on = sinon.spy((event, func) => hideModal = func);

		dialogRoot = new DialogRootService();
		dialogOutlet = new DialogOutletComponent(dialogRoot, <any>mockJquery);
	});

	it('should show and hide the modal on open and close events', (): void => {
		dialogRoot.openDialog.next({});

		sinon.assert.calledOnce(mockJquery);
		sinon.assert.calledWith(mockJquery, '.rlModal');
		sinon.assert.calledOnce(mockJquery.modal);
		sinon.assert.calledWith(mockJquery.modal, 'show');

		mockJquery.reset();
		mockJquery.modal.reset();

		dialogRoot.closeDialog.next(null);

		sinon.assert.calledOnce(mockJquery);
		sinon.assert.calledWith(mockJquery, '.rlModal');
		sinon.assert.calledOnce(mockJquery.modal);
		sinon.assert.calledWith(mockJquery.modal, 'hide');
	});

	it('should set dismissing to true and fire a close event', (): void => {
		const closeSpy = sinon.spy();
		dialogRoot.closeDialog.subscribe(closeSpy);
		expect(dialogRoot.dismissing).to.be.false;

		dialogOutlet.dismiss();

		expect(dialogRoot.dismissing).to.be.true;
		sinon.assert.calledOnce(closeSpy);
	});

	describe('onClosing', (): void => {
		beforeEach((): void => {
			dialogOutlet.ngAfterViewInit();

			sinon.assert.calledOnce(mockJquery);
			sinon.assert.calledWith(mockJquery, '.rlModal');
			sinon.assert.calledOnce(mockJquery.on);
			sinon.assert.calledWith(mockJquery.on, 'hide.bs.modal');

			mockJquery.reset();
			mockJquery.on.reset();
		});

		it('should call on closing and cancel the close if the result is not true', (): void => {
			const event = { preventDefault: sinon.spy() };
			const onClosingSpy = sinon.spy(() => false);
			dialogRoot.onClosing = onClosingSpy;

			hideModal(event);

			sinon.assert.calledOnce(onClosingSpy);
			sinon.assert.calledOnce(event.preventDefault);
		});

		it('should call on closing without canceling the close if the result is true', (): void => {
			const event = { preventDefault: sinon.spy() };
			const onClosingSpy = sinon.spy(() => true);
			dialogRoot.onClosing = onClosingSpy;

			hideModal(event);

			sinon.assert.calledOnce(onClosingSpy);
			sinon.assert.notCalled(event.preventDefault);
		});

		it('should not call onClosing if dismissing', (): void => {
			const event = { preventDefault: sinon.spy() };
			const onClosingSpy = sinon.spy(() => false);
			dialogRoot.onClosing = onClosingSpy;
			dialogRoot.dismissing = true;

			hideModal(event);

			expect(dialogRoot.dismissing).to.be.false;
			sinon.assert.notCalled(onClosingSpy);
			sinon.assert.notCalled(event.preventDefault);
		});
	});
});