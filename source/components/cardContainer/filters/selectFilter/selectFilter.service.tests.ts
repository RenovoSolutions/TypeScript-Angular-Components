import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __transform = services.transform;

import { SelectFilter } from './selectFilter.service';

interface ITestObj {
	value: number;
}

describe('SelectFilter', (): void => {
	let selectFilter: SelectFilter<ITestObj, any>;

	beforeEach(() => {
		selectFilter = new SelectFilter<ITestObj, any>({ valueSelector: 'value' }, __object.objectUtility, __transform.transform);
	});

	it('should push the value to the value stream', () => {
		const valueSpy = sinon.spy();
		(selectFilter as any).value$.next = valueSpy;
		const value = 3;

		selectFilter.select(value);

		sinon.assert.calledOnce(valueSpy);
		sinon.assert.calledWith(valueSpy, value);
	});

	it('should return true if the items value equal the selected value', (): void => {
		let item: ITestObj = { value: 1 };
		expect(selectFilter.predicate(item, 1)).to.be.true;
	});

	it('should return false if the items value does not equal the selected value', (): void => {
		let item: ITestObj = { value: 2};
		expect(selectFilter.predicate(item, 1)).to.be.false;
	});

	it('should return true if the items are equal but not the same instance', (): void => {
		let item1: any = { value: { prop: 2 } };
		let item2: any = { prop: 2 };

		expect(selectFilter.predicate(item1, item2)).to.be.true;
	});

	it('should allow for specifying a comparer', (): void => {
		let item1: any = { value: { prop: 2 } };
		let item2: any = { prop: 2, otherProp: 3 };

		selectFilter = new SelectFilter<ITestObj, any>({
			valueSelector: 'value',
			comparer: (item1: any, item2: any): boolean => { return item1.prop === item2.prop; },
		}, __object.objectUtility, __transform.transform);

		expect(selectFilter.predicate(item1, item2)).to.be.true;
	});
});
