import { Observable } from 'rxjs';

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
			validate: sinon.spy(() => Observable.empty()),
		};

		dropdown = new SelectComponent<ITestOption>(transformService, null, validator, null, null, null);

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

	it('should set the value and close the options', (): void => {
		const closeSpy = sinon.spy();
		dropdown.list = <any>{
			close: closeSpy,
		};

		dropdown.select(options[1]);

		sinon.assert.calledOnce(closeSpy);
		sinon.assert.calledOnce(setValue);
		sinon.assert.calledWith(setValue, options[1]);
	});

	it('should close the options without setting the value if the current value is reselected', (): void => {
		const closeSpy = sinon.spy();
		dropdown.list = <any>{
			close: closeSpy,
		};
		dropdown.value = options[1];

		dropdown.select(options[1]);

		sinon.assert.calledOnce(closeSpy);
		sinon.assert.notCalled(setValue);
	});

	it('should transform the item to a display name', (): void => {
		const option: ITestOption = { value: 3 };
		const transform: string = 'value';
		dropdown.transform = transform;

		dropdown.getDisplayName(option);

		sinon.assert.calledOnce(transformService.getValue);
		sinon.assert.calledWith(transformService.getValue, option, transform);
	});

	it('should use an external template if one is specified', (): void => {
		const template: any = {};
		dropdown.externalTemplate = template;

		dropdown.ngAfterViewInit();

		expect(dropdown.template).to.equal(template);
	});
});
