/// <reference path='../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../typings/angularMocks.d.ts' />
/// <reference path='../../../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../../../typings/lodash/lodash.d.ts' />
/// <reference path='../../../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='filterGroup.module.ts' />
/// <reference path='filterGroup.service.ts' />

module rl.ui.components.cardContainer.filters.filterGroup {
	import test = utilities.services.test;
	
	interface IFilterOptionMock {
		label?: string;
		type?: string;
		filter: Sinon.SinonSpy;
		count?: number;
	}
	
	describe('filterGroup', () => {
		var filterGroupFactory: IFilterGroupFactory;
		var filterGroup: IFilterGroup;
	
		beforeEach(() => {
			angular.mock.module(moduleName);

			var services: any = test.angularFixture.inject(factoryName);
			filterGroupFactory = services[factoryName];
		});
	
		it('should filter on the active option', (): void => {
			var option1: IFilterOptionMock = { filter: sinon.spy() };
			var option2: IFilterOptionMock = { filter: sinon.spy() };
			filterGroup = filterGroupFactory.getInstance(<any>{
				options: [option1, option2],
			});
	
			expect(filterGroup.activeOption).to.equal(option1);
	
			filterGroup.filter(5);
	
			sinon.assert.calledWith(option1.filter, 5);
	
			filterGroup.activeOption = <any>option2;
	
			filterGroup.filter(8);
	
			sinon.assert.calledWith(option2.filter, 8);
		});
	
		it('should set the option counts on the matching options', (): void => {
			var optionWithExplicitType: IFilterOptionMock = {
				type: 'option1',
				filter: sinon.spy(),
			};
			var optionWithImplicitType: IFilterOptionMock = {
				label: 'option2',
				filter: sinon.spy(),
			};
	
			filterGroup = filterGroupFactory.getInstance(<any>{
				options: [optionWithExplicitType, optionWithImplicitType],
			});
	
			filterGroup.setOptionCounts(<any>{
				option1: 5,
				option2: 10,
			});
	
			expect(optionWithExplicitType.count).to.equal(5);
			expect(optionWithImplicitType.count).to.equal(10);
		});
	
		it('should calculate the option counts on the options by applying their filters and then calculating the length of the resulting data set'
			, (): void => {
			var option1: IFilterOptionMock = {
				filter: sinon.spy((item: number): boolean => {
					return item > 5;
				}),
			};
			var option2: IFilterOptionMock = {
				filter: sinon.spy((item: number): boolean => {
					return item <= 5;
				}),
			};
	
			filterGroup = filterGroupFactory.getInstance(<any>{
				options: [option1, option2],
			});
	
			filterGroup.updateOptionCounts(_.range(1, 11));
	
			expect(option1.count).to.equal(5);
			expect(option2.count).to.equal(5);
		});
	});
}
