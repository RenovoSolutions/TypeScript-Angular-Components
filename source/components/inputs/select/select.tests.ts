import { BehaviorSubject } from 'rxjs';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __guid = services.guid;

import { SelectComponent } from './select';

interface ITransformMock {
	getValue: Sinon.SinonSpy;
}

interface ITestOption {
	value: number;
}

interface IBusyMock {
	trigger: Sinon.SinonSpy;
}

describe('SelectComponent', () => {
	let dropdown: SelectComponent<ITestOption>;
	let options: ITestOption[];
	let setValue: Sinon.SinonSpy;
	let transformService: ITransformMock;
	let busy: IBusyMock;

	beforeEach(() => {
		transformService = { getValue: sinon.spy() };
		const validator: any = {
			validate: sinon.spy(),
			setValidators: sinon.spy(),
			afterInit: sinon.spy(),
		};

		dropdown = new SelectComponent<ITestOption>(transformService, null, validator, __object.objectUtility, null, __guid.guid);

		setValue = sinon.spy();
		dropdown.setValue = setValue;

		busy = { trigger: sinon.spy() };
		dropdown.busy = <any>busy;

		options = [
			{ value: 1 },
			{ value: 2 },
			{ value: 3 },
			{ value: 4 },
			{ value: 5 },
		];
	});

	describe('after init', (): void => {
		afterEach((): void => {
			sinon.assert.calledOnce(busy.trigger);
			sinon.assert.calledWith(busy.trigger, dropdown.wrappedOptions);
		});

		it('should wrap the array in an observable', (): void => {
			const unwrapper: Sinon.SinonSpy = sinon.spy();
			dropdown.options = options;

			dropdown.ngAfterViewInit();
			dropdown.wrappedOptions.subscribe(unwrapper);

			sinon.assert.calledOnce(unwrapper);
			sinon.assert.calledWith(unwrapper, options);
		});

		it('should leave the options untouched if already an observable', (): void => {
			const unwrapper: Sinon.SinonSpy = sinon.spy();
			const optionsStream: BehaviorSubject<ITestOption[]> = new BehaviorSubject(options);
			dropdown.options = optionsStream;

			dropdown.ngAfterViewInit();
			dropdown.wrappedOptions.subscribe(unwrapper);

			sinon.assert.calledOnce(unwrapper);
			sinon.assert.calledWith(unwrapper, options);
		});
	});

	describe('dropdown', (): void => {
		it('should toggle the options', (): void => {
			expect(dropdown.showOptions).to.be.undefined;

			dropdown.toggle();

			expect(dropdown.showOptions).to.be.true;

			dropdown.toggle();

			expect(dropdown.showOptions).to.be.false;
		});

		it('should close the options', (): void => {
			dropdown.showOptions = true;
			dropdown.close();
			expect(dropdown.showOptions).to.be.false;
		});

		it('should do nothing if the options are already closed', (): void => {
			dropdown.showOptions = false;
			dropdown.close();
			expect(dropdown.showOptions).to.be.false;
		});

		it('should set the value and close the options', (): void => {
			dropdown.showOptions = true;

			dropdown.select(options[1]);

			expect(dropdown.showOptions).to.be.false;
			sinon.assert.calledOnce(setValue);
			sinon.assert.calledWith(setValue, options[1]);
		});
	});

	it('should transform the item to a display name', (): void => {
		const option: ITestOption = { value: 3 };
		const transform: string = 'value';
		dropdown.transform = transform;

		dropdown.getDisplayName(option);

		sinon.assert.calledOnce(transformService.getValue);
		sinon.assert.calledWith(transformService.getValue, option, transform);
	});

	it('should return a clone of the template', (): void => {
		const template: any = {};
		dropdown.template = template;

		const clone: any = dropdown.newTemplate();

		expect(clone).to.not.equal(template);
		expect(clone).to.deep.equal(template);
	});

	it('should use an external template if one is specified', (): void => {
		const template: any = {};
		dropdown.externalTemplate = template;

		dropdown.ngOnInit();

		expect(dropdown.template).to.equal(template);
	});
});
