import { Observable, Subject } from 'rxjs';

import { PopoutListComponent } from './popoutList';

interface ITransformMock {
	getValue: Sinon.SinonSpy;
}

interface IListServiceMock {
	open: Sinon.SinonSpy;
	close: Sinon.SinonSpy;
	select: Subject<any>;
	customItems: any[];
}

describe('PopoutListComponent', () => {
	let list: PopoutListComponent<string>;
	let options: string[];
	let transformService: ITransformMock;
	let listService: IListServiceMock;

	beforeEach(() => {
		transformService = { getValue: sinon.spy() };

		listService = {
			open: sinon.spy(),
			close: sinon.spy(),
			select: new Subject(),
			customItems: [],
		};

		list = new PopoutListComponent<string>(transformService, <any>listService);

		options = ['Option 1', 'Option 2', 'Option 3'];
		list.options = options;
	});

	describe('isEmpty', () => {
		it('should return false if the list has options', () => {
			expect(list.isEmpty).to.be.false;
		});

		it('should return false if the list service has custom options', () => {
			list.options = [];
			listService.customItems = ['Custom 1'];

			expect(list.isEmpty).to.be.false;
		});

		it('should return true if the options and custom options are empty', () => {
			list.options = [];
			expect(list.isEmpty).to.be.true;
		});
	});

	it('should emit a select event when a select is triggered on the list service', (): void => {
		const emitSpy = sinon.spy();
		list.select = <any>{ emit: emitSpy };

		listService.select.next('value');

		sinon.assert.calledOnce(emitSpy);
		sinon.assert.calledWith(emitSpy, 'value');
	});

	it('should call open and close on the list service', (): void => {
		list.close();

		sinon.assert.calledOnce(listService.close);

		list.open();

		sinon.assert.calledOnce(listService.open);
	});

	it('should transform the item to a display name', (): void => {
		const option: any = { value: 3 };
		const transform: any = x => x.value;
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
