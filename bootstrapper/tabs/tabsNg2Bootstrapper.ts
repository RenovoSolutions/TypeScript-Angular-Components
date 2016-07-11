import { Component, OnInit } from '@angular/core';
import { TABS_COMPONENT } from '../../source/components/tabs/index';

@Component({
    selector: 'tsTabsBootstrapper',
    template: require('./tabsNg2.html'),
    directives: [TABS_COMPONENT],
})
export class TabsBootstrapper implements OnInit {
    constructor() { }

    ngOnInit() { }

}