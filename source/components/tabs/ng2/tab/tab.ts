import { Component, AfterContentInit, ContentChild } from '@angular/core';

import { TabHeaderComponent } from './tabHeader/index';
import { TabContentComponent } from './tabContent/index';
import { TabFooterComponent } from './tabFooter/index';

import { TabsetComponent } from '../tabset';
import { FormComponent } from '../../../form/form';

@Component({
	selector: 'rlTab',
	template: require('./tab.html'),
})
export class TabComponent implements AfterContentInit {
	@ContentChild(TabHeaderComponent)
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