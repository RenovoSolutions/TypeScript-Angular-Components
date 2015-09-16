/// <reference path='../../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../../typings/angularMocks.d.ts' />
/// <reference path='../../../../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='modeFilterGroup.service.ts' />

module rl.ui.components.cardContainer.filters.filterGroup.modeFilterGroup {
	import test = utilities.services.test;
	
	interface IModeFilterOptionMock {
		value: boolean;
	}
	
	interface ITestObject {
		flag?: boolean;
	}
	
	describe('modeFilterGroup', () => {
		var modeFilterGroupFactory: IModeFilterGroupFactory;
		var modeFilterGroup: IModeFilterGroup;
	
		beforeEach(() => {
			angular.mock.module(moduleName);

			var services: any = test.angularFixture.inject(factoryName);
			modeFilterGroupFactory = services[factoryName];
		});
	
		it('should build an option filter function that filters out items with a value not matching the mode', (): void => {
			var trueModeOption: IModeFilterOptionMock = {
				value: true,
			};
			var falseModeOption: IModeFilterOptionMock = {
				value: false,
			};
	
			modeFilterGroup = modeFilterGroupFactory.getInstance(<any>{
				options: [trueModeOption, falseModeOption],
				getValue(item: ITestObject): boolean {
					return item.flag;
				},
			});
	
			var trueObj: ITestObject = { flag: true };
			var falseObj: ITestObject = { flag: false };
			var emptyObj: ITestObject = {};
	
			modeFilterGroup.activeOption = <any>trueModeOption;
			expect(modeFilterGroup.filter(trueObj)).to.be.true;
			expect(modeFilterGroup.filter(falseObj)).to.be.false;
			expect(modeFilterGroup.filter(emptyObj)).to.be.false;
	
			modeFilterGroup.activeOption = <any>falseModeOption;
			expect(modeFilterGroup.filter(falseObj)).to.be.true;
			expect(modeFilterGroup.filter(trueObj)).to.be.false;
			expect(modeFilterGroup.filter(emptyObj)).to.be.false;
		});
	});
}
