import { Component, Optional, Inject, ElementRef, forwardRef, Input, Output, ViewChild, ContentChild, ContentChildren, AfterContentInit, TemplateRef, SkipSelf, Provider, QueryList } from '@angular/core';
import * as ng from 'angular';

import { TabsetComponent } from './tabset';
import { FormComponent } from '../form/form';

@Component({
	selector: 'rlTab',
	template: require('./tab.html'),
})
export class TabComponent implements AfterContentInit {
	@ContentChild(forwardRef(() => TabHeaderComponent))
	header: TabHeaderComponent;

	@ContentChild(FormComponent)
	childForm: FormComponent;

	isActive: boolean;
	isValid: boolean = true;

	constructor() { }

	ngAfterContentInit() {
		let hasChildForm: boolean = this.childForm != null;
		if (hasChildForm) {
			this.childForm.form.statusChanges.subscribe(isValid => {
				this.isValid = (isValid == 'VALID');
			});
			this.isValid = this.childForm.form.valid;
		}
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
}