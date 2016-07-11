import { DialogRootService } from './dialogRoot.service';

describe('DialogRootService', (): void => {
	let dialogRoot: DialogRootService;

	beforeEach((): void => {
		dialogRoot = new DialogRootService();
	});

	it('should set the dialog context on open', (): void => {
		expect(dialogRoot.dialogContext).to.not.exist;

		const context = {};

		dialogRoot.openDialog.next(context);

		expect(dialogRoot.dialogContext).to.equal(context);
	});

	it('should call onClosing on the context or return true if unspecified', (): void => {
		expect(dialogRoot.onClosing()).to.be.true;

		const onClosing = sinon.spy(() => false);
		dialogRoot.openDialog.next({ onClosing: onClosing });

		const canClose = dialogRoot.onClosing();

		expect(canClose).to.be.false;
		sinon.assert.calledOnce(onClosing);
	});
});