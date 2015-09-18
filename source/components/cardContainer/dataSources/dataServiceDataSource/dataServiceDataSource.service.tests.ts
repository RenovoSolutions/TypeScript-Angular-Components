/// <reference path='../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../typings/angularMocks.d.ts' />
/// <reference path='../../../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../../../typings/lodash/lodash.d.ts' />
/// <reference path='../../../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../dataSources.module.ts' />
/// <reference path='dataServiceDataSource.service.ts' />
/// <reference path='../dataSource.ts' />

module rl.ui.components.cardContainer.dataSources.dataServiceDataSource {
	import test = utilities.services.test;
	
	interface IDataServiceMock {
		get<TDataType>(): ng.IPromise<TDataType[]>;
	}
	
	describe('dataServiceDataSource', () => {
		var dataServiceDataSourceFactory: IDataServiceDataSourceFactory;
		var dataSourceProcessor: IDataSourceProcessor;
		var dataService: IDataServiceMock;
		var $rootScope: ng.IRootScopeService;
	
		beforeEach(() => {
			angular.mock.module(dataSources.moduleName);
			angular.mock.module(moduleName);

			dataService = test.mock.service();
	
			var services: any = test.angularFixture.inject(factoryName, processorServiceName, '$rootScope');
			dataServiceDataSourceFactory = services[factoryName];
			dataSourceProcessor = services[processorServiceName];
			$rootScope = services.$rootScope;
	
			sinon.spy(dataSourceProcessor, 'processAndCount');
		});
	
		describe('loading', (): void => {
			it('should call data processor to process the data when refreshing', (): void => {
				test.mock.promise(dataService, 'get', [1, 2, 3]);
	
				dataServiceDataSourceFactory.getInstance<number>(dataService.get);
				test.mock.flush(dataService);
				$rootScope.$digest();
	
				sinon.assert.calledOnce(<Sinon.SinonSpy>dataSourceProcessor.processAndCount);
			});
	
			it('should make an initial request to the server for data', (): void => {
				test.mock.promise(dataService, 'get', [1, 2]);
	
				var source: IDataServiceDataSource<number> = dataServiceDataSourceFactory.getInstance<number>(dataService.get);
	
				var reloadedSpy: Sinon.SinonSpy = sinon.spy();
				source.watch(reloadedSpy, 'reloaded');
				var changedSpy: Sinon.SinonSpy = sinon.spy();
				source.watch(changedSpy, 'changed');
	
				test.mock.flush(dataService);
				$rootScope.$digest();
	
				expect(source.dataSet).to.have.length(2);
				expect(source.dataSet[0]).to.equal(1);
				expect(source.dataSet[1]).to.equal(2);
				expect(source.count).to.equal(2);
	
				sinon.assert.calledOnce(reloadedSpy);
				sinon.assert.calledOnce(changedSpy);
			});
		});
	});
}
