/// <reference path='../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../typings/angularMocks.d.ts' />
/// <reference path='../../../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='columnSearchFilter.service.ts' />

module rl.ui.components.cardContainer.filters.columnSearchFilter {
	import test = utilities.services.test;
	
	interface ITestObject {
		prop1?: string;
		prop2?: number;
		prop3?: boolean;
		prop4?: string;
	}
	
	describe('columnSearchFilter', () => {
		var columnSearchFilter: IColumnSearchFilter;
	
		beforeEach(() => {
			angular.mock.module(moduleName);

			var services: any = test.angularFixture.inject(factoryName);
			var columnSearchFilterFactory: IColumnSearchFilterFactory = services[factoryName];
			columnSearchFilter = columnSearchFilterFactory.getInstance();
		});
	
		it('should match objects containing the search within the designated column', (): void => {
			columnSearchFilter.column = <any>{
				getValue(data: ITestObject): string {
					return data.prop1;
				},
			};
			columnSearchFilter.searchText = 'value';
			columnSearchFilter.caseSensitive = true;
	
			var matchingObject: ITestObject = {
				prop1: 'some value',
				prop2: 5,
			};
	
			var objectWithoutMatch: ITestObject = {
				prop1: 'nope',
				prop2: 2.2,
			};
	
			var objectWithDifferentCase: ITestObject = {
				prop1: 'A VALUE',
			};
	
			var objectMissingValue: ITestObject = {
				prop3: false,
			};
	
			var objectWithValueInWrongColumn: ITestObject = {
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
	
			var lowercaseMatch: ITestObject = {
				prop1: 'some value',
				prop2: 5,
			};
	
			var uppercaseMatch: ITestObject = {
				prop1: 'A VALUE',
			};
	
			expect(columnSearchFilter.filter(lowercaseMatch)).to.be.true;
			expect(columnSearchFilter.filter(uppercaseMatch)).to.be.true;
		});
	});
}
