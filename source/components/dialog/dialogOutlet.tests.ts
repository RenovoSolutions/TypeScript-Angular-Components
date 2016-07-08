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
	let mock$: IJqueryBootstrapMock;
	let original$: JQueryStatic;
	let hideModal: Function;

	beforeEach((): void => {
		mock$ = <any>sinon.spy(() => mock$);
		mock$.modal = sinon.spy();
		mock$.on = sinon.spy((event, func) => hideModal = func);
		original$ = $;
		$ = <any>mock$;

		dialogRoot = new DialogRootService();
		dialogOutlet = new DialogOutletComponent(dialogRoot);
	});

	afterEach(() => {
		$ = original$;
	});

	it('should show and hide the modal on open and close events', (): void => {
		dialogRoot.openDialog.next({});

		sinon.assert.calledOnce(mock$);
		sinon.assert.calledWith(mock$, '.rlModal');
		sinon.assert.calledOnce(mock$.modal);
		sinon.assert.calledWith(mock$.modal, 'show');

		mock$.reset();
		mock$.modal.reset();

		dialogRoot.closeDialog.next(null);

		sinon.assert.calledOnce(mock$);
		sinon.assert.calledWith(mock$, '.rlModal');
		sinon.assert.calledOnce(mock$.modal);
		sinon.assert.calledWith(mock$.modal, 'hide');
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

			sinon.assert.calledOnce(mock$);
			sinon.assert.calledWith(mock$, '.rlModal');
			sinon.assert.calledOnce(mock$.on);
			sinon.assert.calledWith(mock$.on, 'hide.bs.modal');

			mock$.reset();
			mock$.on.reset();
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
			const onClosingSpy = sinon.spy(() => false);
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