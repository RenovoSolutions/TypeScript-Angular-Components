import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __transform = services.transform;

import { SelectFilter } from './selectFilter.module';

interface ITestObj {
	value: number;
}

describe('SelectFilter', (): void => {
	let selectFilter: SelectFilter<ITestObj, any>;

	beforeEach(() => {
		selectFilter = new SelectFilter({ valueSelector: 'value' }, __object.objectUtility, __transform.transform);
	});

	it('should return true if the items value equal the selected value', (): void => {
		let item: ITestObj = { value: 1 };

		selectFilter.selectedValue = 1;

		expect(selectFilter.filter(item)).to.be.true;
	});

	it('should return false if the items value does not equal the selected value', (): void => {
		let item: ITestObj = { value: 2};

		selectFilter.selectedValue = 1;

		expect(selectFilter.filter(item)).to.be.false;
	});

	it('should return true if the items are equal but not the same instance', (): void => {
		let item1: any = { value: { prop: 2 } };
		let item2: any = { prop: 2 };

		selectFilter.selectedValue = item2;

		expect(selectFilter.filter(item1)).to.be.true;
	});

	it('should allow for specifying a comparer', (): void => {
		let item1: any = { value: { prop: 2 } };
		let item2: any = { prop: 2, otherProp: 3 };

		selectFilter = new SelectFilter({
			valueSelector: 'value',
			comparer: (item1: any, item2: any): boolean => { return item1.prop === item2.prop; },
		}, __object.objectUtility, __transform.transform);
		selectFilter.selectedValue = item2;

		expect(selectFilter.filter(item1)).to.be.true;
	});
});
