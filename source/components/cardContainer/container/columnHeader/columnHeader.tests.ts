import { ColumnHeaderComponent } from './columnHeader';

interface ISizeForBreakpointsMock {
	getClass: Sinon.SinonSpy;
}

describe('ColumnHeaderComponent', () => {
	let columnHeader: ColumnHeaderComponent<number>;
	let sizeForBreakpoints: ISizeForBreakpointsMock;

	beforeEach(() => {
		sizeForBreakpoints = {
			getClass: sinon.spy(),
		};
		columnHeader = new ColumnHeaderComponent<number>(<any>sizeForBreakpoints);
	});

	it('should set the sizeClass based on the column size settings', () => {
		columnHeader.column = <any>{
			size: 3,
			styling: 'my-class',
		};
		sizeForBreakpoints.getClass = sinon.spy(() => 'test-class');

		columnHeader.ngOnInit();

		sinon.assert.calledOnce(sizeForBreakpoints.getClass);
		sinon.assert.calledWith(sizeForBreakpoints.getClass, 3, 'my-class');
		expect(columnHeader.sizeClass).to.equal('test-class');
	});
});
