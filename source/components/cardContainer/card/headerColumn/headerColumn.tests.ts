import { CardHeaderColumnComponent } from './headerColumn';

interface ITransformMock {
	getValue: Sinon.SinonSpy;
}

interface ISizeForBreakpointsMock {
	getClass: Sinon.SinonSpy;
}

describe('CardHeaderColumnComponent', () => {
	let headerColumn: CardHeaderColumnComponent<number>;
	let transform: ITransformMock;
	let sizeForBreakpoints: ISizeForBreakpointsMock;

	beforeEach(() => {
		transform = {
			getValue: sinon.spy(),
		};
		sizeForBreakpoints = {
			getClass: sinon.spy(),
		};
		headerColumn = new CardHeaderColumnComponent<number>(transform, <any>sizeForBreakpoints);
		headerColumn.column = <any>{};
	});

	it('should transform the item to a value', () => {
		const item = 4;
		const column = { getValue: () => null };
		const value = 6;
		headerColumn.item = item;
		headerColumn.column = <any>column;
		transform.getValue = sinon.spy(() => value);

		expect(headerColumn.value).to.equal(value);
		sinon.assert.calledOnce(transform.getValue);
		sinon.assert.calledWith(transform.getValue, item, column.getValue);
	});

	it('should build a context object for ngOutletContext', () => {
		headerColumn.item = 4;
		const value = 6;
		transform.getValue = sinon.spy(() => value);

		const context = headerColumn.context;

		expect(context.$implicit).to.equal(value);
		expect(context.item).to.equal(headerColumn.item);
	});

	it('should set the sizeClass based on the column size settings', () => {
		headerColumn.column = <any>{
			size: 3,
			styling: 'my-class',
		};
		sizeForBreakpoints.getClass = sinon.spy(() => 'test-class');

		headerColumn.ngOnInit();

		sinon.assert.calledOnce(sizeForBreakpoints.getClass);
		sinon.assert.calledWith(sizeForBreakpoints.getClass, 3, 'my-class');
		expect(headerColumn.sizeClass).to.equal('test-class');
	});
});
