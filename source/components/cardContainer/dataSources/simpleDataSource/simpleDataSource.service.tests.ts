/// <reference path='../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../typings/angularMocks.d.ts' />
/// <reference path='../../../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../../../typings/lodash/lodash.d.ts' />
/// <reference path='../../../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../dataSources.module.ts' />
/// <reference path='simpleDataSource.service.ts' />
/// <reference path='../dataSource.ts' />

module rl.ui.components.cardContainer.dataSources.simpleDataSource {
	import test = utilities.services.test;
	
	describe('simpleDataSource', () => {
		var simpleDataSourceFactory: ISimpleDataSourceFactory;
	
		beforeEach(() => {
			angular.mock.module(dataSources.moduleName);
			angular.mock.module(moduleName);

			var services: any = test.angularFixture.inject(factoryName);
			simpleDataSourceFactory = services[factoryName];
		});
	
		it('should set data set and filter count settings on base', (): void => {
			var source: IDataSource<number> = simpleDataSourceFactory.getInstance([1, 2, 3]);
	
			// inherit functionality from the dataSourceBase
			expect(_.isFunction(source.refresh)).to.be.true;
	
			expect(source.count).to.equal(3);
			expect(source.rawDataSet).to.have.length(3);
			expect(source.rawDataSet[0]).to.equal(1);
			expect(source.rawDataSet[1]).to.equal(2);
			expect(source.rawDataSet[2]).to.equal(3);
	
			expect(source.countFilterGroups).to.be.false;
		});
	});
}
