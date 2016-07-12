import { Component, Optional, Inject, ElementRef, forwardRef, Input, Output, ViewChild, ContentChild, AfterViewInit, TemplateRef } from '@angular/core';
import * as ng from 'angular';

import { TabsetComponent } from './tabset';
import { FormComponent } from '../form/form';

//TODO extend FormComponent
@Component({
	selector: 'rlTab',
	template: require('./tab.html')
})
export class TabComponent {
	@ContentChild(forwardRef(() => TabHeaderComponent))
	header: TabHeaderComponent;

	constructor() {
	}
}

@Component({
	selector: 'rlTabHeader',
	template: '<ng-content></ng-content>',
})
export class TabHeaderComponent {

	constructor(private el: ElementRef) {
	}

	get innerHTML(): string {
		return this.el.nativeElement.innerHTML;
	}

	ngAfterViewInit() {
		console.log('header content after view init', this.el.nativeElement.innerHTML);
	}
}