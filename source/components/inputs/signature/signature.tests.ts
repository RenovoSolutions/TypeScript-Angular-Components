import { SignatureComponent } from './signature';
import { emptySignature } from './emptySignature';

interface ICanvasMock {
	jSignature: Sinon.SinonSpy;
}

describe('SignatureComponent', () => {
	let signature: SignatureComponent;
	let setValue: Sinon.SinonSpy;
	let jqueryMock: Sinon.SinonSpy;

	beforeEach(() => {
		const validator: any = {
			validate: sinon.spy(),
			afterInit: sinon.spy(),
		};
		jqueryMock = sinon.spy(x => x);

		signature = new SignatureComponent(null, validator, null, null, null, jqueryMock);

		setValue = sinon.spy();
		signature.setValue = setValue;
	});

	it('should wrap the native element as a jquery element', () => {
		const nativeElement = <any>{};
		const canvas: any = { nativeElement: nativeElement };

		signature.canvas = canvas;

		sinon.assert.calledOnce(jqueryMock);
		expect(jqueryMock.firstCall.args[0]).to.equal(nativeElement);
		expect(signature.canvas).to.equal(nativeElement);
	});

	it('should clear the canvas if the element is not present', () => {
		(signature as any)._canvas = {};
		signature.canvas = null;
		expect(signature.canvas).to.be.null;
	});

	describe('image', () => {
		it('should get the value if present', () => {
			signature.value = '123';
			expect(signature.image).to.equal(signature.value);
		});

		it('should get an empty signature image if no value is present', () => {
			const emptySignature = 'none';
			signature.getEmptyImage = () => emptySignature;
			expect(signature.image).to.equal(emptySignature);
		});
	});

	describe('setDisabled', () => {
		beforeEach(() => {
			expect(signature.rendering).to.not.exist;
		});

		it('should trigger the canvas to render on init if not disabled', () => {
			signature.ngAfterViewInit();
			expect(signature.rendering).to.be.true;
		});

		it('should not trigger the canvas to render on init if disabled', () => {
			signature.disabled = true;
			signature.ngAfterViewInit();
			expect(signature.rendering).to.be.false;
		});

		it('should trigger the canvas to render when disabled changes to false', () => {
			signature.disabled = true;
			signature.ngOnChanges(<any>{ disabled: { currentValue: false } });
			expect(signature.rendering).to.be.true;
		});

		it('should not trigger the canvas to render when disabled changes to true', () => {
			signature.ngOnChanges(<any>{ disabled: { currentValue: true } });
			expect(signature.rendering).to.be.false;
		});
	});

	describe('ngAfterViewChecked', () => {
		let canvas: ICanvasMock;

		beforeEach(() => {
			canvas = {
				jSignature: sinon.spy(),
			};
			(signature as any)._canvas = canvas;
			signature.rendering = true;
		});

		it('should initialize the jSignature control and set rendering to false', () => {
			signature.ngAfterViewChecked();

			sinon.assert.calledOnce(canvas.jSignature);
			expect(signature.rendering).to.be.false;
		});

		it('should set the data of the jSignature control if a value is present', () => {
			signature.value = '123';

			signature.ngAfterViewChecked();

			sinon.assert.calledTwice(canvas.jSignature);
			const setArgs = canvas.jSignature.secondCall.args;
			expect(setArgs[0]).to.equal('setData');
			expect(setArgs[1]).to.equal(signature.value);
		});

		it('should trigger changes when a change event is received from the canvas', () => {
			let canvas = $('<div>');
			(signature as any)._canvas = canvas;
			const onChangeSpy = sinon.spy();
			signature.onChange = onChangeSpy;

			signature.ngAfterViewChecked();
			canvas.trigger('change');

			sinon.assert.calledOnce(onChangeSpy);
		});
	});

	describe('onChange', () => {
		let canvas: ICanvasMock;
		let signatureData: string;

		beforeEach(() => {
			signatureData = '123';
			canvas = {
				jSignature: sinon.spy(() => signatureData),
			};
			(signature as any)._canvas = canvas;
		});

		it('should get the current value from the signature and set it on the input', () => {
			signature.onChange();

			sinon.assert.calledOnce(canvas.jSignature);
			sinon.assert.calledWith(canvas.jSignature, 'getData', 'default');
			sinon.assert.calledOnce(setValue);
			sinon.assert.calledWith(setValue, signatureData);
		});
	});

	describe('reset', () => {
		let canvas: ICanvasMock;

		beforeEach(() => {
			canvas = {
				jSignature: sinon.spy(),
			};
			(signature as any)._canvas = canvas;
		});

		it('should reset the JSignature control and set the input value to null', () => {
			signature.reset();

			sinon.assert.calledOnce(canvas.jSignature);
			sinon.assert.calledWith(canvas.jSignature, 'reset');
			sinon.assert.calledOnce(setValue);
			sinon.assert.calledWith(setValue, null);
		});
	});

	it('should get the empty signature image', () => {
		expect(signature.getEmptyImage()).to.equal(emptySignature);
	});
});
