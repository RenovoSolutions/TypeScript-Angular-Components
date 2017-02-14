import { Component, ContentChild } from '@angular/core';

import { TabHeaderComponent } from './tabHeader/index';
import { TabContentComponent } from './tabContent/index';
import { TabFooterComponent } from './tabFooter/index';

import { TabsetComponent } from '../tabset';
import { FormComponent } from '../../../form/form';

@Component({
	selector: 'rlTab',
	template: require('./tab.html'),
})
export class TabComponent {
	@ContentChild(TabHeaderComponent)
	header: TabHeaderComponent;

	@ContentChild(FormComponent)
	childForm: FormComponent;

	isActive: boolean;

	constructor() {
	}

	get isValid(): boolean{
		let hasChildForm: boolean = this.childForm != null;
		if (hasChildForm) {
			return this.childForm.form.valid;
		}
		return true;
	}
}