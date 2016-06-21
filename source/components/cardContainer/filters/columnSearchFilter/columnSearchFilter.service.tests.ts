import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __string = services.string;
import __transform = services.transform;

import { ColumnSearchFilter } from './columnSearchFilter.service';

import { ISort, SortDirection } from '../../sorts/index';

interface ITestObject {
	prop1?: string;
	prop2?: number;
	prop3?: boolean;
	prop4?: string;
}

describe('ColumnSearchFilter', () => {
	let columnSearchFilter: ColumnSearchFilter;

	beforeEach(() => {
		columnSearchFilter = new ColumnSearchFilter(__object.objectUtility, __string.stringUtility, __transform.transform);
	});

	it('should match objects containing the search within the designated column', (): void => {
		columnSearchFilter.column = <any>{
			getValue(data: ITestObject): string {
				return data.prop1;
			},
		};
		columnSearchFilter.searchText = 'value';
		columnSearchFilter.caseSensitive = true;

		let matchingObject: ITestObject = {
			prop1: 'some value',
			prop2: 5,
		};

		let objectWithoutMatch: ITestObject = {
			prop1: 'nope',
			prop2: 2.2,
		};

		let objectWithDifferentCase: ITestObject = {
			prop1: 'A VALUE',
		};

		let objectMissingValue: ITestObject = {
			prop3: false,
		};

		let objectWithValueInWrongColumn: ITestObject = {
			prop1: 'doesnt match',
			prop4: 'matching value',
		};

		expect(columnSearchFilter.filter(objectWithoutMatch)).to.be.false;
		expect(columnSearchFilter.filter(objectWithDifferentCase)).to.be.false;
		expect(columnSearchFilter.filter(matchingObject)).to.be.true;
		expect(columnSearchFilter.filter(objectMissingValue)).to.be.false;
		expect(columnSearchFilter.filter(objectWithValueInWrongColumn)).to.be.false;
	});

	it('should match objects containing the search within the designated column, regardless of case', (): void => {
		columnSearchFilter.column = <any>{
			getValue(data: ITestObject): string {
				return data.prop1;
			},
		};
		columnSearchFilter.searchText = 'value';
		columnSearchFilter.caseSensitive = false;

		let lowercaseMatch: ITestObject = {
			prop1: 'some value',
			prop2: 5,
		};

		let uppercaseMatch: ITestObject = {
			prop1: 'A VALUE',
		};

		expect(columnSearchFilter.filter(lowercaseMatch)).to.be.true;
		expect(columnSearchFilter.filter(uppercaseMatch)).to.be.true;
	});
});
