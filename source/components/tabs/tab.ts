import { Component, Optional, Inject, Input, Output, ViewChild, ContentChild, AfterViewInit, TemplateRef } from '@angular/core';
import * as ng from 'angular';

import { TabsetComponent, ITabHeader } from './tabset';

@Component({
	selector: 'rlTab',
	template: require('./tab.html'),
})
export class TabComponent {
	header: ITabHeader;

	constructor() {

	}
}