import { Subject } from 'rxjs';
import { services } from 'typescript-angular-utilities';
import __object = services.object;

import { InputComponent } from './input.ng2';

interface IFormMock {
	form: IControlGroupMock;
}

interface IControlGroupMock {
	addControl: Sinon.SinonSpy;
}

interface IGuidMock {
	random: Sinon.SinonSpy;
}

interface IControlMock {
	valueChanges?: Subject<number>;
	updateValue?: Sinon.SinonSpy;
}

describe('base input', (): void => {
	let input: InputComponent<number>;
	let rlForm: IFormMock;
	let guid: IGuidMock;

	beforeEach((): void => {
		rlForm = {
			form: { addControl: sinon.spy() },
		};
		guid = { random: sinon.spy() };

		input = new InputComponent<number>(<any>rlForm, __object.objectUtility, guid);

		expect(input.value).to.be.undefined;
	});

	it('should generate a unique name if no name is provided', (): void => {
		guid.random = sinon.spy(() => 12345);
		input.ngOnInit();
		expect(input.name).to.equal('input-12345');
	});

	it('should leave the name untouched if specified by the user', (): void => {
		input.name = 'name';
		input.ngOnInit();
		expect(input.name).to.equal('name');
	});

	it('should add the control to the form using the name if a form is present', (): void => {
		const control: any = {};
		input.control = control;
		input.name = 'name';

		input.ngAfterViewInit();

		sinon.assert.calledOnce(rlForm.form.addControl);
		sinon.assert.calledWith(rlForm.form.addControl, 'name', control);
	});

	it('should subscribe to changes on the form, update the value, and emit the changes', (): void => {
		const control: IControlMock = { valueChanges: new Subject<number>() };
		input.control = <any>control;

		const changeSpy: Sinon.SinonSpy = sinon.spy();
		input.change.emit = changeSpy;

		input.initControl();

		control.valueChanges.next(3);

		expect(input.value).to.equal(3);
		sinon.assert.calledOnce(changeSpy);
		sinon.assert.calledWith(changeSpy, 3);
	});

	it('should initialize the control if none is present', (): void => {
		expect(input.control).to.not.exist;
		input.initControl();
		expect(input.control).to.exist;
	});

	it('should update the value, update the control value, and emit the changes', (): void => {
		const control: IControlMock = { updateValue: sinon.spy() };
		input.control = <any>control;

		const changeSpy: Sinon.SinonSpy = sinon.spy();
		input.change.emit = changeSpy;

		input.setValue(5);

		expect(input.value).to.equal(5);
		sinon.assert.calledOnce(control.updateValue);
		sinon.assert.calledWith(control.updateValue, 5);
		sinon.assert.calledOnce(changeSpy);
		sinon.assert.calledWith(changeSpy, 5);
	});

	it('should ignore updates if disabled', (): void => {
		input.disabled = true;
		input.setValue(4);
		expect(input.value).to.be.undefined;
	});
});