import { services } from 'typescript-angular-utilities';
import test = services.test;

import { moduleName, TabsetController, tabsetControllerName, ITabHeader } from './tabs.module';

import * as angular from 'angular';
import 'angular-mocks';

interface IElementMock {
	position: number;
}

describe('TabsetController', () => {
	let scope: angular.IScope;
	let tabset: TabsetController;

	beforeEach(() => {
		angular.mock.module(moduleName);
		buildController();
		let findPositionMock: Sinon.SinonSpy = sinon.spy((elem: IElementMock): number => {
			return elem.position;
		});
		tabset.findPosition = findPositionMock;
	});

	it('should register the tab headers at the specified position and select the first tab', (): void => {
		let header1: ITabHeader = {	template: 'header1' };
		let header2: ITabHeader = { template: 'header2' };

		tabset.registerTab(<any>{ position: 1 }, header2);
		tabset.registerTab(<any>{ position: 0 }, header1);

		expect(tabset.tabHeaders[0]).to.equal(header1);
		expect(tabset.tabHeaders[1]).to.equal(header2);
		expect(header1.isVisible).to.be.true;
		expect(header2.isVisible).to.be.false;
	});

	it('should hide all tabs and show the selected tab', (): void => {
		let header1: ITabHeader = {	template: 'header1', isVisible: true };
		let header2: ITabHeader = { template: 'header2', isVisible: false };

		tabset.tabHeaders = [header1, header2];

		tabset.select(header2);

		expect(header1.isVisible).to.be.false;
		expect(header2.isVisible).to.be.true;
	});

	function buildController(): void {
		let locals: any = {
			$element: {},
		};

		let controllerResult: test.IControllerResult<TabsetController>
			= test.angularFixture.controllerWithBindings<TabsetController>(tabsetControllerName, null, locals);

		scope = controllerResult.scope;
		tabset = controllerResult.controller;
	}
});
