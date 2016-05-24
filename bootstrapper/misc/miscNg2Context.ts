import { Component, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { BusyComponent } from '../../source/components/busy/busy.ng2';

@Component({
	selector: 'tsMiscNgContext',
	template: require('./miscNg2Context.html'),
	directives: [BusyComponent],
})
export class MiscNgContextBootstrapper {
	@ViewChild('busy2') busy2: BusyComponent;

	wait(): Observable<void> {
		const subject: Subject<void> = new Subject<void>();
		setTimeout(() => subject.next(null), 1000);
		return subject;
	}

	toggle(): void {
		this.busy2.trigger(!this.busy2.loading);
	}
}