/// <reference path='../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../typings/angularMocks.d.ts' />
/// <reference path='../../../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='dataPager.service.ts' />

module rl.ui.components.cardContainer.dataSources.dataPager {
	import test = utilities.services.test;
	
	describe('dataPager', () => {
		var dataPager: IDataPager;
	
		beforeEach(() => {
			angular.mock.module(moduleName);

			var services: any = test.angularFixture.inject(factoryName);
			var dataPagerFactory: IDataPagerFactory = services[factoryName];
			dataPager = dataPagerFactory.getInstance();
		});
	
		it('should restrict data set to page size', (): void => {
			dataPager.pageSize = 2;
			var result: number[] = dataPager.filter([1, 2, 3, 4]);
			expect(result).to.have.length(2);
			expect(result[0]).to.equal(1);
			expect(result[1]).to.equal(2);
		});
	
		it('should skip to indicated page', (): void => {
			dataPager.pageNumber = 3;
			dataPager.pageSize = 1;
			var result: number[] = dataPager.filter([1, 2, 3, 4]);
			expect(result).to.have.length(1);
			expect(result[0]).to.equal(3);
		});
	
		it('should be empty if page goes past the end', (): void => {
			dataPager.pageNumber = 2;
			dataPager.pageSize = 8;
			var result: number[] = dataPager.filter([1, 2, 3, 4]);
			expect(result).to.be.empty;
		});
	});
}
