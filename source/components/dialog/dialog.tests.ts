import { isFunction } from 'lodash';
import { Subject } from 'rxjs';

import { DialogComponent } from './dialog';
import { DialogRootService, IDialogClosingHandler } from './dialogRoot.service';

import { AsyncHelper } from '../../services/async/async.service';

interface IGuidServiceMock {
	random: sinon.SinonSpy;
}

describe('DialogComponent', (): void => {
	let dialog: DialogComponent;
	let dialogRoot: DialogRootService;
	let mockGuidService: IGuidServiceMock;

	beforeEach((): void => {
		dialogRoot = new DialogRootService();
		mockGuidService = { random: sinon.spy() };
		dialog = new DialogComponent(<any>{}, new AsyncHelper(), null, dialogRoot, mockGuidService);
	});

	it('should open a dialog on the root with the current dialog\'s context', (): void => {
		dialog.header = <any>{};
		dialog.content = <any>{};
		dialog.footer = <any>{};
		dialog.autosave = true;
		dialog.size = 'sm';
		const openSpy = sinon.spy();
		dialogRoot.openDialog.subscribe(openSpy);

		dialog.open();

		sinon.assert.calledOnce(openSpy);
		const arg = openSpy.firstCall.args[0];
		expect(isFunction(arg.onClosing));
		expect(arg.header).to.equal(dialog.header);
		expect(arg.content).to.equal(dialog.content);
		expect(arg.footer).to.equal(dialog.footer);
		expect(arg.autosave).to.equal(dialog.autosave);
		expect(arg.size).to.equal(dialog.size);
		expect(isFunction(arg.submitAndClose));

		// cleanup active subscriptions
		dialogRoot.closeDialog.next();
	});

	it('should fire a close event on the root if the dialog is active', (): void => {
		const closeSpy = sinon.spy();
		dialogRoot.closeDialog.subscribe(closeSpy);
		dialog.isActive = true;

		dialog.close();

		sinon.assert.calledOnce(closeSpy);
	});

	it('should set dismissing and fire a close event on the root if the dialog is active', (): void => {
		expect(dialogRoot.dismissing).to.be.false;

		const closeSpy = sinon.spy();
		dialogRoot.closeDialog.subscribe(closeSpy);
		dialog.isActive = true;

		dialog.dismiss();

		expect(dialogRoot.dismissing).to.be.true;
		sinon.assert.calledOnce(closeSpy);
	});

	it('should do nothing if the dialog is inactive', (): void => {
		const closeSpy = sinon.spy();
		dialogRoot.closeDialog.subscribe(closeSpy);
		dialog.isActive = false;

		dialog.close();
		dialog.dismiss();

		sinon.assert.notCalled(closeSpy);
	});

	describe('submitAndClose', (): void => {
		let waitStream: Subject<boolean>;
		let submitAndWaitSpy: sinon.SinonSpy;
		let closeSpy: sinon.SinonSpy;

		beforeEach(() => {
			waitStream = new Subject<boolean>();
			submitAndWaitSpy = sinon.spy(() => waitStream);
			dialog.submitAndWait = submitAndWaitSpy;
			closeSpy = sinon.spy();
			dialog.close = closeSpy;
			dialog.isActive = true;
		});

		it('should close the dialog when the submit completes', (): void => {
			dialog.submitAndClose().subscribe();

			sinon.assert.calledOnce(submitAndWaitSpy);
			sinon.assert.notCalled(closeSpy);

			waitStream.next(true);

			sinon.assert.calledOnce(closeSpy);
		});

		it('should not close the dialog if the submit returns false', (): void => {
			dialog.submitAndClose().subscribe();

			sinon.assert.calledOnce(submitAndWaitSpy);
			sinon.assert.notCalled(closeSpy);

			waitStream.next(false);

			sinon.assert.notCalled(closeSpy);
		});
	});

	describe('onClosing', (): void => {
		it('should call on closing if specified and autosave is disabled', (): void => {
			const closingSpy = sinon.spy(() => false);
			dialog.onClosing = closingSpy;

			const canClose = dialog.wrapOnClosing();

			sinon.assert.calledOnce(closingSpy);
			expect(canClose).to.be.false;
		});

		it('should return true if onClosing is unspecified and autosave is disabled', (): void => {
			expect(dialog.wrapOnClosing()).to.be.true;
		});

		it('should submit and return the result if the form is dirty and autosave is enabled', (): void => {
			dialog.autosave = true;
			dialog.form = <any>{ dirty: true };
			const submitSpy = sinon.spy(() => false);
			dialog.submit = submitSpy;

			const canClose = dialog.wrapOnClosing();

			sinon.assert.calledOnce(submitSpy);
			expect(canClose).to.be.false;
		});

		it('should return true if the form is pristine and autosave is enabled', (): void => {
			dialog.autosave = true;
			expect(dialog.wrapOnClosing()).to.be.true;
		});
	});
});
