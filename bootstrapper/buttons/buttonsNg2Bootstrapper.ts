import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'tsButtonsBootstrapper',
	template: require('./buttonsNg2.html'),
})
export class ButtonsNg2BootstrapperComponent {
	waitCallback: { (): Observable<void> } = () => {
		return this.wait(this.action, 'Async button');
	}

	action(name: string): void {
		console.log('Action: ' + name);
	}

	wait(callback, name): Observable<void> {
		return Observable.of(null).do(() => callback(name)).delay(1000);
	}
}
