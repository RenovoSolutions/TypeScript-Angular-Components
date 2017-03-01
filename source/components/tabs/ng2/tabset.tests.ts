import { Component, ContentChildren, AfterContentInit, QueryList } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import test = services.test;

import { TabsetComponent, TabComponent, TabHeaderComponent } from './index';



describe('TabsetComponent', () => {
	let tabset: TabsetComponent;
	let fakeTabComponentQueryList: QueryList<TabComponent>;
	let tabsetTabsSpy: sinon.SinonSpy;
	let tabHeader: TabHeaderComponent;
	beforeEach(() => {
		tabset = new TabsetComponent();
		tabHeader = new TabHeaderComponent({
			nativeElement: {
				innerHTML: 'Header Text'
			}
		});

		fakeTabComponentQueryList = new QueryList<TabComponent>();

		let tabComponentArray = [];
		let tabComponent: TabComponent;

		for (var i = 0; i < 2; i++) {
			tabComponent = new TabComponent();
			tabComponent.header = tabHeader;
			tabComponent.childForm = null;
			tabComponent.isActive = false;
			tabComponentArray.push(tabComponent);
		}

		fakeTabComponentQueryList.reset(tabComponentArray);

		tabset.tabs = fakeTabComponentQueryList;
	});

	it('should have an instance', () => {
		expect(tabset).to.not.be.null;
	});

	it('should select the first tab', (): void => {
		tabset.ngAfterContentInit();
		expect(tabset.tabs.first.isActive).to.be.true;
		expect(tabset.tabs.last.isActive).to.be.false;
	});

	it('should hide all tabs and show the selected tab', (): void => {
		tabset.ngAfterContentInit();
		tabset.select(fakeTabComponentQueryList.last);

		expect(tabset.tabs.first.isActive).to.be.false;
		expect(tabset.tabs.last.isActive).to.be.true;
	});
});
