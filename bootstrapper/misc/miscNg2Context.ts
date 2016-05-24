import { Component } from '@angular/core';

import { BusyComponent } from '../../source/components/busy/busy.ng2';

@Component({
	selector: 'tsMiscNgContext',
	template: require('./miscNg2Context.html'),
	directives: [BusyComponent],
})
export class MiscNgContextBootstrapper {
	wait(): Promise<void> | boolean {
		return new Promise<void>((resolve: Function, reject: Function): void => {
			setTimeout(() => resolve(), 1000);
		});
	}
}