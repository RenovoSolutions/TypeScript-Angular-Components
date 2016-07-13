import { Component, Optional, Inject, Input, Output, ViewChild, ViewChildren, ContentChildren, AfterViewInit, AfterContentInit, TemplateRef, QueryList } from '@angular/core';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __array = services.array;

import { TabComponent } from './tab';

@Component({
	selector: 'rlTabset',
	template: require('./tabset.html'),
	directives: [TabComponent]
})
export class TabsetComponent implements AfterContentInit {
	@ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

	constructor() { }

	select(tab: TabComponent): void {
		this.tabs.forEach(thisTab => {
			thisTab.isActive = false;
		});

		tab.isActive = true;
	}

	ngAfterContentInit() {
		if (this.tabs) {
			this.select(this.tabs[0]);
		}
	}
}