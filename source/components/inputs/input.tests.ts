import { Subject } from 'rxjs';
import { services } from 'typescript-angular-utilities';
import __object = services.object;

import { InputComponent } from './input';

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
	setValue?: Sinon.SinonSpy;
	markAsDirty?: Sinon.SinonSpy;
}

describe('InputComponent', (): void => {
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

	it('should show the label if the form control already has a value set', (): void => {
		input.value = 12345;
		input.ngOnInit();

		expect(input.labelState).to.equal('show');
	});

	it('should hide the label if the form control has no value already set', (): void => {
		input.value = null;
		input.ngOnInit();

		expect(input.labelState).to.equal('hide');
	});

	it('should add the control to the form using the name if a form is present', (): void => {
		const control: any = { valueChanges: new Subject<number>() };
		input.control = control;
		input.name = 'name';

		input.ngAfterViewInit();

		sinon.assert.calledOnce(rlForm.form.addControl);
		sinon.assert.calledWith(rlForm.form.addControl, 'name', control);
	});

	it('should subscribe to changes on the form control and update the value', (): void => {
		const control: IControlMock = { valueChanges: new Subject<number>() };
		input.control = <any>control;

		input.ngAfterViewInit();

		control.valueChanges.next(3);

		expect(input.value).to.equal(3);
	});

	it('should initialize the control if none is present', (): void => {
		expect(input.control).to.not.exist;
		input.initControl();
		expect(input.control).to.exist;
	});

	it('should update the value, update the control value, and emit the changes', (): void => {
		const control: IControlMock = { setValue: sinon.spy(), markAsDirty: sinon.spy() };
		input.control = <any>control;

		const changeSpy: Sinon.SinonSpy = sinon.spy();
		input.change.emit = changeSpy;

		input.setValue(5);

		expect(input.value).to.equal(5);
		sinon.assert.calledOnce(control.markAsDirty);
		sinon.assert.calledOnce(control.setValue);
		sinon.assert.calledWith(control.setValue, 5);
		sinon.assert.calledOnce(changeSpy);
		sinon.assert.calledWith(changeSpy, 5);
	});

	it('should ignore updates if disabled', (): void => {
		input.disabled = true;
		input.setValue(4);
		expect(input.value).to.be.undefined;
	});

	it('should show the label', (): void => {
		input.showLabel();

		expect(input.labelState).to.equal('show');
	});

	it('should hide the label if the form control is empty', (): void => {
		input.value = null;
		input.hideLabelIfEmpty();

		expect(input.labelState).to.equal('hide');
	});

	it('should not hide the label if the form control has a value', (): void => {
		input.value = 12345;
		input.hideLabelIfEmpty();

		expect(input.labelState).to.equal('show');
	});

	it('should show the placeholder if the label is hidden', (): void => {
		input.labelState = 'hide';
		input.checkPlaceholder();

		expect(input.hidePlaceholder).to.be.false;
	});

	it('should hide the placeholder if the label is shown', (): void => {
		input.labelState = 'show';
		input.checkPlaceholder();

		expect(input.hidePlaceholder).to.be.true;
	});
});
