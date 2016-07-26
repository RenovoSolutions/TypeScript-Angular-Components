import { Component, OnInit } from '@angular/core';
import { TABS_COMPONENT } from '../../source/components/tabs/index';
import { FormComponent } from '../../source/components/form/form';
import { TextboxComponent } from '../../source/components/inputs/textbox/textbox';
import { ButtonSubmitComponent } from '../../source/components/buttons/buttonSubmit/buttonSubmit';

@Component({
    selector: 'tsTabsBootstrapper',
    template: require('./tabsNg2.html'),
    directives: [TABS_COMPONENT, FormComponent, TextboxComponent, ButtonSubmitComponent],
})
export class TabsBootstrapper implements OnInit {
    validator: any;
    textboxValue: string = "";

    constructor() {
        this.validator = {
			validate: () => this.textboxValue != null && this.textboxValue != "",
			errorMessage: "This field is required",
        };
     }

    ngOnInit() { }

}