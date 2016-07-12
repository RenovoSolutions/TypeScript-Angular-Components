import { Observable } from 'rxjs';

import { PopoutListComponent } from './popoutList';

interface ITransformMock {
	getValue: Sinon.SinonSpy;
}

describe('PopoutListComponent', () => {
	let list: PopoutListComponent<string>;
	let options: string[];
	let transformService: ITransformMock;

	beforeEach(() => {
		transformService = { getValue: sinon.spy() };

		list = new PopoutListComponent<string>(transformService);

		options = ['Option 1', 'Option 2', 'Option 3'];
		list.options = Observable.of(options);
	});

	describe('showOptions', (): void => {
		it('should toggle the options', (): void => {
			expect(list.showOptions).to.be.undefined;

			list.toggle();

			expect(list.showOptions).to.be.true;

			list.toggle();

			expect(list.showOptions).to.be.false;
		});

		it('should close the options', (): void => {
			list.showOptions = true;
			list.close();
			expect(list.showOptions).to.be.false;
		});

		it('should open the options', (): void => {
			list.showOptions = true;
			list.open();
			expect(list.showOptions).to.be.true;
		});
	});

	it('should transform the item to a display name', (): void => {
		const option: any = { value: 3 };
		const transform: string = x => x.value;
		list.transform = transform;

		list.getDisplayName(option);

		sinon.assert.calledOnce(transformService.getValue);
		sinon.assert.calledWith(transformService.getValue, option, transform);
	});

	it('should return a clone of the template', (): void => {
		const template: any = {};
		list.template = template;

		const clone: any = list.newTemplate();

		expect(clone).to.not.equal(template);
		expect(clone).to.deep.equal(template);
	});
});
