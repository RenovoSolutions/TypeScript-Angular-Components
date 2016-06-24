import { services } from 'typescript-angular-utilities';
import test = services.test;

import { IParentChildBehaviorService, serviceName as parentChildServiceName } from '../../../services/parentChild/parentChild.service';

import {
	moduleName,
	controllerName,
	TypeaheadListController,
	ITypeaheadListBehavior,
} from './typeaheadList.ng1';

import * as angular from 'angular';
import 'angular-mocks';

import * as _ from 'lodash';

interface ITestObject {
	id: number;
	prop?: number;
}

describe('TypeaheadListController', () => {
	let scope: angular.IScope;
	let typeaheadList: TypeaheadListController;
	let $q: angular.IQService;
	let parentChild: IParentChildBehaviorService;
	let items: ITestObject[];

	beforeEach(() => {
		angular.mock.module(moduleName);

		items = [
			{ id: 1, prop: 2 },
			{ id: 2, prop: 5 },
			{ id: 3, prop: 3 },
			{ id: 4, prop: 7 },
			{ id: 5, prop: 4 },
		];

		let services: any = test.angularFixture.inject('$q', parentChildServiceName);
		$q = services.$q;
		parentChild = services[parentChildServiceName];
	});

	describe('loadItems', (): void => {
		it('should filter out items that are already selected', (done: MochaDone): void => {
			let selections: ITestObject[] = [items[0], items[2]];
			buildController(selections);

			typeaheadList.searchItems().then((data: ITestObject[]): void => {
				expect(data).to.have.length(3);
				expect(data[0].id).to.equal(2);
				expect(data[1].id).to.equal(4);
				expect(data[2].id).to.equal(5);
				done();
			});
			scope.$digest();
		});

		it('should cache the results of the parent getItems function and apply searches aganst the cached data if useClientSearching is on'
			, (): void => {
				buildController();

				let getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<ITestObject[]> => { return $q.when(items); });
				typeaheadList.getItems = getItemsSpy;
				typeaheadList.searchItems('2');
				scope.$digest();

				getItemsSpy.reset();

				typeaheadList.searchItems('2');

				sinon.assert.notCalled(getItemsSpy);
			});

		it('should load the items when searching is disabled', (): void => {
			buildController();
			let getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<ITestObject[]> => { return $q.when(items); });
			typeaheadList.getItems = getItemsSpy;
			typeaheadList.$onChanges({
				disableSearching: <any>{ currentValue: true },
			});

			sinon.assert.calledOnce(getItemsSpy);

			scope.$digest();

			expect(typeaheadList.cachedItems).to.not.be.empty;
		});

		it('should load the items on init if searching is disabled', (): void => {
			buildControllerWithoutInit();
			let getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<ITestObject[]> => { return $q.when(items); });
			typeaheadList.getItems = getItemsSpy;
			typeaheadList.disableSearching = true;
			typeaheadList.$onInit();

			sinon.assert.calledOnce(getItemsSpy);

			scope.$digest();

			expect(typeaheadList.cachedItems).to.not.be.empty;
		});
	});

	describe('add', (): void => {
		it('should remove the item from the typeahead and add it to the list', (): void => {
			let list: ITestObject[] = [];
			buildController(list);
			typeaheadList.searchItems('2');
			scope.$digest();
			let addEventSpy: Sinon.SinonSpy = sinon.spy();
			typeaheadList.add = addEventSpy;

			typeaheadList.addItem(items[0]);
			scope.$digest();

			expect(list).to.have.length(1);
			expect(list[0].id).to.equal(1);
			expect(typeaheadList.cachedItems).to.have.length(4);
			sinon.assert.calledOnce(addEventSpy);
			expect(addEventSpy.firstCall.args[0].item.id).to.equal(1);
			sinon.assert.calledOnce(<any>typeaheadList.ngModel.$setDirty);
		});
	});

	describe('remove', (): void => {
		it('should add the item back to the cached items and remove it from the list', (): void => {
			let list: ITestObject[] = [items[0]];
			buildController(list);
			typeaheadList.searchItems('2');
			scope.$digest();
			let removeEventSpy: Sinon.SinonSpy = sinon.spy();
			typeaheadList.remove = removeEventSpy;

			typeaheadList.removeItem(list[0]);
			scope.$digest();

			expect(list).to.be.empty;
			expect(typeaheadList.cachedItems[4]).to.equal(items[0]);
			sinon.assert.calledOnce(removeEventSpy);
			expect(removeEventSpy.firstCall.args[0].item.id).to.equal(1);
			sinon.assert.calledOnce(<any>typeaheadList.ngModel.$setDirty);
		});
	});

	describe('behavior', (): void => {
		it('should provide an add function for the parent to trigger an item to be added', (): void => {
			buildController();
			let addSpy: Sinon.SinonSpy = sinon.spy();
			typeaheadList.addItem = addSpy;
			typeaheadList.$onInit();
			let item: ITestObject = { id: 13 };
			parentChild.triggerChildBehavior(typeaheadList.childLink, (behavior: ITypeaheadListBehavior): void => {
				behavior.add(item);
			});

			sinon.assert.calledOnce(addSpy);
			sinon.assert.calledWith(addSpy, item);
		});

		it('should provide a remove function for the parent to trigger an item to be removed', (): void => {
			buildController();
			let removeSpy: Sinon.SinonSpy = sinon.spy();
			typeaheadList.removeItem = removeSpy;
			typeaheadList.$onInit();
			let item: ITestObject = { id: 13 };
			parentChild.triggerChildBehavior(typeaheadList.childLink, (behavior: ITypeaheadListBehavior): void => {
				behavior.remove(item);
			});

			sinon.assert.calledOnce(removeSpy);
			sinon.assert.calledWith(removeSpy, item);
		});
	});

	function buildControllerWithoutInit(list?: ITestObject[]): void {
		let ngModel: any = {
			$viewValue: list,
			$setViewValue: (value: any): void => { ngModel.$viewValue = value; },
			$setDirty: sinon.spy(),
		};

		let bindings: any = {
			childLink: {},
			ngModel: ngModel,
		};

		let locals: any = { $element: {}, $transclude: {} };

		let controllerResult: test.IControllerResult<TypeaheadListController> =
			test.angularFixture.controllerWithBindings<TypeaheadListController>(controllerName, bindings, locals);

		scope = controllerResult.scope;
		typeaheadList = controllerResult.controller;
		(<any>typeaheadList).$transclude = {
			isSlotFilled(): boolean { return true; },
		};
		typeaheadList.getItems = sinon.spy((): angular.IPromise<ITestObject[]> => {
			return $q.when(items);
		});
		typeaheadList.useClientSearching = true;
	}

	function buildController(list?: ITestObject[]): void {
		buildControllerWithoutInit(list);
		typeaheadList.$onInit();
	}
});
