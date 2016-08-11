import { Component } from '@angular/core';

@Component({
    selector: 'tsTabsBootstrapper',
    template: require('./tabsNg2.html'),
})
export class TabsBootstrapper {
    validator: any;
    textboxValue: string = "";

    constructor() {
        this.validator = {
            validate: () => this.textboxValue != null && this.textboxValue != "",
            errorMessage: "This field is required",
        };
    }

}