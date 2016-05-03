/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;
import __array = services.array;

import {
	DataSourceBase,
} from './dataSourceBase.service';

import {
	IDataSource,
	moduleName,
} from './dataSources.module';

import * as angular from 'angular';
import 'angular-mocks';
import { Subject } from 'rxjs';

interface IDataSourceProcessorMock {
	process: Sinon.SinonSpy;
	processAndCount: Sinon.SinonSpy;
	sort: Sinon.SinonSpy;
	page: Sinon.SinonSpy;
}

describe('dataSourceBase', () => {
	var dataSourceBase: DataSourceBase<number>;
	var dataSourceProcessor: IDataSourceProcessorMock;

	beforeEach(() => {
		angular.mock.module(__array.moduleName);
		angular.mock.module(moduleName);

		dataSourceProcessor = {
			process: sinon.spy((sorts: any, filters: any, pager: any, data: any): any => {
				return {
					count: (data != null ? data.length : 0),
					dataSet: data,
					filteredDataSet: data,
				};
			}),
			processAndCount: sinon.spy((sorts: any, filters: any, pager: any, data: any): any => {
				return {
					count: (data != null ? data.length : 0),
					dataSet: data,
					filteredDataSet: data,
				};
			}),
			sort: sinon.spy((data: any): any => { return data; }),
			page: sinon.spy((data: any): any => { return data; }),
		};

		var services: any = test.angularFixture.inject(__array.serviceName);
		dataSourceBase = new DataSourceBase<number>(<any>dataSourceProcessor
													, services[__array.serviceName]);
	});

	describe('count', (): void => {
		it('should push count changes to consumers', (): void => {
			const countSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.countChanges.subscribe(countSpy);
			dataSourceBase.count = 3;
			sinon.assert.calledOnce(countSpy);
			sinon.assert.calledWith(countSpy, 3);
		});
	});

	describe('stateFlags', (): void => {
		it('should need refined search if the data set is empty and the raw data set is smaller than the total count', (): void => {
			dataSourceBase.dataSet = [];
			dataSourceBase.rawDataSet = [1, 2];
			dataSourceBase.count = 3;

			expect(dataSourceBase.needsRefinedSearch).to.be.true;
			expect(dataSourceBase.isEmpty).to.be.false;
		});

		it('should need refined search if the data set is empty and isEmpty is set to false', (): void => {
			dataSourceBase.dataSet = [];
			dataSourceBase.rawDataSet = [];
			dataSourceBase.count = 0;
			dataSourceBase.isEmpty = false;

			expect(dataSourceBase.needsRefinedSearch).to.be.true;
			expect(dataSourceBase.isEmpty).to.be.false;
		});

		it('should need refined search if the data set is null and isEmpty is set to false', (): void => {
			dataSourceBase.dataSet = null;
			dataSourceBase.rawDataSet = null;
			dataSourceBase.count = 0;
			dataSourceBase.isEmpty = false;

			expect(dataSourceBase.needsRefinedSearch).to.be.true;
			expect(dataSourceBase.isEmpty).to.be.false;
		});

		it('should specify isEmpty if the data set is empty and isEmpty is true', (): void => {
			dataSourceBase.dataSet = [];
			dataSourceBase.rawDataSet = [];
			dataSourceBase.isEmpty = true;

			expect(dataSourceBase.needsRefinedSearch).to.be.false;
			expect(dataSourceBase.isEmpty).to.be.true;
		});

		it('should specify isEmpty if the data set is empty and isEmpty is unspecified', (): void => {
			dataSourceBase.dataSet = [];
			dataSourceBase.rawDataSet = [];

			expect(dataSourceBase.needsRefinedSearch).to.be.false;
			expect(dataSourceBase.isEmpty).to.be.true;
		});
	});

	describe('processData', (): void => {
		it('should process data', (): void => {
			dataSourceProcessor.process.reset();

			var testArray: number[] = [1, 2, 3];
			dataSourceBase.rawDataSet = testArray;
			dataSourceBase.countFilterGroups = false;
			dataSourceBase.processData();

			sinon.assert.calledOnce(dataSourceProcessor.process);
			expect(dataSourceBase.dataSet).to.equal(testArray);
			expect(dataSourceBase.filteredDataSet).to.equal(testArray);
			expect(dataSourceBase.count).to.equal(3);
		});

		it('should process and count data', (): void => {
			dataSourceProcessor.processAndCount.reset();

			var testArray: number[] = [1, 2, 3];
			dataSourceBase.rawDataSet = testArray;
			dataSourceBase.countFilterGroups = true;
			dataSourceBase.processData();

			sinon.assert.calledOnce(dataSourceProcessor.processAndCount);
			expect(dataSourceBase.dataSet).to.equal(testArray);
			expect(dataSourceBase.filteredDataSet).to.equal(testArray);
			expect(dataSourceBase.count).to.equal(3);
		});
	});

	describe('onSortChange', (): void => {
		it('should reapply sorts and paging and signal redrawing', (): void => {
			var redrawSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.redrawing.subscribe(redrawSpy);

			dataSourceBase.onSortChange();

			sinon.assert.calledOnce(redrawSpy);
			sinon.assert.calledOnce(<Sinon.SinonSpy>dataSourceProcessor.sort);
			sinon.assert.calledOnce(<Sinon.SinonSpy>dataSourceProcessor.page);
		});

		it('should not reapply if data is being reloaded', (): void => {
			var redrawSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.redrawing.subscribe(redrawSpy);

			dataSourceBase.loadingDataSet = true;
			dataSourceBase.onSortChange();

			sinon.assert.notCalled(redrawSpy);
			sinon.assert.notCalled(<Sinon.SinonSpy>dataSourceProcessor.sort);
			sinon.assert.notCalled(<Sinon.SinonSpy>dataSourceProcessor.page);
		});
	});

	describe('onPagingChange', (): void => {
		it('should reapply paging and signal redrawing', (): void => {
			const redrawSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.redrawing.subscribe(redrawSpy);

			dataSourceBase.onPagingChange();

			sinon.assert.calledOnce(redrawSpy);
			sinon.assert.calledOnce(<Sinon.SinonSpy>dataSourceProcessor.page);
		});

		it('should not reapply if data is being reloaded', (): void => {
			const redrawSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.redrawing.subscribe(redrawSpy);

			dataSourceBase.loadingDataSet = true;
			dataSourceBase.onPagingChange();

			sinon.assert.notCalled(redrawSpy);
			sinon.assert.notCalled(<Sinon.SinonSpy>dataSourceProcessor.page);
		});

		it('should subscribe for changes on the pager', (): void => {
			const pagingSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.onPagingChange = pagingSpy;
			dataSourceBase.pager = <any>{
				pageSizeChanges: new Subject<number>(),
				pageNumberChanges: new Subject<number>(),
			};
			dataSourceBase.initPager();

			dataSourceBase.pager.pageSizeChanges.next(3);

			sinon.assert.calledOnce(pagingSpy);

			dataSourceBase.pager.pageNumberChanges.next(3);

			sinon.assert.calledTwice(pagingSpy);
		});
	});

	describe('refresh', (): void => {
		beforeEach((): void => {
			// mock process data for these tests
			dataSourceBase.processData = <any>sinon.spy();
		});

		it('should process the data and signal redrawing', (): void => {
			var redrawSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.redrawing.subscribe(redrawSpy);

			dataSourceBase.refresh();

			sinon.assert.calledOnce(redrawSpy);
			sinon.assert.calledOnce(<Sinon.SinonSpy>dataSourceBase.processData);
		});

		it('should not refresh if data is being reloaded', (): void => {
			var redrawSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.redrawing.subscribe(redrawSpy);

			dataSourceBase.loadingDataSet = true;
			dataSourceBase.refresh();

			sinon.assert.notCalled(redrawSpy);
			sinon.assert.notCalled(<Sinon.SinonSpy>dataSourceBase.processData);
		});
	});

	describe('remove', (): void => {
		beforeEach((): void => {
			dataSourceBase.refresh = <any>sinon.spy();
		});

		it('should remove an item and signal removed and changed', (): void => {
			var removeSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.removed.subscribe(removeSpy);
			var changeSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.changed.subscribe(changeSpy);

			dataSourceBase.rawDataSet = [1, 2, 3];
			dataSourceBase.remove(2);

			expect(dataSourceBase.rawDataSet).to.deep.equal([1, 3]);
			sinon.assert.calledOnce(removeSpy);
			sinon.assert.calledOnce(changeSpy);
		});

		it('should not signal remvoed or changed if item is not found', (): void => {
			var removeSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.removed.subscribe(removeSpy);
			var changeSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.changed.subscribe(changeSpy);

			dataSourceBase.rawDataSet = [1, 2, 3];
			dataSourceBase.remove(5);

			expect(dataSourceBase.rawDataSet).to.deep.equal([1, 2, 3]);
			sinon.assert.notCalled(removeSpy);
			sinon.assert.notCalled(changeSpy);
		});

		it('should refresh after removing an item', (): void => {
			dataSourceBase.rawDataSet = [1, 2, 3];
			dataSourceBase.remove(2);
			sinon.assert.calledOnce(<Sinon.SinonSpy>dataSourceBase.refresh);
		});
	});

	describe('push', (): void => {
		it('should add item and signal added and changed', (): void => {
			dataSourceBase.refresh = <any>sinon.spy();
			var addSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.added.subscribe(addSpy);
			var changeSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.changed.subscribe(changeSpy);

			dataSourceBase.rawDataSet = [1, 2, 3];
			dataSourceBase.push(4);

			expect(dataSourceBase.rawDataSet).to.deep.equal([1, 2, 3, 4]);
			sinon.assert.calledOnce(<Sinon.SinonSpy>dataSourceBase.refresh);
			sinon.assert.calledOnce(addSpy);
			sinon.assert.calledOnce(changeSpy);
		});
	});

	describe('replace', (): void => {
		it('should not signal replaced or changed if old item is not found', (): void => {
			var replaceSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.replaced.subscribe(replaceSpy);
			var changeSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.changed.subscribe(changeSpy);

			dataSourceBase.rawDataSet = [1, 2, 3];
			dataSourceBase.replace(4, 5);

			expect(dataSourceBase.rawDataSet).to.deep.equal([1, 2, 3]);
			sinon.assert.notCalled(replaceSpy);
			sinon.assert.notCalled(changeSpy);
		});

		it('should replace item and signal replaced and changed', (): void => {
			dataSourceBase.refresh = sinon.spy();
			var replaceSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.replaced.subscribe(replaceSpy);
			var changeSpy: Sinon.SinonSpy = sinon.spy();
			dataSourceBase.changed.subscribe(changeSpy);

			dataSourceBase.rawDataSet = [1, 2, 3];
			dataSourceBase.replace(3, 4);

			expect(dataSourceBase.rawDataSet).to.deep.equal([1, 2, 4]);
			sinon.assert.calledOnce(<Sinon.SinonSpy>dataSourceBase.refresh);
			sinon.assert.calledOnce(replaceSpy);
			sinon.assert.calledOnce(changeSpy);
		});
	});
});
