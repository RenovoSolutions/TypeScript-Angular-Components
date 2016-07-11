import { Component, Optional, Inject, Input, Output, ViewChild, ContentChildren, AfterViewInit, TemplateRef, QueryList } from '@angular/core';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __array = services.array;

import { TabComponent } from './tab';

export interface ITabHeader {
	template: string;
	isVisible?: boolean;
	isValid?: boolean;
}

@Component({
	selector: 'rlTabset',
	template: require('./tabset.html'),
	directives: [TabComponent]
})
export class TabsetComponent {
	@ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

	//TODO need inject
	constructor() {

	}

	select(tab: ITabHeader): void {
		
	}
}