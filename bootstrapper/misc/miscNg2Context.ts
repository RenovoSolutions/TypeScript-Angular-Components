import { Component, ViewChild } from '@angular/core';

import { BusyComponent } from '../../source/components/busy/busy.ng2';

@Component({
	selector: 'tsMiscNgContext',
	template: require('./miscNg2Context.html'),
	directives: [BusyComponent],
})
export class MiscNgContextBootstrapper {
	@ViewChild('busy2') busy2: BusyComponent;

	wait(): Promise<void> {
		return new Promise<void>((resolve: Function, reject: Function): void => {
			setTimeout(() => resolve(), 1000);
		});
	}

	toggle(): void {
		this.busy2.trigger(!this.busy2.loading);
	}
}